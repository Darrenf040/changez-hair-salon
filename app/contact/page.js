"use client"

import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import emailjs from "@emailjs/browser"
import { useState } from 'react'

export default function Contact() {
  const [isLoading, setIsloading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsloading(true)
    try{
      emailjs.sendForm(process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID, e.target, {
        publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
      }).then(res => {
        setIsloading(false)
        alert('Thank you for your message. We will get back to you soon!')    
      }).catch(err => {
        if(err){
          setIsloading(false)
          alert('Error sending email')
          return
        }
      })
    } catch(err){
      if(err){
        setIsloading(false)
        alert('An unexcepceted error occured please try again')
        return
      }
    }
  }


  const contactInfo = [
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: "Phone",
      info: "(832) 731-8833",
      link: "tel:+8327318833"
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Email",
      info: "mamjane69@yahoo.com",
      link: "mailto:mamjane69@yahoo.com"
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: "Location",
      info: "38 Wilson Rd suite a, Humble, TX 77338",
      link: "https://maps.app.goo.gl/UUd9kETeHVoLPDsp9"
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Hours",
      info: "Tue-Fri: 8 AM-6 PM, Sat: 7 AM-4 PM",
      link: null
    }
  ]

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Get in touch with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-primary mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-600 hover:text-accent transition-colors"
                        >
                          {item.info}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.info}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8" id='contact-form'>
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  {isLoading ? "Sending...": "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 