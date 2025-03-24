import Header from "./commons/Header"
import BottomNavbar from "./commons/BottomNavbar"
import Button from "./commons/Button"
import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../contexts/ProfileContext"
import { useNavigate } from "react-router-dom"
import { User, User2 } from "lucide-react"
import BottomSheet from "./commons/BottomSheet"
import CourseTransactionsManager from "./course/CourseTransactionsManager"
import { SubscriptionContext } from "../contexts/SubscriptionContext"
import dayjs from "dayjs"

function ProfilePage() {
  const { profile, isLoading, error } = useContext(ProfileContext)
  const [openTransManager, setOpenTransManager] = useState(false)
  const navigate = useNavigate()
  const [subscriptionDetail, setSubscriptionDetail] = useState()
  const { getSubscription } = useContext(SubscriptionContext)

  useEffect(() => {
    (async () => {
      const teacherSubscription = await getSubscription(profile.id)
      console.log(subscriptionDetail)
      setSubscriptionDetail(teacherSubscription)
    })()
  }, [profile])
  
  if (isLoading) {
    return (
      <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center">
        <div>Chargement...</div>
      </div>
    )
  }

  return (
    <>
      <Header title={"Mon profile"} backLink={"/"} />
      <div className="p-5">
        {!error ? (
          <>
            <div className="w-full p-5 flex border rounded-3xl shadow mb-3">
              <div className="w-1/4">
                <img 
                  src={profile.picture} 
                  alt={`${profile.given_name} photo`} 
                  className="w-[56pt] h-[56pt] inline-block rounded-full" 
                />
              </div>
              <div className="w-3/4 px-5">
                <div className="font-[500] text-[16pt] text-zinc-600">{profile.name}</div>
                <div className="text-zinc-600">
                  {profile.role === "TEACHER" && "Enseignant"}
                  {profile.role === "ADMIN" && "Administrateur"}
                  {profile.role === "USER" && "Utilisateur"}
                </div>
              </div>
            </div>

            {profile.role === "TEACHER" || profile.role === "ADMIN" && (
              <>
                {subscriptionDetail && (
                  <>
                    <div className="w-full p-5 border rounded-3xl shadow mb-3">
                      <div className="font-[500] mb-3">Détails de l'abonnement</div>
                      <div>Status : 
                        {subscriptionDetail.status === "ACTIVE" && (
                          <span className="text-green-600"> Active</span>
                        )}
                        {subscriptionDetail.status === "EXPIRED" && (
                          <span className="text-red-600"> Expirée</span>
                        )}
                      </div>
                      <div>Expiration : {dayjs.unix(subscriptionDetail.expiration_date / 1000).format("DD MMMM YYYY")}</div>
                      <div>Prochain tarif : {subscriptionDetail.next_payment_amount} MGA</div>
                      {subscriptionDetail.renewable && (
                        <div className="mt-5">
                          <Button>Rénouveler l'abonnement</Button>
                        </div>
                      )}
                    </div>

                    <div className="w-full p-5 border rounded-3xl shadow">
                      <div className="font-[500] mb-3">Gestion de cours</div>
                      <div className="">
                        <div className="mb-3">
                          <Button variant="secondary" onClick={() => setOpenTransManager(true)}>Gérer les transactions</Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <div className="text-center p-5">
            <div className="mb-5 text-zinc-600">
              <User2 size={80} strokeWidth={1} className="inline-block" />
            </div>
            <p className="text-zinc-600 mb-5">Veuillez d'abord vous connecter</p>
            <div className="px-[32pt]">
              <Button onClick={() => navigate("/login")}>Connexion</Button>
            </div>
          </div>
        )}
      </div>
      <BottomNavbar current="profile" />
      <BottomSheet open={openTransManager} onClose={() => setOpenTransManager(false)}>
        <CourseTransactionsManager />
      </BottomSheet>
    </>
  )
}

export default ProfilePage
