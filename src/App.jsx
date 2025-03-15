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
import { connectSocket, disconnectSocket } from "./services/socketService.js"
import { useContext, useEffect } from "react"
import { ProfileContext } from "./contexts/ProfileContext.jsx"
import { AuthContext } from "./contexts/AuthContext.jsx"

function App() {
  const { profile } = useContext(ProfileContext)

  useEffect(() => {
    if (profile) {
      connectSocket(profile.id)
    }
    return () => {
      disconnectSocket()
    }
  }, [profile])

  return (
    <>
      <div className="text-zinc-900 prompt-light">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchPage />} />
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
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
