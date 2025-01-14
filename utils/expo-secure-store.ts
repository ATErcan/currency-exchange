import * as SecureStore from "expo-secure-store";

export async function saveToSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}

export async function deleteValueFor(key: string) {
  await SecureStore.deleteItemAsync(key);
}