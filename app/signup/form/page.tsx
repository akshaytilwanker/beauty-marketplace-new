'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'provider' | null>(null)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      alert('Registration successful! Please check your email for verification.')
      router.push('/')

    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = (newRole: 'customer' | 'provider') => {
    setFormData(prev => ({ ...prev, role: newRole }))
  }

  // Role Selection Screen
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join Beauty Marketplace
            </h1>
            <p className="text-gray-600">
              Choose how you'd like to experience beauty
            </p>
          </div>

          <div className="space-y-4">
            {/* Customer Card */}
            <div
              onClick={() => setSelectedRole('customer')}
              className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <span className="text-2xl">💅</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Customer</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Book beauty services and discover amazing professionals
                  </p>
                </div>
              </div>
            </div>

            {/* Provider Card */}
            <div
              onClick={() => setSelectedRole('provider')}
              className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                  <span className="text-2xl">💼</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Service Provider</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Grow your beauty business and connect with clients
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Registration Form Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <button
            onClick={() => setSelectedRole(null)}
            className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 mb-4"
          >
            ← Back to role selection
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
            {formData.role === 'provider' ? '💼 Service Provider' : '💅 Customer'}
          </div>
          <p className="text-gray-600 mt-2">
            {formData.role === 'provider' 
              ? 'Start your beauty business journey' 
              : 'Join our beauty community'
            }
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => handleRoleChange('customer')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              formData.role === 'customer'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            💅 Customer
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('provider')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              formData.role === 'provider'
                ? 'bg-white text-pink-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            💼 Provider
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              required
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="+91 1234567890"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Create a strong password"
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}