import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ProfileProvider } from './contexts/ProfileContext.jsx'
import { CourseProvider } from './contexts/CourseContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <CourseProvider>
          <App />
        </CourseProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>,
)
