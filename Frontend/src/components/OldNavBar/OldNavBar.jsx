// src/components/OldNavbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OldNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Mobile breakpoint

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close the menu when switching to desktop view
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/service' },
    { name: 'Specialities', href: '/speciality' },
    { name: 'Procedures', href: '/procedure' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-blue-900 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-white text-2xl font-bold">MediQueue</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex md:items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:bg-blue-700 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className={`hidden md:flex md:items-center md:space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
            <Link
              to="/register"
              className="bg-white text-blue-900 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-blue-700 text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(prev => !prev)} // Toggle state correctly
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-gray-900 bg-opacity-80"
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white hover:bg-blue-700 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 space-y-2">
                <Link
                  to="/register"
                  className="bg-white text-blue-900 hover:bg-blue-100 block w-full text-center px-4 py-2 rounded-lg transition-colors duration-300"
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-700 text-white hover:bg-blue-600 block w-full text-center px-4 py-2 rounded-lg transition-colors duration-300"
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
