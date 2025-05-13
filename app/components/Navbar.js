'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { FiMenu, FiX, FiUser } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import clsx from "clsx"
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const path = usePathname()
  const { user, signOut } = useAuth()
  const profileRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsProfileOpen(false)
      setIsOpen(false)
    } catch (error) {
      console.error('Error signing out')
    }
  }

  const getUserInitial = () => {
    if (!user) return null
    const name = user.user_metadata?.full_name || user.email
    return name.charAt(0).toUpperCase()
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/check-appointment', label: 'Check Appointment' },
  ]

  return (
    <nav className="bg-white shadow-md fixed z-50 right-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Changez Salon
            </Link>
          </div>

          {/* Center nav links (desktop only) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "hover:text-accent transition-colors",
                  path === link.href ? "text-accent font-semibold" : "text-gray-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Book Appointment + Profile */}
          <div className="flex items-center gap-4">
            {/* Book Appointment (desktop only) */}
            <Link
              href="/book"
              className={clsx(
                "hidden md:block bg-primary px-4 py-1.5 rounded-lg hover:bg-opacity-90 transition-colors",
                path === '/book' ? "text-accent text-semibold" : "text-white"
              )}
            >
              Book Appointment
            </Link>

            {/* Profile Icon */}
            <div className="relative p-1" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-accent transition-colors"
              >
               {user ? (
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                    {getUserInitial()}
                  </div>
                ) : (
                  <FiUser className="w-5 h-5" />
                )}
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md py-1 z-50">
                  {user ? (
                    <div className="bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                      <Link
                        href="/appointments"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Appointments
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Hamburger Menu (mobile only) */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-primary"
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "block px-3 py-2 hover:text-accent transition-colors",
                    path === link.href ? "text-accent font-semibold" : "text-gray-600"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Book Appointment (mobile only - only show in hamburger menu) */}
              <Link
                href="/book"
                className={clsx(
                  "block md:hidden px-3 py-2 bg-primary rounded-lg hover:bg-opacity-90 transition-colors mt-2",
                  path === '/book' ? "text-accent text-semibold" : "text-white"
                )}
                onClick={() => setIsOpen(false)}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )

}