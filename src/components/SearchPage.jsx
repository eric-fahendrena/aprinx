import { useContext, useState } from "react"
import Header from "./commons/Header"
import SearchField from "./searcher/SearchField"
import { CourseContext } from "../contexts/CourseContext"
import CourseItem from "./course/CourseItem"
import dayjs from "dayjs"
import { PulseLoader } from "react-spinners"
import LgScreenContainer from "./commons/LgScreenContainer"
import BottomNavbar from "./commons/BottomNavbar"

function SearchPage() {
  const { getCoursesByKeyword } = useContext(CourseContext)
  const [courses, setCourses] = useState([])
  const [searching, setSearching] = useState(false)
  const [noElementFound, setNoElementFound] = useState(false)
  let offset = 0
  let limit = 30
  
  const handleSearch = async (keyword) => {
    console.log("Searching...")
    setSearching(true)
    setCourses([])
    const searchedCourses = await getCoursesByKeyword(keyword, offset, limit)
    setSearching(false)
    setNoElementFound(searchedCourses.length <= 0)
    setCourses((prev) => [...prev].concat(searchedCourses))
    console.log(searchedCourses.length, "courses are found")
  }

  return (
    <>
      <Header />
      <div className="md:hidden">
        <div className="flex justify-start">
          <div className="p-5 w-full">
            <SearchField onSearch={handleSearch} disabled={searching} />
          </div>
        </div>
        {searching ? (
          <div className="p-5 text-center flex items-center justify-center">
            <div>
              <PulseLoader color="#800" size={8} />
            </div>
          </div>
        ) : (
          <>
            {noElementFound && (
              <div className="p-5 text-center flex items-center justify-center text-zinc-400">
                <div>Aucun éléments trouvé</div>
              </div>
            )}
          </>
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

        <BottomNavbar current="search" />
      </div>

      <LgScreenContainer>
        <div className="flex justify-start">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-[400] mb-5">Recherche</h2>
            <SearchField onSearch={handleSearch} disabled={searching} />
          </div>
        </div>
        {searching ? (
          <div className="p-5 text-center flex items-center justify-center">
            <div>
              <PulseLoader color="#800" size={8} />
            </div>
          </div>
        ) : (
          <>
            {noElementFound && (
              <div className="p-5 text-center flex items-center justify-center text-zinc-400">
                <div>Aucun éléments trouvé</div>
              </div>
            )}
          </>
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
      </LgScreenContainer>
    </>
  )
}

export default SearchPage
