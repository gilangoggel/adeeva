import { useGlobal } from "../contexts/global-context";

export function useAuth() {
  const global = useGlobal();
  return global.auth;
}
