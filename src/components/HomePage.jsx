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
import { Helmet } from "react-helmet"

dayjs.extend(relativeTime)
dayjs.locale("fr")

function HomePage() {
  const { displayedCourses, setDisplayedCourses} = useContext(CourseContext)
  const { getAllCourses, getCoursesByKeyword } = useContext(CourseContext)
  const [lazyObserverVisible, setLazyObserverVisible] = useState(true)
  const [category, setCategory] = useState()
  let coursesLimit = 10
  let coursesOffset = 0

  // load random courses
  const handleLazyObserverInView = async () => {
    let loadedCourses;
    console.log("Offset", coursesOffset)
    console.log(category)
    if (!category) {
      console.log("Getting all course")
      loadedCourses = await getAllCourses(coursesOffset, coursesLimit)
      console.log(loadedCourses.length, "courses loaded !")
    } else {
      console.log("Searching by category...")
      loadedCourses = await getCoursesByKeyword(category, coursesOffset, coursesLimit)
      console.log(loadedCourses.length, "courses found")
    }
    console.log(loadedCourses)
    setDisplayedCourses((prevCourses) => {
      return [...prevCourses].concat(loadedCourses)
    })

    coursesOffset += coursesLimit
    if (loadedCourses.length < coursesLimit) {
      setLazyObserverVisible(false)
    }
  }

  const handleScrollTabSelect = async (tag) => {
    coursesOffset = 0
    if (tag.value === "all") {
      setCategory(null)
    } else {
      setCategory(JSON.stringify({
        value: tag.value,
        label: tag.label,
      }))
    }
    setDisplayedCourses([])
    // await handleLazyObserverInView()
    setLazyObserverVisible(true)
  }

  return (
    <>
      <Helmet>
        <title>Accueil - Aprix Madagascar</title>
        <meta property="og:title" content="Accueil - Aprix Madagascar" />
        <meta property="og:description" content="Bienvenue sur Aprix Madagascar, une plateforme qui facilite l'échange entre les vendeurs de tutoriels vidéo et les acheteurs." />
      </Helmet>
      <Header />
      <ScrollableTab onSelect={handleScrollTabSelect}/>
      <div className="container mx-auto md:px-40 lg:px-60 pt-5 pb-[56pt]">
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
        {lazyObserverVisible && (
          <div className="p-5">
            <LazyObserver onInView={handleLazyObserverInView} />
          </div>
        )}
        {(!lazyObserverVisible && displayedCourses.length <= 0) && (
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
