import type React from "react"
import { Link } from "react-router-dom"
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  LinkedinOutlined,
  SendOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined
} from "@ant-design/icons"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0f172a] to-[#020617] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">ProductHub</h2>
            <p className="text-slate-300 mb-6">
              Your trusted platform for quality products. Bringing you the best deals and product information.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FacebookOutlined />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <TwitterOutlined />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <InstagramOutlined />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinOutlined />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400 border-b border-slate-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Products
                </Link>
              </li>
              <li>
                <Link to="/aboutUs" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400 border-b border-slate-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <EnvironmentOutlined className="text-blue-400 mt-1 mr-3" />
                <span className="text-slate-300">123 Product Street, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center">
                <PhoneOutlined className="text-blue-400 mr-3" />
                <a href="tel:+11234567890" className="text-slate-300 hover:text-blue-400 transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <MailOutlined className="text-blue-400 mr-3" />
                <a href="mailto:info@producthub.com" className="text-slate-300 hover:text-blue-400 transition-colors">
                  info@producthub.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400 border-b border-slate-700 pb-2">Newsletter</h3>
            <p className="text-slate-300 mb-4">Subscribe to get updates on new products and special offers.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                aria-label="Email for newsletter"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md text-white transition-colors flex items-center"
                aria-label="Subscribe"
              >
                <SendOutlined />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ProductHub. All rights reserved.</p>
          <p className="mt-2">
            Designed with <span className="text-red-500">♥</span> for a better shopping experience
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
