'use client'
import { FiInstagram, FiFacebook } from 'react-icons/fi'
import Image from 'next/image'

export default function TeamCard({ member }) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-[400px]">
        <Image
          src={member.image}
          alt={`${member.name} - ${member.role}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          priority
        />
      </div>
      <div className="p-6 flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
          <p className="text-primary font-medium mb-4">{member.role}</p>
          <p className="text-gray-600 mb-4">{member.description}</p>
          <div className="space-y-2">
            <p className="font-medium text-gray-900">Specialties:</p>
            <div className="flex flex-wrap gap-2">
              {member.specialties.map((specialty, i) => (
                <span 
                  key={i} 
                  className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-100">
          <a
            href={member.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            <FiInstagram className="w-5 h-5" />
          </a>
          <a
            href={member.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            <FiFacebook className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}