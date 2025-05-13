import React from 'react'
import Image from 'next/image'
import { FiFacebook, FiInstagram } from 'react-icons/fi'
import Link from 'next/link'

const CarlethaCard = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-center text-primary mb-12">Meet Your Stylist</h1>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-md mx-auto">
        <div className="relative h-[400px] w-full">
          <Image
            src="/assets/carletha.jpg"
            alt="Carletha Francis"
            style={{ objectFit: "cover" }}
            fill
            priority
            quality={90}
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">Carletha Francis</h2>
          <p className="text-gray-600 mb-4">Owner</p>
          <p className="text-gray-700 mb-4">
            With over 15 years of experience, Carletha leads our team with passion and creativity.
          </p>
          <div className="mb-6">
            <p className="font-medium text-primary mb-2">Specialties:</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Hair Styling</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Hair Extensions</span>
            </div>
          </div>
          <div className="flex space-x-6 mt-6">
            <Link href="https://www.instagram.com/changez1_" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Instagram</span>
              <FiInstagram className="hover:text-accent transition-colors" size={30} />
            </Link>
            <Link href="https://www.facebook.com/p/Changez-Hair-Salon-100063576639061/" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Facebook</span>
              <FiFacebook className="hover:text-accent transition-colors" size={30} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default CarlethaCard