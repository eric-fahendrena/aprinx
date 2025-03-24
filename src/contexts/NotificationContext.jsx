import { createContext, useState, useEffect, useContext } from "react"
import { getUnseenNotificationsCountRequest, seeAllNotificationRequest } from "../services/api"
import { socket } from "../services/socketService"
import { AuthContext } from "./AuthContext"

export const NotificationContext = createContext()
export const NotificationProvider = ({ children }) => {
	const [unseenNotificationsCount, setUnseenNotificationsCount] = useState(0)
	const { registerToken } = useContext(AuthContext)

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

	useEffect(() => {
		(async () => {
			await registerToken()
			setUnseenNotificationsCount(await getUnseenNotificationsCount())
		})()

		const handleReceiveNotification = async (notification) => {
			console.log("Receive notification", notification)
			const unseenNotificationCount = await getUnseenNotificationsCount()
			setUnseenNotificationsCount(unseenNotificationCount)
		}

		socket.on("receiveNotification", handleReceiveNotification)
		
		return () => {
			socket.off("receiveNotification", handleReceiveNotification)
		}
	}, [])

	return (
		<NotificationContext.Provider value={{ unseenNotificationsCount, seeAllNotifications, reinitUnseenNotificationsCount }}>
			{children}
		</NotificationContext.Provider>
	)
}
