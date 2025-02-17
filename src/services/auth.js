// const API_BASE_URL = "https://aprix-api.vercel.app/"
const API_BASE_URL = import.meta.env.VITE_API_URL

/**
 * login with google
 */
export const loginWithGoogle = async () => {
  window.location.href = `${API_BASE_URL}/api/auth/google`
}
