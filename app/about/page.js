import { FiAward, FiHeart, FiSmile } from 'react-icons/fi'
import Image from 'next/image'
import TeamCard from '../components/TeamCard'
import { team } from '../components/team'
import Link from 'next/link'

export default function About() {

  const values = [
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Passion",
      description: "We're passionate about creating beautiful, confidence-boosting styles for our clients."
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Excellence",
      description: "Our commitment to excellence shows in every service we provide."
    },
    {
      icon: <FiSmile className="w-8 h-8" />,
      title: "Client Satisfaction",
      description: "Your happiness and satisfaction are our top priorities."
    }
  ]

  return (
    <div>
      {/* Our Story Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8">Our Story</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg">
                Established in 2010, Changez Hair Salon has grown from a small local salon to
                one of the most trusted names in hair care. Our journey began with a simple
                mission: to provide exceptional hair services while making every client feel
                special and valued.
              </p>
              <p className="text-gray-600 text-lg">
                Today, we continue to uphold these values while embracing the latest trends
                and techniques in the industry. Our commitment to ongoing education and
                professional development ensures that we stay at the forefront of hair care
                innovation.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/salon-interior.jpg"
                alt="Our salon interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-primary mb-6 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Visit Our Salon Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Experience the exceptional service and expertise of our talented team. 
            We're ready to help you achieve your perfect look.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/book" 
              className="inline-block bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Book Appointment
            </Link>
            <Link 
              href="/contact" 
              className="inline-block bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 