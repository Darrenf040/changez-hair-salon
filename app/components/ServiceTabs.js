'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FiScissors, FiLayers, FiPlusCircle, FiClock, FiChevronDown } from 'react-icons/fi'

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState('Styling')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const tabs = [
    { id: 'Styling', icon: <FiScissors className="w-5 h-5" /> },
    { id: 'Extensions', icon: <FiLayers className="w-5 h-5" /> },
    { id: 'AddOns', icon: <FiPlusCircle className="w-5 h-5" /> },
  ]
  const services = {
    Styling: [
      { title: "Shampoo and Style", duration: "60 min", price: "$75" },
      { title: "Relaxer and Style", duration: "90 min", price: "$125" },
      { title: "Rinse and Style", duration: "30 min", price: "$105" },
    ],
    Extensions: [
      { title: "Traditional Sew In (up to 3 bundles)", duration: "120 min", price: "$200" },
      { title: "Micro-links", duration: "30 min", price: "Consultation Required" },
      { title: "Sew-in with Closure", duration: "90 min", price: "$230" },
    ],
    AddOns: [
      { title: "Permanent Color", duration: "30 min", price: "Consultation Required" },
      { title: "Trim", duration: "30 min", price: "$25" },
      { title: "Cut", duration: "30 min", price: "$35" },
    ],
  }
    const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setIsDropdownOpen(false)
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to Changez Salon</h1>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Where artistry meets expertise. Our team of passionate stylists is dedicated to helping
          you look and feel your best with personalized hair services tailored to your unique style.
        </p>

        {/* Desktop Tabs */}
        <div className="hidden md:flex justify-center space-x-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.icon}
              <span>{tab.id}</span>
            </button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden mb-8">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-2">
              {tabs.find(tab => tab.id === activeTab)?.icon}
              <span>{activeTab}</span>
            </div>
            <FiChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-[calc(100%-2rem)] bg-white border border-gray-200 rounded-lg shadow-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center space-x-2 px-6 py-3 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.id}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          { services && services[activeTab].map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center text-gray-500 mb-4">
                <FiClock className="w-4 h-4 mr-2" />
                <span>{service.duration}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{service.price}</span>
                <Link
                  href="/book"
                  className="bg-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  )
} 