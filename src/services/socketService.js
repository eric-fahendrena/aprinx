import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_URL
export const socket = io(API_BASE_URL)

export const connectSocket = (userId) => {
  socket.connect()
  socket.emit("joinUserRoom", userId)
}

export const disconnectSocket = () => {
  socket.disconnect()
}
