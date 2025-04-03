import { ArrowLeft, Mic } from "lucide-react"
import BottomNavbar from "../commons/BottomNavbar"
import { useContext, useEffect, useRef, useState } from "react"

function SearchField({ onSearch, disabled=false }) {
  const [searchInput, setSearchInput] = useState("")
  const inputRef = useRef()

  const handleSearchKeyUp = async (e) => {
    if (e.key === "Enter") {
      onSearch(searchInput)
    }
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <>
      <div className="flex items-center">
        <div className={`w-full ${disabled && "text-zinc-400"}`}>
          <input 
            ref={inputRef}
            type="search" 
            placeholder="Rechercher"
            disabled={disabled}
            className="w-full bg-zinc-200 focus:bg-zinc-300 outline-none border px-3 py-2 rounded-full"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyUp={handleSearchKeyUp}
          />
        </div>
      </div>
      <BottomNavbar current="search" />
    </>
  )
}

export default SearchField
