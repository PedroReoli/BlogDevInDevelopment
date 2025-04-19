import { Outlet } from "react-router-dom"
import Header from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import FloatingThemeToggle from "@/components/theme/floating-theme-toggle"

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingThemeToggle />
    </div>
  )
}

export default Layout
