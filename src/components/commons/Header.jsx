import { Menu, ChevronLeft, X, Grip, Users, ArrowLeftRight } from "lucide-react"
import Navbar from "./Navbar"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ProfileContext } from "../../contexts/ProfileContext"
import Button from "./Button"

function Header({ title, backLink }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const [administrationOpen, setAdministrationOpen] = useState(false)
  const { profile } = useContext(ProfileContext)

  return (
    <>
      {!title ? (
        <header className="h-[40pt] bg-white sticky top-0 left-0 right-0 z-20 flex items-center">
          <div className="container mx-auto md:px-40 lg:px-60 flex justify-between px-5">
            <div className="text-red-800 flex items-center justify-center font-bold text-2xl">
              <Link to={"/"}>Aprix</Link>
            </div>
            <div className="flex">
              {(profile && profile.role === "ADMIN") && (
                <button className="me-5" onClick={() => setAdministrationOpen(true)}>
                  <Grip />
                </button>
              )}
              <button onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                {isNavbarOpen ? (
                  <X />
                ) : (
                  <Menu />
                )}
              </button>
            </div>
          </div>
          <Navbar isOpen={isNavbarOpen} />
        </header>
      ) : (
        <header className="h-[40pt] md:px-40 lg:px-60 bg-white text-zinc-600 sticky top-0 left-0 right-0 z-20 flex items-center">
          <div className="container mx-auto flex justify-between px-5">
            <div className="flex items-center font-bold">
              <Link className="me-2" to={backLink}>
                <ChevronLeft strokeWidth={3.5} />
              </Link>
              {title}
            </div>
          </div>
        </header>
      )}

      {administrationOpen && (
        <div 
          className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center z-[9999]"
          style={{
            backdropFilter: "blur(12px)"
          }}
        >
          <div className="bg-white p-5 rounded-3xl w-5/6">
            <div className="font-[500]">Administration</div>
            <div className="py-5 flex">
              <div className="w-1/2">
                <Link to={"/users"} className="inline-block border p-5 rounded-3xl">
                  <Users size={32} className="mb-2" />
                  Utilisateurs
                </Link>
              </div>
              <div className="w-1/2">
                <Link to={"/subscription-transactions"} className="inline-block border p-5 rounded-3xl">
                  <ArrowLeftRight size={32} className="mb-2" />
                  Transactions
                </Link>
              </div>
            </div>
            <div>
              <Button variant="secondary" onClick={() => setAdministrationOpen(false)}>Fermer</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
