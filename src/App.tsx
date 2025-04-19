import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/contexts/theme-context"
import { AuthProvider } from "@/contexts/auth-context"

import Layout from "@/components/layout/layout"
import Home from "@/pages/home"
import Blog from "@/pages/blog"
import Post from "@/pages/post"
import About from "@/pages/about"
import NotFound from "@/pages/not-found"
import AdminLogin from "@/pages/admin/login"
import AdminDashboard from "@/pages/admin/dashboard"
import ProtectedRoute from "@/components/auth/protected-route"

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<Post />} />
            <Route path="sobre" element={<About />} />
            <Route path="admin" element={<AdminLogin />} />
            <Route
              path="admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
