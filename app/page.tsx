import Link from 'next/link';

export default function Home() {
  const services = [
    {
      id: 1,
      name: "Hair Services",
      description: "Professional hair styling and treatments",
      icon: "💇‍♀️",
      color: "bg-rose-50 border-rose-200"
    },
    {
      id: 2,
      name: "Makeup",
      description: "Makeup artists for all occasions", 
      icon: "💄",
      color: "bg-purple-50 border-purple-200"
    },
    {
      id: 3, 
      name: "Nail Care",
      description: "Manicures, pedicures & nail art",
      icon: "💅",
      color: "bg-rose-50 border-rose-200"
    }
  ];

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-heading font-bold text-rose-500">
                BeautyConnect
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-dark-text hover:text-rose-500 font-body font-medium"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="bg-rose-500 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-500 to-purple-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-heading font-bold mb-6">
            Discover Your Beauty
          </h1>
          <p className="text-xl font-body mb-8 opacity-90">
            Book professional beauty services from trusted experts
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-2 flex">
              <input 
                type="text" 
                placeholder="Search for services, salons, or locations..."
                className="flex-1 px-4 py-3 text-dark-text font-body focus:outline-none rounded-l-lg"
              />
              <button className="bg-rose-500 text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Provider CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">
                Are you a beauty professional?
              </h2>
              <p className="text-white/90 font-body text-lg mb-6">
                Join thousands of providers growing their business with BeautyConnect
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/signup?role=provider"
                  className="bg-white text-rose-500 px-8 py-4 rounded-lg font-body font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  List Your Services ›
                </Link>
                <Link 
                  href="/provider-benefits"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-body font-medium hover:bg-white/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-dark-text mb-4">
              Popular Services
            </h2>
            <p className="text-dark-grey font-body text-lg">
              Choose from our wide range of professional beauty services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`${service.color} border-2 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-heading font-semibold text-dark-text mb-2">
                  {service.name}
                </h3>
                <p className="text-dark-grey font-body">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Database Status */}
      <section className="py-12 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white rounded-lg px-6 py-3 shadow-sm">
            <div className="w-3 h-3 bg-success rounded-full mr-3"></div>
            <span className="font-body text-dark-text font-medium">
              ✅ Supabase connected successfully!
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-light-grey py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-dark-grey font-body">
            © 2024 BeautyConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}