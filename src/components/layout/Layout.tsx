"use client"

import { Outlet } from "react-router-dom"
import Header from "./header"
import Footer from "./footer"

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a]">
      <Header />
      <main className="flex-grow container py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
