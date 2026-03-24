import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CourseHome from './pages/CourseHome.jsx'
import CourseLogin from './pages/CourseLogin.jsx'
import CourseDashboard from './pages/CourseDashboard.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourseHome />} />
        <Route path="/login" element={<CourseLogin />} />
        <Route path="/dashboard" element={<CourseDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
