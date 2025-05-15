import Link from 'next/link'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Contact Info */}
          <div className='w-max order-3'>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FiPhone className="mr-2" />
                <span>(832) 731-8833</span>
              </div>
              <div className="flex items-center">
                <FiMail className="mr-2" />
                <span>mamjane69@yahoo.com</span>
              </div>
              <div className="flex items-center">
                <FiMapPin className="mr-2" />
                <span>38 Wilson Rd suite a, Humble, TX 77338</span>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-600">
                <div className="flex gap-6 items-center">
                  <a 
                    href='https://www.instagram.com/changez1_/' 
                    className="text-white hover:text-accent transition-colors duration-300"
                  >
                    <FiInstagram className="w-6 h-6" />
                  </a>
                  <a 
                    href='https://www.facebook.com/p/Changez-Hair-Salon-100063576639061/' 
                    className="text-white hover:text-accent transition-colors duration-300"
                  >
                    <FiFacebook className="w-6 h-6" />
                  </a>
                  <a 
                    href='https://g.co/kgs/9ZGXiab' 
                    className="text-white hover:text-accent transition-colors duration-300"
                  >
                    <AiFillGoogleCircle className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className='w-max'>
            <h3 className="text-xl font-semibold mb-4">Hours</h3>
            <div className="space-y-2">
              <p>Sunday: Closed</p>
              <p>Monday: Closed</p>
              <p>Tuesday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 7:00 AM - 4:00 PM</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className='w-max'>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/book" className="hover:text-accent transition-colors">Book Appointment</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600 text-center">
          <p>&copy; {new Date().getFullYear()} Changez Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 