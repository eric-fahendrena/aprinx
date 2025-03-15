import { useContext, useEffect } from "react"
import BottomNavbar from "./commons/BottomNavbar"
import { NotificationContext } from "../contexts/NotificationContext"

function NotificationsPage() {
  const { reinitUnseenNotificationsCount, seeAllNotifications } = useContext(NotificationContext)

  useEffect(() => {
    (async () => {
      console.log("Seeing all notification...")
      reinitUnseenNotificationsCount()
      const seenNotifications = await seeAllNotifications()
    })()
  }, [])

  return (
    <>
      <div className="container mx-auto px-5 mt-5">
        
      </div>
      <BottomNavbar current="notifications" />
    </>
  )
}

export default NotificationsPage
