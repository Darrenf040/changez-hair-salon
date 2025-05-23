'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroCarousel() {
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    '/assets/hero-images/detangle-brush.jpg',
    '/assets/hero-images/hair-products.jpg',
    '/assets/hero-images/salon-chair.jpg',
    '/assets/hero-images/sink.jpg',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [images.length])

  return (
    <section className="relative h-[80vh] min-h-[600px] bg-gray-900 overflow-hidden">
      {/* Image Carousel */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentImage === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={image}
            alt=""
            fill
            priority={index === 0}
            className="object-cover object-center w-full h-full"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4 z-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Transform Your Style
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-fade-in-delay">
          Experience the art of beauty at Changez Hair Salon, where every visit leaves you feeling renewed and confident.
        </p>
        <div className="space-x-4 animate-fade-in-delay-2">
          <Link
            href="/book"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Our Services
          </Link>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImage === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}