import BottomNavbar from "./commons/BottomNavbar"
import Button from "./commons/Button"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ProfileContext } from "../contexts/ProfileContext"
import { useNavigate } from "react-router-dom"
import { User2 } from "lucide-react"
import BottomSheet from "./commons/BottomSheet"
import CourseTransactionsManager from "./course/CourseTransactionsManager"
import { SubscriptionContext } from "../contexts/SubscriptionContext"
import SubscriptionForm from "./subscription/SubscriptionForm"
import dayjs from "dayjs"
import LazyObserver from "./commons/LazyObserver"
import { TransactionContext } from "../contexts/TransactionContext"
import { Helmet } from "react-helmet"

function ProfilePage() {
  const navigate = useNavigate()
  const { getPendingSubscriptionTransactionsCount, subscription } = useContext(SubscriptionContext)
  const { getSubscription, paymentInfos } = useContext(SubscriptionContext)
  const { getCourseTransactionCount } = useContext(TransactionContext)
  const { 
    isLoading, 
    isAuthorized, 
    profile 
  } = useContext(ProfileContext)
  const { 
    getBoughtCoursesCount, 
    setBoughtCoursesCount, 
    boughtCoursesCount,
    getBoughtCourses,
    setBoughtCourses,
    boughtCourses,
    boughtCoursesLoading,
    setBoughtCoursesLoading,
    courseTransactionsCount,
    setCourseTransactionsCount,
  } = useContext(ProfileContext)
  const [openTransManager, setTransManagerOpen] = useState(false)
  const [subscriptionDetail, setSubscriptionDetail] = useState()
  const [subscriptionFormOpen, setSubscriptionFormOpen] = useState(false)
  const [pendingSubTransCount, setPendingSubTransCount] = useState(0)
  let boughtCoursesOffset = 0
  let boughtCoursesLimit = 30

  const handleRenewSubscriptionClick = () => {
    setSubscriptionFormOpen(true)
  }
  const handleSubscritpionFormClose = () => {
    setSubscriptionFormOpen(false)
  }

  const handleBoughtCoursesObserverInView = async () => {
    console.log("Getting bought courses")
    const boughtCourses = await getBoughtCourses(boughtCoursesOffset, boughtCoursesLimit)
    console.log("Bought courses", boughtCourses)
    setBoughtCourses(prev => {
      return [...prev].concat(boughtCourses)
    })
    if (boughtCourses.length < boughtCoursesLimit) {
      setBoughtCoursesLoading(false)
      return
    }
    boughtCoursesOffset += boughtCoursesLimit
  }

  useEffect(() => {
    (async () => {
      if (isAuthorized) {
        setSubscriptionDetail(subscription)
  
        console.log("Getting bought courses count...")
        const boughtCoursesCount = await getBoughtCoursesCount()
        console.log("Bought courses count", boughtCoursesCount)
        setBoughtCoursesCount(boughtCoursesCount)

        if (profile.role === "TEACHER" || profile.role === "ADMIN") {
          console.log("Getting course transactions count")
          const courseTransCount = await getCourseTransactionCount()
          console.log("Course transactions count", courseTransCount)
          setCourseTransactionsCount(courseTransCount)
        }

        if (profile && profile.role === "ADMIN") {
          console.log("Getting pending subscription transaction count")
          const pendingSubTransCount = await getPendingSubscriptionTransactionsCount()
          console.log("Pending subscription transactions count", pendingSubTransCount)
          setPendingSubTransCount(pendingSubTransCount)
        }
      }
    })()
  }, [profile, isAuthorized])

  if (isLoading) {
    return (
      <div className="fixed top-0 bottom-0 start-0 end-0 bg-white flex items-center justify-center">
        <div className="text-zinc-600">Chargement...</div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Profil - Aprix Madagascar</title>
      </Helmet>
      <header className="px-5 py-3 md:px-40 lg:px-60 bg-[#800] text-white font-[500] sticky top-0 z-[10]">
        <div className="">Mon profil</div>
      </header>
      {isAuthorized && (
        <div
          className="h-[120pt] relative text-center py-5 md:mx-40 lg:mx-60"
          style={{
            backgroundColor: "#8004"
          }}
        >
          <div className="absolute top-1/2 -bottom-1/2 start-0 end-0 px-5">
            <div className="absolute start-0 end-0 -top-1/4 flex items-center justify-center">
              <div className="text-center w-full px-5">
                <div className="w-[56pt] h-[56pt] inline-block bg-white rounded-full overflow-hidden">
                  <img src={profile.picture} alt="Photo de profile" className="w-full h-full object-cover" />
                </div>
                <div className="font-[400]">{profile.name}</div>
                <div className="flex justify-around p-5">
                  <div className="w-1/3 text-center">
                    <div className="text-3xl">{boughtCoursesCount || 0}</div>
                    <div className="text-zinc-400 uppercase text-sm">Achétés</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white h-full shadow rounded-3xl">
              
            </div>
          </div>
        </div>
      )}

      <div className="mt-24 px-5 md:px-40 lg:px-60">
        {boughtCoursesCount > 0 && (
          <div className="mb-5">
            <div className="font-[400] mb-3">Cours achétés</div>
            <div className="w-full overflow-scroll scrollbar-hide">
              <div className="text-nowrap">
                {boughtCoursesLoading && (
                  <LazyObserver onInView={handleBoughtCoursesObserverInView}>
                    <div className="w-[49%] pe-3 inline-block animate-pulse">
                      <div className="shadow rounded-3xl overflow-hidden">
                        <div className="w-full h-[80pt] bg-zinc-200"></div>
                        <div className="p-3">
                          <div className="w-1/2 mb-2 font-[400] h-[6px] rounded-3xl bg-zinc-200"></div>
                          <div className="h-[6px] bg-zinc-200 rounded-3xl"></div>
                        </div>
                      </div>
                    </div>
                  </LazyObserver>
                )}

                {boughtCourses.map((course, idx) => {
                  return (
                    <Link to={`/courses/${course.id}`} key={idx}>
                      <div className="w-[49%] pe-3 inline-block">
                        <div className="shadow rounded-3xl overflow-hidden">
                          <div className="w-full h-[88pt] bg-zinc-200">
                            <img src={course.cover_photo} alt={course.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-3">
                            <div className="mb-1 font-[400] text-sm">{JSON.parse(course.category).label}</div>
                            <div className="text-zinc-400 text-xs">{course.title.substring(0, 16)}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
                
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="px-5 md:px-40 lg:px-60">
        {isAuthorized ? (
          <>
            {(profile.role === "TEACHER") && (
              <>
                {subscriptionDetail && (
                  <>
                    <div className="w-full p-5 rounded-3xl shadow mb-3">
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
                          <Button onClick={handleRenewSubscriptionClick}>Rénouveler l'abonnement</Button>
                        </div>
                      )}
                    </div>

                    {subscriptionFormOpen && (
                      <SubscriptionForm 
                        subscription={subscriptionDetail} 
                        paymentInfos={paymentInfos} 
                        onClose={handleSubscritpionFormClose} 
                      />
                    )}
                  </>
                )}
              </>
            )}

            {profile.role === "ADMIN" && (
              <div className="mb-5 p-5 shadow rounded-3xl">
                <div className="font-[400]">Abonnements en attente</div>
                <div className="">Total : <span className="text-[2rem] font-[500]">{pendingSubTransCount}</span></div>
                <div>
                  <Link to={"/subscription-transactions"} className="text-[#800] font-[500]">Voir les transactions</Link>
                </div>
              </div>
            )}

            {(profile.role === "TEACHER" || profile.role === "ADMIN") && (
              <>
                {courseTransactionsCount && (
                  <div className="mb-5 p-5 shadow rounded-3xl">
                    <div className="font-[400]">Achats en attente</div>
                    <div>Total : <span className="text-[2rem] font-[500]">{courseTransactionsCount}</span></div>
                    <div>
                      <button className="text-[#800] font-[500]" onClick={() => setTransManagerOpen(true)}>Voir les transactions</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <div className="text-center p-5">
              <div className="mb-5 text-zinc-600">
                <User2 size={80} strokeWidth={1} className="inline-block" />
              </div>
              <p className="text-zinc-600 mb-5">Veuillez d'abord vous connecter</p>
              <div className="px-[32pt]">
                <Button onClick={() => navigate("/login")}>Connexion</Button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mb-[240pt]"></div>
      <BottomNavbar current="profile" />
      <BottomSheet open={openTransManager} onClose={() => setTransManagerOpen(false)}>
        <CourseTransactionsManager />
      </BottomSheet>
    </>
  )
}

export default ProfilePage
