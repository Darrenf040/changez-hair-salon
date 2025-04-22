'use client'
import { FiStar, FiUser } from 'react-icons/fi'
import Image from 'next/image'

export default function TestimonialsSection() {
  const reviews = [
    {
      author: "Jennifer M.",
      avatar: "/review-avatar-1.jpg",
      rating: 5,
      date: "2 weeks ago",
      review: "Absolutely amazing experience! Olivia transformed my hair completely. The attention to detail and professional service is unmatched. Highly recommend!",
      service: "Haircut & Color"
    },
    {
      author: "Michael S.",
      avatar: "/review-avatar-2.jpg",
      rating: 5,
      date: "1 month ago",
      review: "Marcus is a color genius! He understood exactly what I wanted and delivered beyond my expectations. The salon atmosphere is so welcoming and professional.",
      service: "Balayage"
    },
    {
      author: "Sarah K.",
      avatar: "/review-avatar-3.jpg",
      rating: 5,
      date: "2 months ago",
      review: "Best salon experience ever! Sophia worked magic with my curly hair. For the first time, I have a stylist who truly understands curly hair care.",
      service: "Curly Hair Styling"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-16">What our clients Say</h2>        
        <div className="flex items-center justify-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="ml-2 text-lg font-semibold">5.0</span>
          <span className="ml-2 text-gray-600">(9 reviews)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
            <div className="flex items-center mb-4 gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex justify-center items-center bg-gray-50">
                  <FiUser />
                </div>
 
                <div>
                  <h3 className="font-semibold">{review.author}</h3>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3">{review.review}</p>
              
              <div className="flex items-center">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">
                  {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://g.co/kgs/M3BJWj7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-accent transition-colors"
          >
            <span className="mr-2">View all reviews on Google</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
} 