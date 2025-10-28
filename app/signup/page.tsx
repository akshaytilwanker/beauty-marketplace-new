'use client'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Join Beauty Marketplace
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Choose your account type
        </p>
        
        <div className="space-y-4">
          <div 
            onClick={() => router.push('/signup/form?role=customer')}
            className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all text-center"
          >
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer</h3>
            <p className="text-gray-600">Book beauty services</p>
          </div>

          <div 
            onClick={() => router.push('/signup/form?role=provider')}
            className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-purple-500 hover:shadow-md transition-all text-center"
          >
            <div className="text-4xl mb-3">💼</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Provider</h3>
            <p className="text-gray-600">Offer beauty services</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}