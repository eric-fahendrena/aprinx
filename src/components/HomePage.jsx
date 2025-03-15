import Header from "./commons/Header"
import ScrollableTab from "./commons/ScrollableTabs"
import BottomNavbar from "./commons/BottomNavbar"
import CourseItem from "./course/CourseItem"
import { useContext, useState } from "react"
import { CourseContext } from "../contexts/CourseContext"
import LazyObserver from "./commons/LazyObserver"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/fr"

dayjs.extend(relativeTime)
dayjs.locale("fr")

function HomePage() {
  const { displayedCourses, setDisplayedCourses} = useContext(CourseContext)
  const { getAllCourses } = useContext(CourseContext)
  const [lazyObserverVisible, setLazyObserverVisible] = useState(true)
  const coursesLimit = 10
  let coursesOffset = 0

  // load random courses
  const handleLazyObserverInView = async () => {
    console.log("Getting all courses...")
    const loadedCourses = await getAllCourses(coursesOffset, coursesLimit)
    console.log("Loaded courses", loadedCourses)
    setDisplayedCourses((prevCourses) => {
      return [...prevCourses].concat(loadedCourses)
    })
    coursesOffset += coursesLimit
    if (loadedCourses.length <= 0)
      setLazyObserverVisible(false)
  }

  return (
    <>
      <Header />
      <ScrollableTab />
      <div className="container mx-auto pb-[56pt]">
        {displayedCourses.map((course, idx) => {
          const dateMs = parseInt(course.date)
          const dateSeconds = Math.floor(dateMs / 1000)
          const date = dayjs.unix(dateSeconds).fromNow()

          return (
            <CourseItem 
              cId={course.id}
              category={JSON.parse(course.category).label}
              title={course.title}
              coverPhoto={course.cover_photo}
              authorName={course.author_name}
              authorPicture={course.author_picture}
              date={date}
              key={idx}
            />
          )
        })}
        {lazyObserverVisible ? (
          <div className="p-5">
            <LazyObserver onInView={handleLazyObserverInView} />
          </div>
        ) : (
          <div className="p-5 text-center text-zinc-500">
            Aucun cours à charger
          </div>
        )}
      </div>
      <BottomNavbar current="home" />
    </>
  )
}

export default HomePage
