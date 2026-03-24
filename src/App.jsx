import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import CourseHome from './pages/CourseHome.jsx'
import CourseLogin from './pages/CourseLogin.jsx'
import CourseDashboard from './pages/CourseDashboard.jsx'
import CourseViewer from './pages/CourseViewer.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<CourseHome />} />
        <Route path="/login" element={<CourseLogin />} />
        <Route path="/dashboard" element={<CourseDashboard />} />
        <Route path="/lesson/:id" element={<CourseViewer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
