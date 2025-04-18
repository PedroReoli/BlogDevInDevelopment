import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import Courses from "./pages/Courses"
import CourseDetail from "./pages/CourseDetail"
import CourseLesson from "./pages/CourseLesson"
import About from "./pages/About"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import SearchResults from "./pages/SearchResults"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Profile from "./pages/Profile"
import RequireAuth from "./components/auth/RequireAuth"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="cursos" element={<Courses />} />
        <Route path="cursos/:slug" element={<CourseDetail />} />
        <Route path="cursos/:courseSlug/:lessonSlug" element={<CourseLesson />} />
        <Route path="sobre" element={<About />} />
        <Route path="busca" element={<SearchResults />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Register />} />
        <Route path="esqueci-senha" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route
          path="perfil"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="admin" element={<AdminLogin />} />
        <Route
          path="admin/dashboard"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
