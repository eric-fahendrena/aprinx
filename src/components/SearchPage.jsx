import { useContext, useState } from "react"
import SearchField from "./searcher/SearchField"
import { CourseContext } from "../contexts/CourseContext"
import CourseItem from "./course/CourseItem"
import dayjs from "dayjs"
import { PulseLoader } from "react-spinners"

function SearchPage() {
  const { getCoursesByKeyword } = useContext(CourseContext)
  const [courses, setCourses] = useState([])
  const [searching, setSearching] = useState(false)
  let offset = 0
  let limit = 30
  
  const handleSearch = async (keyword) => {
    console.log("Searching...")
    setSearching(true)
    setCourses([])
    const searchedCourses = await getCoursesByKeyword(keyword, offset, limit)
    setSearching(false)
    setCourses((prev) => [...prev].concat(searchedCourses))
    console.log(searchedCourses.length, "courses are found")
  }

  return (
    <>
      <div className="container mx-auto md:px-40 lg:px-60">
        <div className="p-5">
          <SearchField onSearch={handleSearch} />
        </div>
      </div>

      {searching && (
        <div className="p-5 text-center flex items-center justify-center">
          <div>
            {/* <div className="mb-5">Recherche</div> */}
            <PulseLoader color="#800" size={8} />
          </div>
        </div>
      )}
      {courses.map((course, idx) => {
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
      <div className="py-5 mb-10"></div>
    </>
  )
}

export default SearchPage
