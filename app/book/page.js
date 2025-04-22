import Link from 'next/link'
import { FiPhone, FiMail } from 'react-icons/fi'

export default function Book() {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Book an Appointment</h1>
          <p className="text-xl text-gray-600">
            To schedule your appointment, please contact us directly through one of the following methods:
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-8">
            {/* Phone Booking */}
            <div className="text-center">
              <div className="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4">
                <FiPhone className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Book by Phone</h2>
              <p className="text-gray-600 mb-4">
                Call us directly to speak with our receptionist and schedule your appointment.
              </p>
              <a
                href="tel:+15551234567"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                (555) 123-4567
              </a>
            </div>

            {/* Email Booking */}
            <div className="text-center">
              <div className="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4">
                <FiMail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Book by Email</h2>
              <p className="text-gray-600 mb-4">
                Send us an email with your preferred date, time, and service.
              </p>
              <a
                href="mailto:info@eleganthair.com"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                info@eleganthair.com
              </a>
            </div>

            {/* Contact Form Link */}
            <div className="text-center pt-8 border-t">
              <p className="text-gray-600 mb-4">
                You can also reach out to us through our contact form:
              </p>
              <Link
                href="/contact"
                className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Go to Contact Form
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 