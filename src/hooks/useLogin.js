import { loginWithGoogle, logout } from "../services/auth"

export const useLogin = () => {
  return { loginWithGoogle, logout }
}
