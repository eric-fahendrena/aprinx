import { Home, Search, Plus, Bell, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { NotificationContext } from "../../contexts/NotificationContext"
import { ProfileContext } from "../../contexts/ProfileContext"
import Button from "./Button"

function BottomNavbar({ current="" }) {
  const { unseenNotificationsCount } = useContext(NotificationContext)
  const { profile } = useContext(ProfileContext)
  const [noPaymentInfoOpen, setNoPaymentInfoOpen] = useState(false)
  const navigate = useNavigate()

  const handlePlusClick = (e) => {
    if (profile.phone_number) return
    e.preventDefault()

    setNoPaymentInfoOpen(true)
  }
  const handleNoPaymentClose = () => {
    setNoPaymentInfoOpen(false)
  }
  const handleAddPaymentInfoClick = () => {
    navigate("/profile/edit/phone")
  }

  return (
    <>
      <div className="fixed bottom-0 start-0 end-0 md:px-40 lg:px-60 h-[48pt] bg-white shadow flex items-center justify-around z-10">
        <Link className="w-1/6" to={"/"}>
          <div className="text-center w-full">
            <Home className={`inline-block ${current === "home" && "text-red-800"}`} />
            <div className={`text-[9px] mt-1 ${current === "home" && "text-red-800"}`}>Accueil</div>
          </div>
        </Link>
        <Link className="w-1/6" to={"/search"}>
          <div className="text-center w-full">
            <Search className={`inline-block ${current === "search" && "text-red-800"}`} />
            <div className={`text-[9px] mt-1 ${current === "search" && "text-red-800"}`}>Recherche</div>
          </div>
        </Link>
        {profile && (
          <>
            {(profile.role !== "USER") && (
              <Link to={"/courses/create"} onClick={handlePlusClick} className="bg-red-800 text-white px-3 py-1 rounded-md">
                <Plus />
              </Link>
            )}
            <Link className="w-1/6" to={"/notifications"}>
              <div className="relative text-center w-full">
                {unseenNotificationsCount > 0 && (
                  <div className="absolute -top-[4pt] start-[50%] min-w-[12pt] h-[12pt] px-1 rounded-3xl bg-red-800 flex items-center justify-center text-xs text-center text-white">
                    {unseenNotificationsCount}
                  </div>
                )}
                <Bell className={`inline-block ${current === "notifications" && "text-red-800"}`} />
                <div className={`text-[9px] mt-1 ${current === "notifications" && "text-red-800"}`}>Notification</div>
              </div>
            </Link>
            <Link className="w-1/6" to={"/profile"}>
              <div className="text-center w-full">
                <User className={`inline-block ${current === "profile" && "text-red-800"}`} />
                <div className={`text-[9px] mt-1 ${current === "profile" && "text-red-800"}`}>Profile</div>
              </div>
            </Link>
          </>
        )}
      </div>

      {noPaymentInfoOpen && (
        <div 
          className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center z-[9999]"
          style={{
            backdropFilter: "blur(12px)"
          }}
        >
          <div className="w-5/6 p-5 bg-white rounded-3xl shadow">
            <div className="font-[500] mb-3">Informations de paiement</div>
            <p className="mb-5">Vous devez d'abord ajouter vos informations de paiement.</p>
            <div className="flex">
              <div className="w-1/2 pe-1">
                <Button variant="secondary" onClick={handleNoPaymentClose}>Fermer</Button>
              </div>
              <div className="w-1/2">
                <Button onClick={handleAddPaymentInfoClick}>Ajouter</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BottomNavbar
