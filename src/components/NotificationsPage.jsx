import { useContext, useEffect, useState } from "react"
import Header from "./commons/Header"
import BottomNavbar from "./commons/BottomNavbar"
import { NotificationContext } from "../contexts/NotificationContext"
import LazyObserver from "./commons/LazyObserver"
import dayjs from "dayjs"
import { MessageSquareText, Heart, ArrowLeftRight, Check } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { socket } from "../services/socketService"
import LgScreenContainer from "./commons/LgScreenContainer"

function NotificationsPage() {
  const { 
    reinitUnseenNotificationsCount, 
    seeAllNotifications, 
    getAllNotifications, 
    notifications, 
    setNotifications,
    nothingToLoad,
    setNothingToLoad,
    readNotification,
    notificationsOffset,
    setNotificationsOffset,
  } = useContext(NotificationContext)
  const navigate = useNavigate()
  const [reading, setReading] = useState(false)
  let offset = notificationsOffset
  let limit = 10

  const handleObserverInView = async () => {
    console.log("Getting all notifications")
    const notifications = await getAllNotifications(offset, limit)
    console.log("Notifications", notifications)
    setNotifications(prev => {
      return [...prev].concat(notifications)
    })

    if (notifications.length < limit) {
      setNothingToLoad(true)
      return
    }
    offset += limit
    setNotificationsOffset(offset)
  }

  const handleNotifClick = async (e, notif) => {
    e.preventDefault()
    if (!notif.is_read) {
      setReading(true)
      console.log("Reading notification", notif.id)
      const updatedNotification = await readNotification(notif.id)
      console.log("Updated notification", updatedNotification)
      setReading(false)
      notif.is_read = true
    }
    if (notif.type === "COMMENT" || notif.type === "LIKE" || notif.type === "COURSE_TRANSACTION_CONFIRMATION" || notif.type === "COURSE_ACCESS") {
      console.log("Navigate")
      navigate(`/courses/${notif.course_id}`)
    }
    if (notif.type === "COURSE_TRANSACTION") {
      navigate(`/profile`)
    }
  }

  useEffect(() => {
    (async () => {
      console.log("Seeing all notification...")
      reinitUnseenNotificationsCount()
      const seenNotifications = await seeAllNotifications()
    })()
  }, [])

  return (
    <>
      <Header />
      <div className="md:hidden">
        <div className="mb-10">
          {notifications.map((notif, idx) => {
            return (
              <Link key={idx} onClick={(e) => handleNotifClick(e, notif)}>
                <div className={`flex border-b px-5 py-5  ${!notif.is_read ? "bg-zinc-100 border-white" : "bg-white border-zinc-200"}`}>
                  <div className="w-1/6">
                    {notif.type === "COMMENT" && (
                      <div className="w-[24pt] h-[24pt] bg-blue-400 text-white rounded-full flex items-center justify-center">
                        <MessageSquareText size={16} fill="white" />
                      </div>
                    )}
                    {notif.type === "LIKE" && (
                      <div className="w-[24pt] h-[24pt] bg-red-600 text-white rounded-full flex items-center justify-center">
                        <Heart size={16} fill="white" />
                      </div>
                    )}
                    {notif.type === "COURSE_TRANSACTION" && (
                      <div className="w-[24pt] h-[24pt] bg-orange-600 text-white rounded-full flex items-center justify-center">
                        <ArrowLeftRight size={16} fill="white" />
                      </div>
                    )}
                    {(notif.type === "COURSE_TRANSACTION_CONFIRMATION" || notif.type === "COURSE_ACCESS") && (
                      <div className="w-[24pt] h-[24pt] bg-green-600 text-white rounded-full flex items-center justify-center">
                        <Check size={16} strokeWidth={4} />
                      </div>
                    )}
                  </div>
                  <div className="w-5/6">
                    <div className="">
                      <span className="font-[500]">{notif.author_names}</span> 
                      {notif.type === "COMMENT" && <span className="text-zinc-600"> a commenté votre cours</span>}
                      {notif.type === "LIKE" && <span className="text-zinc-600"> a aimé votre cours</span>}
                      {notif.type === "COURSE_TRANSACTION" && <span className="text-zinc-600"> a achété votre cours</span>}
                      {notif.type === "COURSE_TRANSACTION_CONFIRMATION" && <span className="text-zinc-600"> a confirmé votre payement</span>}
                      {notif.type === "COURSE_ACCESS" && <span className="text-zinc-600"> vous a donnée l'accès au cours</span>}
                    </div>
                    <div className="text-zinc-400 text-sm">{dayjs.unix(parseInt(notif.last_update) / 1000).fromNow()}</div>
                  </div>
                </div>
              </Link>
            )
          })}

          {reading && (
            <div 
              className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center"
              style={{
                backgroundColor: "#FFF8",
              }}
            >
              <div>Chargement...</div>
            </div>
          )}

          {nothingToLoad ? (
            <div className="p-5 text-center text-zinc-600 text-sm">
              <div>Aucun éléments à charger</div>
            </div>
          ) : (
            <div className="p-5 text-center">
              <LazyObserver onInView={handleObserverInView} />
            </div>
          )}
          
        </div>
        <BottomNavbar current="notifications" />
      </div>

      <LgScreenContainer>
        <div className="mb-10">
          <h2 className="text-3xl font-[400] mb-5">Notifications</h2>
          {notifications.map((notif, idx) => {
            return (
              <Link key={idx} onClick={(e) => handleNotifClick(e, notif)}>
                <div className={`flex border-b px-5 py-5  ${!notif.is_read ? "bg-zinc-100 border-white" : "bg-white border-zinc-200"}`}>
                  <div className="w-1/6">
                    {notif.type === "COMMENT" && (
                      <div className="w-[24pt] h-[24pt] bg-blue-400 text-white rounded-full flex items-center justify-center">
                        <MessageSquareText size={16} fill="white" />
                      </div>
                    )}
                    {notif.type === "LIKE" && (
                      <div className="w-[24pt] h-[24pt] bg-red-600 text-white rounded-full flex items-center justify-center">
                        <Heart size={16} fill="white" />
                      </div>
                    )}
                    {notif.type === "COURSE_TRANSACTION" && (
                      <div className="w-[24pt] h-[24pt] bg-orange-600 text-white rounded-full flex items-center justify-center">
                        <ArrowLeftRight size={16} fill="white" />
                      </div>
                    )}
                    {(notif.type === "COURSE_TRANSACTION_CONFIRMATION" || notif.type === "COURSE_ACCESS") && (
                      <div className="w-[24pt] h-[24pt] bg-green-600 text-white rounded-full flex items-center justify-center">
                        <Check size={16} strokeWidth={4} />
                      </div>
                    )}
                  </div>
                  <div className="w-5/6">
                    <div className="">
                      <span className="font-[500]">{notif.author_names}</span> 
                      {notif.type === "COMMENT" && <span className="text-zinc-600"> a commenté votre cours</span>}
                      {notif.type === "LIKE" && <span className="text-zinc-600"> a aimé votre cours</span>}
                      {notif.type === "COURSE_TRANSACTION" && <span className="text-zinc-600"> a achété votre cours</span>}
                      {notif.type === "COURSE_TRANSACTION_CONFIRMATION" && <span className="text-zinc-600"> a confirmé votre payement</span>}
                      {notif.type === "COURSE_ACCESS" && <span className="text-zinc-600"> vous a donnée l'accès au cours</span>}
                    </div>
                    <div className="text-zinc-400 text-sm">{dayjs.unix(parseInt(notif.last_update) / 1000).fromNow()}</div>
                  </div>
                </div>
              </Link>
            )
          })}

          {reading && (
            <div 
              className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center"
              style={{
                backgroundColor: "#FFF8",
              }}
            >
              <div>Chargement...</div>
            </div>
          )}

          {nothingToLoad ? (
            <div className="p-5 text-center text-zinc-600 text-sm">
              <div>Aucun éléments à charger</div>
            </div>
          ) : (
            <div className="p-5 text-center">
              <LazyObserver onInView={handleObserverInView} />
            </div>
          )}
          
        </div>
      </LgScreenContainer>
    </>
  )
}

export default NotificationsPage
