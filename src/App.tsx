import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/contexts/theme-context"
import { CustomAuthProvider } from "@/contexts/custom-auth-context"
import { AuthProvider } from "@/contexts/auth-context"

import Home from "@/pages/Home"
import Blog from "@/pages/Blog"
import Post from "@/pages/post"
import About from "@/pages/About"
import NotFound from "@/pages/not-found"
import CustomAdminLogin from "@/pages/admin/custom-login"
import AdminDashboard from "@/pages/admin/dashboard"
import CustomProtectedRoute from "@/components/auth/custom-protected-route"
import EditPost from "@/pages/admin/edit-post"
import Layout from "./components/layout/Layout"

const App = () => {
  return (
    <ThemeProvider>
      <CustomAuthProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<Post />} />
              <Route path="sobre" element={<About />} />
              <Route path="admin" element={<CustomAdminLogin />} />
              <Route
                path="admin/dashboard"
                element={
                  <CustomProtectedRoute>
                    <AdminDashboard />
                  </CustomProtectedRoute>
                }
              />
              <Route
                path="admin/edit-post/:id"
                element={
                  <CustomProtectedRoute>
                    <EditPost />
                  </CustomProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster position="top-right" />
        </AuthProvider>
      </CustomAuthProvider>
    </ThemeProvider>
  )
}

export default App
