export default function Services() {
  const services = [
    {
      category: "Haircuts & Styling",
      items: [
        { name: "Women's Haircut", price: "$45-65", description: "Includes consultation, shampoo, cut, and style" },
        { name: "Men's Haircut", price: "$30-45", description: "Includes consultation, shampoo, cut, and style" },
        { name: "Children's Haircut", price: "$25", description: "Ages 12 and under" },
        { name: "Blowout & Style", price: "$35", description: "Shampoo, blow dry, and style" },
        { name: "Special Occasion Style", price: "$65+", description: "Formal styling for special events" }
      ]
    },
    {
      category: "Color Services",
      items: [
        { name: "Single Process Color", price: "$85+", description: "All-over color application" },
        { name: "Highlights/Lowlights", price: "$95+", description: "Partial or full foil highlights" },
        { name: "Balayage", price: "$150+", description: "Hand-painted highlights for a natural look" },
        { name: "Color Correction", price: "Consultation Required", description: "Corrective color services" },
        { name: "Root Touch-up", price: "$65+", description: "Color application at the roots" }
      ]
    },
    {
      category: "Treatments",
      items: [
        { name: "Deep Conditioning", price: "$35", description: "Intensive moisture treatment" },
        { name: "Keratin Treatment", price: "$250+", description: "Long-lasting smoothing treatment" },
        { name: "Scalp Treatment", price: "$45", description: "Therapeutic scalp care" },
        { name: "Hair Mask", price: "$25", description: "Restorative hair mask treatment" }
      ]
    }
  ]

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Our Services</h1>
          <p className="text-gray-600 text-lg">
            Discover our comprehensive range of hair care services
          </p>
        </div>

        <div className="space-y-12">
          {services.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary text-white px-6 py-4">
                <h2 className="text-2xl font-semibold">{category.category}</h2>
              </div>
              <div className="p-6">
                <div className="grid gap-6">
                  {category.items.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                        <span className="text-accent font-semibold">{service.price}</span>
                      </div>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            * Prices may vary based on hair length, thickness, and service complexity.
            Please consult with our stylists for accurate pricing.
          </p>
          <a
            href="/book"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Book Your Appointment
          </a>
        </div>
      </div>
    </div>
  )
} 