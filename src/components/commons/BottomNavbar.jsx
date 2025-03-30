import { Home, Search, Plus, Bell, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { NotificationContext } from "../../contexts/NotificationContext"
import { ProfileContext } from "../../contexts/ProfileContext"

function BottomNavbar({ current="" }) {
  const { unseenNotificationsCount } = useContext(NotificationContext)
  const { profile } = useContext(ProfileContext)

  return (
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
            <Link to={"/courses/create"} className="bg-red-800 text-white px-3 py-1 rounded-md">
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
  )
}

export default BottomNavbar
