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
  // const [displayedCourses, setDisplayedCourses] = useState([])
  const { getRandCourse } = useContext(CourseContext)
  // load random courses
  const addCourseToDisplay = async () => {
    const randCourses = []
    for (let i = 0; i < 5; i++) {
      const randCourse = await getRandCourse()
      randCourses.push(randCourse)
    }
    setDisplayedCourses((prevCourses) => {
      return [...prevCourses].concat(randCourses)
    })
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
        <LazyObserver onInView={addCourseToDisplay} />
      </div>
      <BottomNavbar current="home" />
    </>
  )
}

export default HomePage
