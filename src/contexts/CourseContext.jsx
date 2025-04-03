import { createContext, useContext, useEffect, useState } from "react";
import { createCourseRequest, getCourseRequest, getRandCourseRequest, uploadFileRequest, createCourseVideoRequest, getCourseVideosRequest, getCourseVideoRequest, getCourseLikeRequest, createCourseLikeRequest, deleteCourseRequest, getAllCoursesRequest, getCoursesByKeywordRequest } from "../services/api";
import { AuthContext } from "./AuthContext";

export const CourseContext = createContext()
export const CourseProvider = ({ children }) => {
  const { registerToken } = useContext(AuthContext)
  const [videoUploadProgression, setVideoUploadProgression] = useState(0)
  const [displayedCourses, setDisplayedCourses] = useState([])
  const [noCourseToLoad, setNoCourseToLoad] = useState(false)
  const [tags, setTags] = useState([
    {value: "all", label: "Tous", active: true},
  ])
  
  const categories = [
    {value: "programing", label: "Programmation"},
    {value: "language", label: "Langue"},
    {value: "music", label: "Musique"},
    {value: "computer-science", label: "Informatique"},
    {value: "general-education", label: "Enseignement Général"},
    {value: "mathematics", label: "Mathématiques"},
    {value: "physic-chimie", label: "Physique et Chimie"},
    {value: "technologie", label: "Technologie"},
    {value: "dessin", label: "Dessin"},
  ]

  const createCourse = async (data) => {
    const coverPhotoUploadData = await uploadFileRequest(data.coverPhotoFile, "image")
    data.coverPhotoUrl = coverPhotoUploadData.url
    console.log(data)
    return await createCourseRequest(data)
  }
  const deleteCourse = async (courseId) => {
    const deletedCourse = await deleteCourseRequest(courseId)
    return deletedCourse
  }
  const getCourse = async (cId) => {
    const course = await getCourseRequest(cId)
    return course
  }
  const getAllCourses = async (offset, limit) => {
    const allCourses = await getAllCoursesRequest(offset, limit)
    return allCourses
  }
  const getCoursesByKeyword = async (keyword, offset, limit) => {
    const courses = await getCoursesByKeywordRequest(keyword, offset, limit)
    return courses
  }
  const getRandCourse = async () => {
    const course = await getRandCourseRequest()
    return course
  }
  const reactCourse = async (cId) => {
    const result = await createCourseLikeRequest(cId)
    return result
  }
  const getCourseLike = async (cId) => {
    const result = await getCourseLikeRequest(cId)
    return result
  }
  const addVideo = async (vData) => {
    const videoUploadData = await uploadFileRequest(vData.video_file, "video", (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percent = Math.round((loaded * 100) / total)
      setVideoUploadProgression(percent)
    })
    const thumbnailUploadData = await uploadFileRequest(vData.thumbnail_file, "image")
    const courseVideo = await createCourseVideoRequest({
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
    const courseVideos = await getCourseVideosRequest(cId)
    return courseVideos
  }
  const getVideo = async (cId, vId) => {
    const video = await getCourseVideoRequest(cId, vId)
    return video
  }

  useEffect(() => {
    (async () => {
      await registerToken()
    })()

    console.log("Tags count", tags.length)

    for (let i = 0; i < categories.length; i++) {
      const tag = {
        value: categories[i].value,
        label: categories[i].label,
        active: false
      }
      tags[i+1] = tag
    }
  }, [tags])
  
  return (
    <CourseContext.Provider 
      value={{ 
        categories, 
        tags,
        setTags,
        createCourse, 
        deleteCourse, 
        getCourse, 
        getAllCourses, 
        getCoursesByKeyword, 
        getRandCourse, 
        reactCourse, 
        getCourseLike, 
        displayedCourses, 
        setDisplayedCourses, 
        addVideo, 
        videoUploadProgression, 
        getVideos, 
        getVideo,
        noCourseToLoad,
        setNoCourseToLoad,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}
