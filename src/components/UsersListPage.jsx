import { useContext, useEffect, useState } from "react"
import Header from "./commons/Header"
import Button from "./commons/Button"
import LazyObserver from "./commons/LazyObserver"
import { ProfileContext } from "../contexts/ProfileContext"

function UsersListPage() {
  const { 
    getAllUsers, 
    profile, 
    convertToTeacher,
    usrListOffset,
    setUsrListOffset,
    usrListLimit,
  } = useContext(ProfileContext)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [userToConvert, setUserToConvert] = useState(null)
  const [converting, setConverting] = useState(false)

  const handleLazyObserverInView = async () => {
    console.log("Lazy observer i view")
    const users = await getAllUsers(usrListOffset, usrListLimit)
    setUsers(prev => {
      return [...prev].concat(users)
    })

    
    if (users.length < usrListLimit) {
      console.log("User length <", usrListLimit)
      setLoading(false)
      return
    }
    setUsrListOffset(usrListOffset + usrListLimit)

    console.log("Users count", users.length)
    console.log("offset", usrListOffset)

  }

  const handleConvertToTeacherClick = (user) => {
    setUserToConvert(user)
  }

  const handleUndoConversionClick = () => {
    setUserToConvert(null)
  }

  const handleConfirmConversionClick = async (userId) => {
    console.log("Converting...")
    setConverting(true)
    const convertedUser = await convertToTeacher(userId)
    setConverting(false)
    console.log(convertedUser)
  }

  return (
    <>
      <Header title={"Utilisateurs"} backLink={"/"} />
      <div className="container mx-auto px-5">
        {users.map((user, idx) => {
          if (profile && (profile.id === user.id)) {
            return
          }
          return (
            <div className="border rounded-3xl p-3 flex mb-2" key={idx}>
              <div className="w-1/6">
                <img src={user.picture} alt={`photo de ${user.first_name}`} className="w-[24pt] h-[24pt] bg-zinc-400 rounded-full" />
              </div>
              <div className="w-5/6">
                <div className="font-[500]">{user.name}</div>
                <div className="text-zinc-600 text-sm">
                  {user.role === "TEACHER" && "Enseignant"}
                  {user.role === "USER" && "Utilisateur"}
                  {user.role === "ADMIN" && "admin"}
                </div>
                <div className="mt-3">
                  <button 
                    className="w-full font-[500] text-red-800 border px-4 py-2 rounded-3xl"
                    onClick={() => handleConvertToTeacherClick(user)}
                  >Convertir en enseignant</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="py-5">
        {loading ? (
          <LazyObserver onInView={handleLazyObserverInView} />
        ) : (
          <div className="text-center text-zinc-600 text-sm">Il n'y a plus d'utilisateur</div>
        )}
      </div>

      {userToConvert && (
        <div 
          className="fixed top-0 bottom-0 start-0 end-0 z-[9999] flex items-center justify-center"
          style={{
            backdropFilter: "blur(12px)"
          }}
        >
          <div className="p-5 bg-white rounded-3xl w-5/6 shadow">
            <div className="font-[500]">Convertir en enseignant</div>
            <div className="py-5 flex">
              <div className="w-1/4">
                <img src={userToConvert.picture} alt={`Photo de ${userToConvert.first_name}`} className="w-[40pt] h-[40pt] bg-zinc-200 rounded-full" />
              </div>
              <div className="w-3/4">
                <div className="font-[500]">{userToConvert.name}</div>
                <div className="text-zinc-600">
                  {userToConvert.role === "USER" && "Utilisateur"}
                </div>
              </div>
            </div>
            <div className="mb-5">Voulez-vous convertir cet utilisateur en enseignant ?</div>
            <div className="flex">
              <div className="w-1/2 pe-1">
                <Button variant="secondary" onClick={handleUndoConversionClick} disabled={converting}>Annuler</Button>
              </div>
              <div className="w-1/2 ps-1">
                <Button onClick={() => handleConfirmConversionClick(userToConvert.id)} disabled={converting}>{converting ? "..." : "Contertir"}</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UsersListPage
