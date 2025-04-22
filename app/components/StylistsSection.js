'use client'
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi'
import Image from 'next/image'
import { team } from './team'
import TeamCard from './TeamCard'

export default function StylistsSection() {

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">Our Stylists</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
           <TeamCard key={index} member={member}  />
          ))}
        </div>
      </div>
    </section>
  )
} 