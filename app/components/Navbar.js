'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import clsx from "clsx"

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const path = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Changez Salon
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
            <Link
              href="/book"
              className={clsx(
                "bg-primary px-4 py-1.5 rounded-lg hover:bg-opacity-90 transition-colors",
                path === '/book' ? "text-accent text-semibold" : "text-white"
              )}
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
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
        <div className="md:hidden">
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
            <Link
              href="/book"
              className={clsx(
                "block px-3 py-2 bg-primary rounded-lg hover:bg-opacity-90 transition-colors mt-2",
                path === '/book' ? "text-accent text-semibold" : "text-white"
              )}
              onClick={() => setIsOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
} 