import Header from "./commons/Header"
import BottomNavbar from "./commons/BottomNavbar"
import { useContext } from "react"
import { ProfileContext } from "../contexts/ProfileContext"

function ProfilePage() {
  const { profile, isLoading, error } = useContext(ProfileContext)

  if (isLoading) {
    return (
      <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center">
        <div>Chargement...</div>
      </div>
    )
  }

  if (error) {
    return "Error"
  }

  return (
    <>
      <Header title={"Tojo Guitariste"} backLink={"/"} />
      <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center">
        <div className="text-center">
          <img 
            src={profile.picture} 
            alt={`${profile.given_name} photo`} 
            className="w-[56pt] h-[56pt] inline-block rounded-full mb-3" 
          />
          <div className="font-bold text-[16pt] text-zinc-600">{profile.name}</div>
        </div>
      </div>
      <BottomNavbar current="profile" />
    </>
  )
}

export default ProfilePage
