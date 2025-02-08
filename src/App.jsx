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
import BuyVideoPage from "./components/BuyVideoPage"
import PendingPaymentPage from "./components/PendingPaymentPage.jsx"
import BuyersPaymentsPage from "./components/BuyersPaymentsPage.jsx"
import VerifyTransactionPage from "./components/VerifyTransactionPage.jsx"
import CourseDetailPage from "./components/CourseDetailPage.jsx"
import SearchPage from "./components/SearchPage.jsx"
import CourseCreatorPage from "./components/CourseCreatorPage.jsx"

function App() {
  return (
    <>
      <div className="text-zinc-900">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/courses/create" element={<CourseCreatorPage />} />
            <Route path="/courses/create/:step" element={<CourseCreatorPage />} />
            <Route path="/videos/:vId" element={<VideoDetailPage />} />
            <Route path="/videos/:vId/buy" element={<BuyVideoPage />} />
            <Route path="/videos/create" element={<VideoPublisherPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/videos/:vId/payment" element={<PendingPaymentPage />} />
            <Route path="/payments" element={<BuyersPaymentsPage />} />
            <Route path="/transactions/verify" element={<VerifyTransactionPage />} />
            <Route path="/courses/:cId" element={<CourseDetailPage />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
