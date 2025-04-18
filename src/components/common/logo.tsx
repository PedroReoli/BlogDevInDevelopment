"use client"

import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-xl font-bold">
        <span className="text-blue-500">DevEmDesenvolvimento</span>
      </span>
    </Link>
  )
}

export default Logo
