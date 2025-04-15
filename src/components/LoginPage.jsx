import Header from "./commons/Header"
import Button from "./commons/Button"
import { FcGoogle } from "react-icons/fc"
import { useLogin } from "../hooks/useLogin"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import LgScreenContainer from "./commons/LgScreenContainer"

function LoginPage() {
  const { loginWithGoogle } = useLogin()
  
  return (
    <>
      <Helmet>
        <title>Connexion - Aprix Madagascar</title>
        <meta name="description" content="Bienvenue sur Aprix Madagascar, une plateforme qui facilite l'échange entre les vendeurs de tutoriels vidéo et les acheteurs." />
        <meta property="og:title" content="Connexion - Aprix Madagascar" />
        <meta property="og:description" content="Bienvenue sur Aprix Madagascar, une plateforme qui facilite l'échange entre les vendeurs de tutoriels vidéo et les acheteurs." />
      </Helmet>

      <Header />
      
      <div className="md:hidden">
        <div className=" flex items-center justify-center mt-24">
          <div className="text-[5rem] font-bold text-red-800">Aprix</div>
        </div>
        <div className="absolute bottom-0 start-0 end-0 p-5 flex flex-col justify-end">
          <div>
            {/* <div className="text-[1.5rem] font-semibold mb-3">Connectez-vous sur <strong className="text-red-800">Aprix</strong>.</div> */}
            <p className="text-[1.5rem] mb-5">Accéder à vos cours et partagez vos connaissance en un clic.</p>
            <div className="mb-5">
              <Button variant="light" onClick={loginWithGoogle}>
                <FcGoogle size={24} className="inline-block me-2" />
                Continuer avec Google
              </Button>
            </div>
            <p className="text-xs">En continuant, vous acceptez <a href="/terms-and-conditions" className="font-[400] text-[#800]">nos conditions d'utilisation</a>.</p>
          </div>
        </div>
      </div>

      <LgScreenContainer>
        <div className="lg:w-2/3">
          <div className="px-5 mb-5">
            <div className="text-[5rem] font-bold text-red-800">Aprix</div>
          </div>
          <div className="p-5 flex flex-col justify-end">
            <div>
              {/* <div className="text-[1.5rem] font-semibold mb-3">Connectez-vous sur <strong className="text-red-800">Aprix</strong>.</div> */}
              <p className="text-[1.5rem] mb-5">Accéder à vos cours et partagez vos connaissance en un clic.</p>
              <div className="mb-5 lg:w-3/4">
                <Button variant="light" onClick={loginWithGoogle}>
                  <FcGoogle size={24} className="inline-block me-2" />
                  Continuer avec Google
                </Button>
              </div>
              <p className="text-xs">En continuant, vous acceptez <Link to="/terms-and-conditions" className="font-[400] text-[#800]">nos conditions d'utilisation</Link>.</p>
            </div>
          </div>
        </div>
      </LgScreenContainer>
    </>
  )
}

export default LoginPage
