import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ProfileProvider } from './contexts/ProfileContext.jsx'
import { CourseProvider } from './contexts/CourseContext.jsx'
import { TransactionProvider } from './contexts/TransactionContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <CourseProvider>
          <TransactionProvider>
            <App />
          </TransactionProvider>
        </CourseProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>,
)
