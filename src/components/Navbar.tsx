"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { MenuOutlined, CloseOutlined, ShoppingOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"

const Navbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        window.innerWidth < 768 // Only on mobile
      ) {
        setCollapsed(true)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true)
    }
  }

  // Check if link is active
  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== "/" && location.pathname.startsWith(path))
  }

  return (
    <header 
      className={`bg-gradient-to-r from-[#0f172a] to-[#1e293b] sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8" ref={navRef}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <ShoppingOutlined className="text-2xl text-blue-400 group-hover:text-blue-300 transition-colors" />
          <h1 className="text-white text-xl font-bold group-hover:text-blue-300 transition-colors">
            ProductHub
          </h1>
        </Link>

        {/* Search - Desktop only */}
        <div className="hidden md:flex relative max-w-xs w-full mx-4">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <SearchOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Toggle Button */}
        <button 
          className="text-white md:hidden text-2xl p-2 hover:bg-slate-700/50 rounded-full transition-colors" 
          onClick={toggleCollapse}
          aria-label={collapsed ? "Open menu" : "Close menu"}
        >
          {collapsed ? <MenuOutlined /> : <CloseOutlined />}
        </button>

        {/* Menu */}
        <nav
          className={`${
            collapsed ? "hidden" : "flex"
          } absolute top-full left-0 w-full bg-[#1e293b] flex-col items-center py-4 gap-4 md:static md:flex md:flex-row md:w-auto md:gap-6 md:py-0 md:bg-transparent shadow-lg md:shadow-none`}
        >
          <Link 
            to="/" 
            onClick={handleLinkClick} 
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/") 
                ? "text-blue-400 font-medium" 
                : "text-white hover:text-blue-300 hover:bg-slate-800/50"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            onClick={handleLinkClick} 
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/products") 
                ? "text-blue-400 font-medium" 
                : "text-white hover:text-blue-300 hover:bg-slate-800/50"
            }`}
          >
            Products
          </Link>
          <Link 
            to="/aboutUs" 
            onClick={handleLinkClick} 
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/aboutUs") 
                ? "text-blue-400 font-medium" 
                : "text-white hover:text-blue-300 hover:bg-slate-800/50"
            }`}
          >
            About us
          </Link>
          
          {/* User icon - visible on desktop */}
          <Link 
            to="/account" 
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 text-white hover:bg-blue-600 transition-colors ml-2"
          >
            <UserOutlined />
          </Link>
        </nav>
      </div>
      
      {/* Mobile search - only visible when collapsed */}
      <div className={`px-4 pb-4 ${collapsed ? "hidden" : "block"} md:hidden`}>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <SearchOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
    </header>
  )
}

export default Navbar
