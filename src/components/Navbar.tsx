import React, { useState, useEffect, useRef } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        window.innerWidth < 768 // Only on mobile
      ) {
        setCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  };

  return (
    <header className="bg-[#001529] sticky top-0 z-50">
      <div
        className="flex justify-between items-center px-4 py-3 md:px-8"
        ref={navRef}
      >
        {/* Logo */}
        <h1 className="text-white text-xl font-bold">
          {" "}
          <Link to="/"> ProductHub</Link>{" "}
        </h1>

        {/* Toggle Button */}
        <button
          className="text-white md:hidden text-2xl"
          onClick={toggleCollapse}
        >
          {collapsed ? <MenuOutlined /> : <CloseOutlined />}
        </button>

        {/* Menu */}
        <nav
          className={`${
            collapsed ? "hidden" : "flex"
          } absolute top-[64px] left-0 w-full bg-[#001529] flex-col items-center py-4 gap-4 md:static md:flex md:flex-row md:w-auto md:gap-6 md:py-0`}
        >
          <Link
            to="/"
            onClick={handleLinkClick}
            className="text-white hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={handleLinkClick}
            className="text-white hover:text-gray-300"
          >
            Products
          </Link>
          <Link
            to="/edit-product"
            onClick={handleLinkClick}
            className="text-white hover:text-gray-300"
          >
            About us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
