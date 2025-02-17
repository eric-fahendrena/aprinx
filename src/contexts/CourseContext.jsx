import { createContext, useEffect, useState } from "react";
import { addCourse, fetchAllCourses, fetchCourse, fetchCourseVideos, sendCourseVideo, fetchCourseVideo, fetchRandCourse } from "../services/api";
import { socket } from "../socket";

export const CourseContext = createContext()
export const CourseProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState(null)
  const createCourse = async (data) => {
    await addCourse(data)
  }
  const getCourse = async (cId) => {
    const course = await fetchCourse(cId)
    return course
  }
  const getRandCourse = async () => {
    const course = await fetchRandCourse()
    return course
  }
  const addVideo = async (vData) => {
    const courseVideo = await sendCourseVideo(vData)
    return courseVideo
  }
  const getVideos = async (cId) => {
    const courseVideos = await fetchCourseVideos(cId)
    return courseVideos
  }
  const getVideo = async (cId, vId) => {
    const video = await fetchCourseVideo(cId, vId)
    return video
  }

  

  useEffect(() => {
    (async () => {
      const allCourses = await fetchAllCourses()
      setAllCourses(allCourses)
    })()
    socket.on("create-video-progress", (progress) => {
      console.log(progress)
    })
  }, [])

  return (
    <CourseContext.Provider value={{ createCourse, getCourse, getRandCourse, allCourses, addVideo, getVideos, getVideo }}>
      {children}
    </CourseContext.Provider>
  )
}
