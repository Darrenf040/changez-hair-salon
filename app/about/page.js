import Image from "next/image"
import CarlethaCard from "../components/ui/CarlethaCard"

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-black bg-[url(/assets/backgrounds/our-story.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4 drop-shadow-lg mb-12">Our Story</h1>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">A Legacy of Excellence</h2>
            <p className="text-gray-700 mb-4">
              Established in 2010, Changez Hair Salon has grown from a small local salon to one of the most trusted
              names in hair care. Our journey began with a simple mission: to provide exceptional hair services while
              making every client feel special and valued.
            </p>
            <p className="text-gray-700">
              Today, we continue to uphold these values while embracing the latest trends and techniques in the
              industry. Our commitment to ongoing education and professional development ensures that we stay at the
              forefront of hair care innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Journey</h2>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center border-b border-primary/30 md:border-none py-12 md:py-6">
              <div className="md:w-1/3 text-center md:text-right md:pr-8">
                <h3 className="text-xl font-bold text-accent">2010</h3>
                <p className="text-gray-600">Where it all began</p>
              </div>
              <div className="hidden md:block w-px h-full bg-accent mx-4 relative">
                <div className="absolute w-4 h-4 rounded-full bg-accent -left-1.5"></div>
              </div>
              <div className="md:w-2/3 mt-4 md:mt-0">
                <h4 className="text-lg font-semibold text-primary mb-2 md:text-left text-center">Grand Opening</h4>
                <p className="text-gray-700 text-center md:text-left">
                  Changez Salon opened its doors with just three styling stations and a dream to transform the local
                  hair care scene.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center border-b border-primary/30 md:border-none py-12 md:py-6">
              <div className="md:w-1/3 text-center md:text-right md:pr-8">
                <h3 className="text-xl font-bold text-accent">2015</h3>
                <p className="text-gray-600">Growth & Recognition</p>
              </div>
              <div className="hidden md:block w-px h-full bg-accent mx-4 relative">
                <div className="absolute w-4 h-4 rounded-full bg-accent -left-1.5"></div>
              </div>
              <div className="md:w-2/3 mt-4 md:mt-0">
                <h4 className="text-lg font-semibold text-primary mb-2 md:text-left text-center">Expansion</h4>
                <p className="text-gray-700 text-center md:text-left">
                  After five successful years, we expanded our salon to include more styling stations and introduced new
                  premium services.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center border-b border-primary/30 md:border-none py-12 md:py-6">
              <div className="md:w-1/3 text-center md:text-right md:pr-8">
                <h3 className="text-xl font-bold text-accent">Today</h3>
                <p className="text-gray-600">Looking Forward</p>
              </div>
              <div className="hidden md:block w-px h-full bg-accent mx-4 relative">
                <div className="absolute w-4 h-4 rounded-full bg-accent -left-1.5"></div>
              </div>
              <div className="md:w-2/3 mt-4 md:mt-0">
                <h4 className="text-lg font-semibold text-primary mb-2 md:text-left text-center">Continuing Our Mission</h4>
                <p className="text-gray-700 text-center md:text-left">
                  Today, Changez Salon continues to grow while maintaining our commitment to exceptional service and
                  client satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Passion</h3>
              <p className="text-gray-700">
                We are passionate about hair and dedicated to helping our clients look and feel their best. Our love for
                the craft drives us to deliver exceptional results.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Excellence</h3>
              <p className="text-gray-700">
                We strive for excellence in everything we do, from the products we use to the techniques we employ. Our
                commitment to quality is unwavering.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" x2="9.01" y1="9" y2="9" />
                  <line x1="15" x2="15.01" y1="9" y2="9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Client Satisfaction</h3>
              <p className="text-gray-700">
                Your satisfaction is our top priority. We listen carefully to your needs and preferences to ensure you
                leave our salon feeling confident and happy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <CarlethaCard />
        </div>
      </div>

      
      {/* Call to Action */}
      <div className="bg-white text-black py-16 container mx-auto px-4 max-w-4xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Experience the Changez Difference</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Join our family of satisfied clients and discover why Changez Salon is the preferred choice for hair care in
            the area.
          </p>
          <a
            href="/book-appointment"
            className="inline-block bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition duration-300"
          >
            Book Your Appointment Today
          </a>
        </div>
      </div>
    </div>
  )
}