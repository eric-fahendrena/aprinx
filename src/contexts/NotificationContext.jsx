import { createContext, useState, useEffect, useContext } from "react"
import { getAllNotificationsRequest, getUnseenNotificationsCountRequest, readNotificationRequest, seeAllNotificationRequest } from "../services/api"
import { socket } from "../services/socketService"
import { AuthContext } from "./AuthContext"
import { ProfileContext } from "./ProfileContext"

export const NotificationContext = createContext()
export const NotificationProvider = ({ children }) => {
	const { isAuthorized, profile } = useContext(ProfileContext)
	const [unseenNotificationsCount, setUnseenNotificationsCount] = useState(0)
	const { registerToken } = useContext(AuthContext)
	const [notifications, setNotifications] = useState([])
  const [nothingToLoad, setNothingToLoad] = useState(false)

	const getUnseenNotificationsCount = async () => {
		const unseenNotificationsCount = await getUnseenNotificationsCountRequest()
		return unseenNotificationsCount
	}

	const seeAllNotifications = async () => {
		const seenNotifications = await seeAllNotificationRequest()
		return seenNotifications
	}

	const reinitUnseenNotificationsCount = () => {
		setUnseenNotificationsCount(0)
	}

	const getAllNotifications = async (offset, limit) => {
		const notifications = await getAllNotificationsRequest(offset, limit)
		return notifications
	}

	const readNotification = async (notifId) => {
		const notification = await readNotificationRequest(notifId)
		return notification
	}

	useEffect(() => {
		(async () => {
			await registerToken()
			if (profile) {
				setUnseenNotificationsCount(await getUnseenNotificationsCount())
			}
		})()

		const handleReceiveNotification = async (notification) => {
			console.log("Receive notification", notification)
			const unseenNotificationCount = await getUnseenNotificationsCount()
			setUnseenNotificationsCount(unseenNotificationCount)

			setNotifications([])
			setNothingToLoad(false)
		}

		socket.on("receiveNotification", handleReceiveNotification)
		
		return () => {
			socket.off("receiveNotification", handleReceiveNotification)
		}
	}, [notifications, isAuthorized])

	return (
		<NotificationContext.Provider 
			value={{ 
				unseenNotificationsCount, 
				seeAllNotifications, 
				reinitUnseenNotificationsCount, 
				getAllNotifications, 
				notifications, 
				setNotifications,
				nothingToLoad,
				setNothingToLoad,
				readNotification,
			}}>
			{children}
		</NotificationContext.Provider>
	)
}
