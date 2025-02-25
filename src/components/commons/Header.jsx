import { Search, Menu, ChevronLeft, X } from "lucide-react"
import Navbar from "./Navbar"
import { useState } from "react"
import { Link } from "react-router-dom"

function Header({ title, backLink }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  return (
    <>
      {!title ? (
        <header className="h-[32pt] bg-white sticky top-0 left-0 right-0 z-20 flex items-center">
          <div className="container mx-auto flex justify-between px-5">
            <div className="w-[24pt] h-[24pt] flex items-center justify-center font-bold text-2xl">
              S
            </div>
            <div className="flex">
              <button className="me-5">
                <Search />
              </button>
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
        <header className="h-[32pt] bg-white text-zinc-600 sticky top-0 left-0 right-0 z-20 flex items-center">
          <div className="container mx-auto flex justify-between px-5">
            <div className="flex items-center font-bold">
              <Link className="me-2" to={backLink}>
                <ChevronLeft strokeWidth={3.5} />
              </Link>
              {title}
            </div>
            <div className="flex text-white">
              <button>
                <Search />
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  )
}

export default Header
