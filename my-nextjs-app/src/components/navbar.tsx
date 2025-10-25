// src/components/Navbar.tsx
import { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src="/logo.png" alt="Beauty Marketplace" className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold text-pink-500">BeautyApp</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/"><span className="text-gray-700 hover:text-pink-500 cursor-pointer">Home</span></Link>
            <Link href="/dashboard/user"><span className="text-gray-700 hover:text-pink-500 cursor-pointer">Dashboard</span></Link>
            <Link href="/login"><span className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 cursor-pointer">Login</span></Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/"><span className="block text-gray-700 hover:text-pink-500 cursor-pointer">Home</span></Link>
              <Link href="/dashboard/user"><span className="block text-gray-700 hover:text-pink-500 cursor-pointer">Dashboard</span></Link>
              <Link href="/login"><span className="block bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 cursor-pointer">Login</span></Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar