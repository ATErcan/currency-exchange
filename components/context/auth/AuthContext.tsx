import { createContext, useContext, useState } from "react";
import { router } from "expo-router";

import { User } from "@/lib/types/responses/user.type";
import { deleteValueFor } from "@/utils/expo-secure-store";

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function logout() {
    await deleteValueFor("user_me")
    setUser(null);
    router.navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, setIsLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return authContext;
}