import { createContext, useCallback, useContext, useState } from "react";
import { router, useFocusEffect } from "expo-router";

import { User } from "@/lib/types/responses/user.type";
import { deleteValueFor } from "@/utils/expo-secure-store";
import { getUserInfo } from "@/tools/api";

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function checkUser() {
    setIsLoading(true);
    try {
      const { success, error } = await getUserInfo();
      if (error) {
        const { status, data } = error;
        if (status === 401) {
          await deleteValueFor("user_me");
          router.navigate("/login");
        }
        // TODO handle other errors
        setUser(null);
      } else if (success) {
        setUser(success.res.data);
      }
    } catch(error) {
      setUser(null);
      // TODO: handle unexpected errors
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    await deleteValueFor("user_me");
    setUser(null);
    // TODO: change to login after created
    router.navigate("/login");
  }

  useFocusEffect(
    useCallback(() => {
      checkUser()
    }, [])
  )

  return <AuthContext.Provider value={{ user, isLoading, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return authContext;
}