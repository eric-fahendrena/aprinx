import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ProfileProvider } from './contexts/ProfileContext.jsx'
import { CourseProvider } from './contexts/CourseContext.jsx'
import { TransactionProvider } from './contexts/TransactionContext.jsx'
import { CommentProvider } from './contexts/CommentContext.jsx'
import { NotificationProvider } from "./contexts/NotificationContext.jsx"
import { CourseAccessProvider } from './contexts/CourseAccessContext.jsx'
import { DeletedCourseProvider } from './contexts/DeletedCourseContext.jsx'
import { SubscriptionProvider } from './contexts/SubscriptionContext.jsx'
import { CreatedCourseProvider } from './contexts/CreatedCourseContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ProfileProvider>
          <CourseProvider>
            <TransactionProvider>
              <CommentProvider>
                <NotificationProvider>
                  <CourseAccessProvider>
                    <DeletedCourseProvider>
                      <SubscriptionProvider>
                        <CreatedCourseProvider>
                          <App />
                        </CreatedCourseProvider>
                      </SubscriptionProvider>
                    </DeletedCourseProvider>
                  </CourseAccessProvider>
                </NotificationProvider>
              </CommentProvider>
            </TransactionProvider>
          </CourseProvider>
        </ProfileProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
