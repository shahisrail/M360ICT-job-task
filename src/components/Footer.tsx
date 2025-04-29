import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#001529] text-white py-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">ProductHub</h2>
          <p className="text-sm text-gray-400">
            Your trusted platform for quality products. Bringing you the best deals and product info.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline text-gray-300">Home</Link></li>
            <li><Link to="/products" className="hover:underline text-gray-300">Products</Link></li>
            <li><Link to="/aboutUs" className="hover:underline text-gray-300">About Us</Link></li>
          </ul>
        </div>

        {/* Contact or Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
          <p className="text-sm text-gray-400 mb-2">Get updates about new products and offers.</p>
          <input
            type="email"
            placeholder="Your email"
            className="px-3 py-2 w-full rounded text-black mb-2"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-semibold">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} ProductHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
