import { Link } from "react-router-dom"
import { Home, User, Plus } from "lucide-react"

function Navbar({ isOpen=false }) {
  return (
    <div 
      className="fixed top-[56px] bottom-0 start-0 end-0 bg-zinc-950"
      style={{
        transform: !isOpen ? "translateX(100%)" : "",
        transition: "all .25s ease-in-out"
      }}
    >
      <div className="container mx-auto text-white">
        <div className="p-5">
          <Link to={"/"}>
            <div className="text-2xl font-bold flex items-center py-2">
              <Home className="me-2" />
              <div>
                Accueil
              </div>
            </div>
          </Link>
          <Link to={"/profile"}>
            <div className="text-2xl font-bold flex items-center py-2">
              <User className="me-2" />
              <div>
                Profil
              </div>
            </div>
          </Link>
        </div>
        <div className="p-5">
          <div className="font-bold text-zinc-400 uppercase">Cours</div>
          <Link to={"/videos/create"}>
            <div className="text-2xl font-bold flex items-center py-2">
              <Plus className="me-2" />
              <div>
                Ajouter un cours
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
