import { useEffect } from "react"
import { useState } from "react"
import { socket } from "../services/socketService"

const useNotifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const handleReceiveNotification = (notification) => {
      // Receive notification
      setNotifications(prev => [notification, ...prev])
    }

    // On receiveNotification...
    socket.on("receiveNotification", handleReceiveNotification)
    
    return () => {
      socket.off("receiveNotification", handleReceiveNotification)
    }
  }, [])

  return notifications
}

export default useNotifications
