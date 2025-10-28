'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Mock user data - in real app, get from auth context
    setUser({ name: 'Test Customer', email: 'customer@test.com', role: 'customer' })
    
    // Fetch user bookings
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      // For now, use mock data - replace with actual API call later
      const mockBookings = [
        { id: 1, service: 'Haircut & Styling', date: '2025-10-29', status: 'confirmed', price: 500 },
        { id: 2, service: 'Facial Treatment', date: '2025-11-05', status: 'pending', price: 1200 }
      ]
      setBookings(mockBookings)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Customer Dashboard</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">2</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">₹1,700</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900">Favorite Services</h3>
            <p className="text-2xl font-bold text-purple-600 mt-2">3</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.service}</h3>
                      <p className="text-gray-600 text-sm">Date: {booking.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{booking.price}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No bookings yet</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-4">
          <button 
            onClick={() => router.push('/')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Book New Service
          </button>
          <button 
            onClick={() => router.push('/profile')}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  )
}