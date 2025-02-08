import Button from "./commons/Button"
import { FcGoogle } from "react-icons/fc"
import { useLogin } from "../hooks/useLogin"

function LoginPage() {
  const { loginWithGoogle } = useLogin()
  
  return (
    <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center">
      <div className="container mx-auto">
        <div className="p-5">
          <div className="text-[24pt] font-bold">Aprix</div>
          <div>Apprenez et dévenez expert!</div>
        </div>
        <div className="p-5">
          <Button variant="light" onClick={loginWithGoogle}><FcGoogle className="inline-block me-2" size={24} />S'inscrire avec Google</Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
