import { Link } from "react-router-dom"
import { Home, BookText, LogOut } from "lucide-react"
import Button from "./Button"
import { useContext, useState } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { useLogin } from "../../hooks/useLogin"

function Navbar({ isOpen=false }) {
  const { isAuthorized } = useContext(ProfileContext)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const { logout } = useLogin()
  const [logoutLoading, setLogoutLoading] = useState(false)

  const handleLogoutClick = () => {
    setLogoutOpen(true)
  }
  const handleUndoLogoutClick = () => {
    setLogoutOpen(false)
  }
  const handleLogoutConfirm = async () => {
    setLogoutLoading(true)
    logout()
  }

  return (
    <div 
      className="fixed top-[56px] bottom-0 start-0 end-0 bg-white"
      style={{
        transform: !isOpen ? "translateX(100%)" : "",
        transition: "all .25s ease-in-out"
      }}
    >
      <div className="container mx-auto">
        <div className="p-5">
          {!isAuthorized && (
            <div className="mb-3">
              <Link to={"/login"}>
                <div className="flex items-center py-2">
                  <Button>Se Connecter</Button>
                </div>
              </Link>
            </div>
          )}
          <Link to={"/terms-and-conditions"}>
            <div className=" flex items-center py-2">
              <BookText className="me-2" />
              <div>
                Conditions d'utilisation
              </div>
            </div>
          </Link>
          {isAuthorized && (
            <button onClick={handleLogoutClick}>
              <div className="flex items-center py-2 text-red-600">
                <LogOut className="me-2" />
                <div>
                  Se déconnecter
                </div>
              </div>
            </button>
          )}
        </div>
      </div>

      {logoutOpen && (
        <div 
          className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center"
          style={{
            backdropFilter: "blur(12px)"
          }}
        >
          <div className="p-5 w-5/6 bg-white rounded-3xl shadow">
            <div className="font-[400] mb-3">Se déconnecter</div>
            <p className="mb-3">Voulez-vous vraiment vous déconnecter ?</p>
            <div className="flex">
              <div className="w-1/2 pe-1">
                <Button variant="secondary" onClick={handleUndoLogoutClick} disabled={logoutLoading}>Non</Button>
              </div>
              <div className="w-1/2">
                <Button onClick={handleLogoutConfirm} disabled={logoutLoading}>{logoutLoading ? "..." : "Oui"}</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
