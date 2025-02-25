import Button from "./commons/Button"
import { FcGoogle } from "react-icons/fc"
import { useLogin } from "../hooks/useLogin"

function LoginPage() {
  const { loginWithGoogle } = useLogin()
  
  return (
    <div className="absolute top-0 bottom-0 start-0 end-0 p-5 flex flex-col justify-end"
      style={{
        // background: "radial-gradient(circle, rgba(136,0,0,1) 0%, rgba(110,0,0,1) 100%, rgba(49,0,0,1) 100%)"
      }}
    >
      <div className="h-1/2 flex items-center justify-center">
        <div className="text-[5rem] font-bold text-red-800">Aprix</div>
      </div>
      <div>
        <div className="text-[1.5rem] font-semibold mb-3">Connectez-vous sur <strong className="text-red-800">Aprix</strong>.</div>
        <p className="text-[1.5rem] mb-5">Accéder à vos cours et partagez vos connaissance en un clic.</p>
        <div className="mb-5">
          <Button variant="light" onClick={loginWithGoogle}>
            <FcGoogle size={24} className="inline-block me-2" />
            Continuer avec Google
          </Button>
        </div>
        <p className="text-xs">En continuant, vous acceptez nos condition d'utilisation et notre Politique de confidentialité.</p>
      </div>
    </div>
  )
}

export default LoginPage
