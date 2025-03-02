import { createContext, useEffect, useState } from "react";
import { addCourse, fetchCourse, fetchCourseVideos, sendCourseVideo, fetchCourseVideo, fetchRandCourse, uploadFile, sendReactionToCourse, fetchCourseLiked } from "../services/api";
import { socket } from "../socket";

export const CourseContext = createContext()
export const CourseProvider = ({ children }) => {
  const [videoUploadProgression, setVideoUploadProgression] = useState(0)
  const [displayedCourses, setDisplayedCourses] = useState([])
  const createCourse = async (data) => {
    return await addCourse(data)
  }
  const getCourse = async (cId) => {
    const course = await fetchCourse(cId)
    return course
  }
  const getRandCourse = async () => {
    const course = await fetchRandCourse()
    return course
  }
  const reactCourse = async (cId) => {
    const result = await sendReactionToCourse(cId)
    return result
  }
  const courseLiked = async (cId) => {
    const result = await fetchCourseLiked(cId)
    console.log(result)
    if (result.error)
      return false
    return result.value
  }
  const addVideo = async (vData) => {
    const videoUploadData = await uploadFile(vData.video_file, "video", (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percent = Math.round((loaded * 100) / total)
      setVideoUploadProgression(percent)
    })
    console.log(videoUploadData)
    console.log("video url");
    console.log(videoUploadData.url)
    const thumbnailUploadData = await uploadFile(vData.thumbnail_file, "image")
    const courseVideo = await sendCourseVideo({
      course_id: vData.course_id,
      author_id: vData.author_id,
      title: vData.metadata.title,
      description: vData.metadata.description,
      access: vData.metadata.access,
      url: videoUploadData.url,
      thumbnail: thumbnailUploadData.url,
    })
    setVideoUploadProgression(0)
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

  return (
    <CourseContext.Provider value={{ createCourse, getCourse, getRandCourse, reactCourse, courseLiked, displayedCourses, setDisplayedCourses, addVideo, videoUploadProgression, getVideos, getVideo }}>
      {children}
    </CourseContext.Provider>
  )
}
