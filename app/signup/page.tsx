'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-100 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-dark-text mb-4">
            Join BeautyConnect
          </h1>
          <p className="text-xl text-dark-grey font-body">
            Choose how you want to experience beauty services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Card */}
          <div
            onClick={() => router.push('/signup/form?userType=customer')}
            className="bg-white rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-rose-200"
          >
            <div className="text-6xl mb-6 text-center">💁‍♀️</div>
            <h3 className="text-2xl font-heading font-bold text-dark-text mb-4 text-center">
              Join as Customer
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-dark-grey font-body">
                <span className="text-rose-500 mr-3">✓</span>
                Book beauty services instantly
              </li>
              <li className="flex items-center text-dark-grey font-body">
                <span className="text-rose-500 mr-3">✓</span>
                Read genuine reviews & ratings
              </li>
              <li className="flex items-center text-dark-grey font-body">
                <span className="text-rose-500 mr-3">✓</span>
                Secure payments & easy cancellations
              </li>
            </ul>
            <button className="w-full bg-rose-500 text-white py-4 rounded-lg font-body font-bold text-lg hover:bg-rose-600 transition-colors">
              Continue as Customer
            </button>
          </div>

          {/* Provider Card - EMPHASIZED */}
          <div
            onClick={() => router.push('/signup/form?userType=provider')}
            className="bg-gradient-to-br from-purple-500 to-rose-500 rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-300 relative"
          >
            {/* Popular Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-400 text-dark-text px-4 py-1 rounded-full text-sm font-body font-bold">
                🚀 MOST POPULAR
              </span>
            </div>
            
            <div className="text-6xl mb-6 text-center text-white">💄</div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4 text-center">
              Join as Provider
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-white/90 font-body">
                <span className="text-yellow-300 mr-3">⭐</span>
                Reach thousands of beauty seekers
              </li>
              <li className="flex items-center text-white/90 font-body">
                <span className="text-yellow-300 mr-3">💸</span>
                Grow your business & earnings
              </li>
              <li className="flex items-center text-white/90 font-body">
                <span className="text-yellow-300 mr-3">📱</span>
                Easy booking & payment management
              </li>
              <li className="flex items-center text-white/90 font-body">
                <span className="text-yellow-300 mr-3">🎯</span>
                Free listing for first month
              </li>
            </ul>
            <button className="w-full bg-white text-purple-600 py-4 rounded-lg font-body font-bold text-lg hover:bg-gray-100 transition-colors">
              Start Earning Today
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-dark-grey font-body">
            Already have an account?{' '}
            <Link href="/login" className="text-rose-500 hover:text-rose-600 font-bold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}