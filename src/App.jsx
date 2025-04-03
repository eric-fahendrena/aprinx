import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import HomePage from "./components/HomePage"
import VideoDetailPage from "./components/VideoDetailPage"
import VideoPublisherPage from "./components/VideoPublisherPage.jsx"
import ProfilePage from "./components/ProfilePage"
import LoginPage from "./components/LoginPage"
import CourseDetailPage from "./components/CourseDetailPage.jsx"
import SearchPage from "./components/SearchPage.jsx"
import CourseCreatorPage from "./components/CourseCreatorPage.jsx"
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import PhoneNumberEditorPage from "./components/PhoneNumberEditorPage.jsx"
import NotificationsPage from "./components/NotificationsPage.jsx"
import UsersListPage from "./components/UsersListPage.jsx"
import SubscriptionTransactionsPage from "./components/SubscriptionTransactionsPage.jsx"
import TermsAndConditionsPage from "./components/TermsAndConditionsPage.jsx"
import { connectSocket, disconnectSocket } from "./services/socketService.js"
import { useContext, useEffect } from "react"
import { ProfileContext } from "./contexts/ProfileContext.jsx"
import { PulseLoader } from "react-spinners"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/fr"

dayjs.extend(relativeTime)
dayjs.locale("fr")

function App() {
  const { isLoading, profile } = useContext(ProfileContext)

  useEffect(() => {
    if (profile) {
      connectSocket(profile.id)
    }
    return () => {
      disconnectSocket()
    }
  }, [profile])

  if (isLoading) {
    return (
      <div className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center bg-white">
        <div className="">
          <div className="text-[#800] text-5xl font-bold">Aprix</div>
          <div className="text-zinc-400 uppercase text-sm text-end">Madagascar</div>
          <div className="py-5 text-center">
            <PulseLoader size={8} speedMultiplier={0.5} color="#800" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {window.innerWidth > 560 && (
        <div 
          className="fixed bottom-[15%] start-[25%] end-[25%] w-[400px] text-xs rounded-3xl shadow-2xl p-5 text-white z-[9999]"
          style={{
            backgroundColor: "#0008"
          }}
          >
          <div>Les grands écrans n'est pas encore pris en charge, mais nous travaillons dessus et une mise à jour arrivera bientôt !</div>
        </div>
      )}
      <div className="text-zinc-900 prompt-light">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
            <Route path="/subscription-transactions" element={(
              <AuthenticatedRoute>
                <SubscriptionTransactionsPage />
              </AuthenticatedRoute>
            )} />
            <Route path="/courses/:cId" element={<CourseDetailPage />} />
            <Route path="/courses/create" element={(
              <AuthenticatedRoute>
                <CourseCreatorPage />
              </AuthenticatedRoute>
            )} />
            <Route path="/courses/create/:step" element={(
              <AuthenticatedRoute>
                <CourseCreatorPage />
              </AuthenticatedRoute>
            )} />
            <Route path="/courses/:cId/videos/:vId" element={(
              <AuthenticatedRoute>
                <VideoDetailPage />
              </AuthenticatedRoute>
            )} />
            <Route path="/courses/:cId/videos/add" element={(
              <AuthenticatedRoute>
                <VideoPublisherPage />
              </AuthenticatedRoute>
            )} />
            <Route path="/notifications" element={(
              <AuthenticatedRoute>
                <NotificationsPage />
              </AuthenticatedRoute>
            )} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit/phone" element={(
              <AuthenticatedRoute>
                <PhoneNumberEditorPage />
              </AuthenticatedRoute>
            )} />
            <Route path="/users" element={(
              <AuthenticatedRoute>
                <UsersListPage />
              </AuthenticatedRoute>
            )} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
