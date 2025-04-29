import React, { useState } from 'react';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <header className="bg-[#001529] sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        {/* Logo */}
        <h1 className="text-white text-xl font-bold">ProductHub</h1>

        {/* Toggle Button (visible on small screens) */}
        <button
          className="text-white md:hidden text-2xl"
          onClick={toggleCollapse}
        >
          {collapsed ? <MenuOutlined /> : <CloseOutlined />}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            collapsed ? 'hidden' : 'flex'
          } absolute top-[64px] left-0 w-full bg-[#001529] flex-col items-center py-4 gap-4 md:static md:flex md:flex-row md:w-auto md:gap-6 md:py-0`}
        >
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/products" className="text-white hover:text-gray-300">
            Products
          </Link>
          <Link to="/edit-product" className="text-white hover:text-gray-300">
            Edit Product
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
