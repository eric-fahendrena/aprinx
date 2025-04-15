import Header from "./commons/Header"
import ScrollableTab from "./commons/ScrollableTabs"
import BottomNavbar from "./commons/BottomNavbar"
import CourseItem from "./course/CourseItem"
import { useContext, useEffect, useState } from "react"
import { CourseContext } from "../contexts/CourseContext"
import LazyObserver from "./commons/LazyObserver"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/fr"
import { Helmet } from "react-helmet-async"
import LgScreenContainer from "./commons/LgScreenContainer"

dayjs.extend(relativeTime)
dayjs.locale("fr")

function HomePage() {
  const { 
    displayedCourses, 
    setDisplayedCourses, 
    noCourseToLoad, 
    setNoCourseToLoad,
    dispCoursesOffset,
    setDispCoursesOffset,
  } = useContext(CourseContext)
  const { getAllCourses, getCoursesByKeyword } = useContext(CourseContext)
  const [lazyObserverVisible, setLazyObserverVisible] = useState(true)
  const [category, setCategory] = useState()
  const [coursesEmpty, setCoursesEmpty] = useState(false)
  let coursesLimit = 10
  let coursesOffset = dispCoursesOffset

  // load courses
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

    if (loadedCourses.length === 0 ) {
      console.log("Loaded course empty")
      setCoursesEmpty(true)
    } else {
      setCoursesEmpty(false)
    }

    if (loadedCourses.length < coursesLimit) {
      setNoCourseToLoad(true)
      return
    }


    coursesOffset += coursesLimit
    setDispCoursesOffset(coursesOffset)
    console.log("Offset :", coursesOffset)
  }

  const handleScrollTabSelect = async (tag) => {
    setNoCourseToLoad(false)
    setDispCoursesOffset(0)
    setCoursesEmpty(false)
    
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

  useEffect(() => {
    if (displayedCourses.length > 0) {
      setLazyObserverVisible(false)
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Accueil - Aprix Madagascar</title>
        <meta property="og:title" content="Accueil - Aprix Madagascar" />
        <meta property="og:description" content="Bienvenue sur Aprix Madagascar, une plateforme qui facilite l'échange entre les vendeurs de tutoriels vidéo et les acheteurs." />
      </Helmet>
      <Header />
    
      {/* for small screens */}

      <div className="md:hidden">
        <ScrollableTab onSelect={handleScrollTabSelect}/>
        
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

        {!noCourseToLoad && (
          <div className="p-5">
            <LazyObserver onInView={handleLazyObserverInView} />
          </div>
        )}
        {coursesEmpty && (
          <div className="text-center py-5 text-zinc-400">Aucun cours trouvé</div>
        )}

        <BottomNavbar current="home" />
      </div>

      {/* for medium screens */}

      <LgScreenContainer>
        <div className="flex flex-wrap px-5">
          <div className="w-full">
            <ScrollableTab onSelect={handleScrollTabSelect}/>
          </div>

          {displayedCourses.map((course, idx) => {
            const dateMs = parseInt(course.date)
            const dateSeconds = Math.floor(dateMs / 1000)
            const date = dayjs.unix(dateSeconds).fromNow()

            return (
              <div className="w-full lg:w-1/2" key={idx}>
                <CourseItem 
                  cId={course.id}
                  category={JSON.parse(course.category).label}
                  title={course.title}
                  coverPhoto={course.cover_photo}
                  authorName={course.author_name}
                  authorPicture={course.author_picture}
                  date={date}
                />
              </div>
            )
          })}
        </div>

        {!noCourseToLoad && (
          <div className="p-5">
            <LazyObserver onInView={handleLazyObserverInView} />
          </div>
        )}
        {coursesEmpty && (
          <div className="text-center py-5 text-zinc-400">Aucun cours trouvé</div>
        )}
      </LgScreenContainer>
    </>
  )
}

export default HomePage
