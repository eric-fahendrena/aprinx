import { Link } from "react-router-dom"
import { Home, Search, Bell, User, Plus, LogOut, MessageCircleQuestion, BookText, LogIn } from "lucide-react"
import { useContext } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"

function LgScreenContainer({ children }) {
  const pathname = window.location.pathname
  const { profile } = useContext(ProfileContext)

  return (
    <div className="hidden md:flex">
      <div className="w-2/5 lg:w-1/4 text-zinc-800">
        <div className="px-5 fixed top-[56px] bg-zinc-50 rounded-tr-3xl h-full">
          <div className="mb-7">
            <Link to={"/"} className={`${pathname === "/" && "text-[#800] ps-2 border-s-[2px] border-[#8008]"} flex items-center font-[400] my-3`}>
              <Home size={22} className="me-2" />
              Accueil
            </Link>

            <Link to={"/search"} className={`${pathname === "/search" && "text-[#800] ps-2 border-s-[2px] border-[#8008]"} flex items-center font-[400] my-3`}>
              <Search size={22} className="me-2" />
              Recherche
            </Link>

            {profile && (
              <>
                <Link to={"/notifications"} className={`${pathname === "/notifications" && "text-[#800] ps-2 border-s-[2px] border-[#8008]"} flex items-center font-[400] my-3`}>
                  <Bell size={22} className="me-2" />
                  Notifications
                </Link>

                <Link to={"/profile"} className={`${pathname === "/profile" && "text-[#800] ps-2 border-s-[2px] border-[#8008]"} flex items-center font-[400] my-3`}>
                  <User size={22} className="me-2" />
                  Profil
                </Link>

                {(profile.role === "ADMIN" || profile.role === "TEACHER") && (
                  <Link to={"/courses/create"} className={`${pathname === "/courses/create" && "text-[#800] ps-2 border-s-[2px] border-[#8008]"} flex items-center font-[400] my-3`}>
                    <div className="bg-[#800] text-white rounded me-2">
                      <Plus size={20} />
                    </div>
                    Créer un cours
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="mb-5">
            <Link to={"/feedback"} className={`${pathname === "/feedback" && "text-[#800] ps-2 border-s-[2px] border-[#8008]"} flex items-center font-[400] my-3 text-sm`}>
              <MessageCircleQuestion size={22} className="me-2" />
              Feedback et Signalement
            </Link>

            <Link to={"/terms-and-conditions"} className={`${pathname === "/terms-and-conditions" && "text-[#800] ps-2 border-s-[2px] border-[#8008]"} flex items-center font-[400] my-3 text-sm`}>
              <BookText size={22} className="me-2" />
              Conditions d'utilisation
            </Link>
          </div>

          {!profile && (
            <div>
              <Link to={"/login"} className={`${pathname === "/login" && "text-[#800] ps-2 border-s-[2px] border-[#8008]"} flex items-center font-[400] my-3`}>
                <LogIn size={22} className="me-2" />
                Se connecter
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="w-3/5 lg:w-3/4">
        {children}
      </div>
    </div>
  )
}

export default LgScreenContainer
