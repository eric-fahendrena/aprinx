import { Home, Search, Plus, Bell, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { NotificationContext } from "../../contexts/NotificationContext"

function BottomNavbar({ current="" }) {
  const { unseenNotificationsCount } = useContext(NotificationContext)

  return (
    <div className="fixed bottom-0 start-0 end-0 h-[48pt] bg-white flex items-center justify-around z-10">
      <Link to={"/"}>
        <Home className={current === "home" ? "text-red-800" : "none"} />
      </Link>
      <Link to={"/search"}>
        <Search className={current === "search" ? "text-red-800" : "none"} />
      </Link>
      <Link to={"/courses/create"} className="bg-red-800 text-white px-3 py-1 rounded-md">
        <Plus />
      </Link>
      <Link to={"/notifications"}>
        <div className="relative">
          {unseenNotificationsCount > 0 && (
            <div className="absolute -top-[4pt] -end-[4pt] w-[12pt] h-[12pt] rounded-full bg-red-800 flex items-center justify-center text-xs text-center text-white">
              {unseenNotificationsCount}
            </div>
          )}
          <Bell className={current === "notifications" ? "text-red-800" : "none"} />
        </div>
      </Link>
      <Link to={"/profile"}>
        <User className={current === "profile" ? "text-red-800" : "none"} />
      </Link>
    </div>
  )
}

export default BottomNavbar
