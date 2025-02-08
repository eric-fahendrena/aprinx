// const API_BASE_URL = "https://aprix-api.vercel.app/"
const API_BASE_URL = "http://localhost:8000"

/**
 * login with google
 */
export const loginWithGoogle = async () => {
  window.location.href = `${API_BASE_URL}/api/auth/google`
}
