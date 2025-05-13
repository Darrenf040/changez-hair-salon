'use client'
import { FiInstagram } from 'react-icons/fi'
import Image from 'next/image'

export default function InstagramFeed() {
  const instagramPosts = [
    {
      image: "/assets/posts/post1.jpg",
      link: "#",
      alt: "Precision haircut in progress"
    },
    {
      image: "/assets/posts/post2.jpg",
      link: "#",
      alt: "Professional hair styling tools"
    },
 
 
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FiInstagram className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Follow Our Journey</h2>
          </div>
          <p className="text-gray-600">
            Get inspired by our latest styles and transformations on Instagram.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">          
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href={"https://www.instagram.com/changez1_/"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <FiInstagram className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/changez1_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <FiInstagram className="w-5 h-5" />
            <span>Follow us @ChangezSalon</span>
          </a>
        </div>
      </div>
    </section>
  )
} 