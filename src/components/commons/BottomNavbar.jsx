import { Home, Search, Plus, Film, User } from "lucide-react"
import { Link } from "react-router-dom"

function BottomNavbar({ current="" }) {
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
      <Link className="">
        <Film className={current === "videos" ? "text-red-800" : "none"} />
      </Link>
      <Link to={"/profile"}>
        <User className={current === "profile" ? "text-red-800" : "none"} />
      </Link>
    </div>
  )
}

export default BottomNavbar
