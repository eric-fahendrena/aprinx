import Header from "./commons/Header"
import BottomNavbar from "./commons/BottomNavbar"
import Button from "./commons/Button"
import { useContext } from "react"
import { ProfileContext } from "../contexts/ProfileContext"
import { useNavigate } from "react-router-dom"
import { User, User2 } from "lucide-react"

function ProfilePage() {
  const { profile, isLoading, error } = useContext(ProfileContext)
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center">
        <div>Chargement...</div>
      </div>
    )
  }

  return (
    <>
      <Header title={"Tojo Guitariste"} backLink={"/"} />
      <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center">
        {!error ? (
          <div className="text-center">
            <img 
              src={profile.picture} 
              alt={`${profile.given_name} photo`} 
              className="w-[56pt] h-[56pt] inline-block rounded-full mb-3" 
            />
            <div className="font-bold text-[16pt] text-zinc-600">{profile.name}</div>
          </div>
        ) : (
          <div className="text-center p-5">
            <div className="mb-5 text-zinc-600">
              <User2 size={80} strokeWidth={1} className="inline-block" />
            </div>
            <p className="text-zinc-600 mb-5">Veuillez d'abord vous connecter</p>
            <div className="px-[32pt]">
              <Button onClick={() => navigate("/login")}>Connexion</Button>
            </div>
          </div>
        )}
      </div>
      <BottomNavbar current="profile" />
    </>
  )
}

export default ProfilePage
