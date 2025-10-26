// src/pages/index.tsx - Beauty Marketplace Landing
import { NextPage } from 'next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-50 to-rose-50 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Beauty <span className="text-pink-500">Perfected</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Book appointments with trusted beauty professionals. Salons, spas, and parlors at your fingertips.
            </p>
            <div className="space-x-4">
              <button className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition duration-300">
                Book Now
              </button>
              <button className="border border-pink-500 text-pink-500 px-8 py-3 rounded-lg hover:bg-pink-50 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose BeautyApp?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Easy Booking", desc: "Book appointments in just a few clicks" },
                { title: "Trusted Professionals", desc: "Verified providers with ratings" },
                { title: "Secure Payments", desc: "Safe and secure payment processing" }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition duration-300">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-pink-500 font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default Home
