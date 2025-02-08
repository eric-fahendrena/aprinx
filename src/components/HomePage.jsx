import Header from "./commons/Header"
import ScrollableTab from "./commons/ScrollableTabs"
import BottomNavbar from "./commons/BottomNavbar"
import CourseItem from "./course/CourseItem"
import { useContext } from "react"
import { CourseContext } from "../contexts/CourseContext"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/fr"

dayjs.extend(relativeTime)
dayjs.locale("fr")

function HomePage() {
  const { allCourses } = useContext(CourseContext)
  console.log(allCourses)

  return (
    <>
      <Header />
      <ScrollableTab />
      <div className="container mx-auto pb-[56pt]">
        {allCourses && allCourses.map((course, idx) => {
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
      </div>
      <BottomNavbar current="home" />
    </>
  )
}

export default HomePage
