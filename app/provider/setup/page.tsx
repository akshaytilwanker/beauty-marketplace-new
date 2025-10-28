'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProviderSetup() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    description: '',
    address: '',
    services: [] as string[]
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const businessTypes = ['Salon', 'Spa', 'Makeup Studio', 'Nail Studio', 'Barber Shop', 'Wellness Center']
  const serviceOptions = ['Hair', 'Skincare', 'Makeup', 'Nails', 'Massage', 'Waxing', 'Threading']

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate setup process
    setTimeout(() => {
      alert('Business profile setup complete! You can now add your services.')
      router.push('/provider/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Setup Your Business Profile</h1>
          <p className="text-gray-600">Complete your profile to start accepting bookings</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
              <input
                type="text" required
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your business name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
              <select
                required
                value={formData.businessType}
                onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select business type</option>
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered *</label>
              <div className="grid grid-cols-2 gap-3">
                {serviceOptions.map(service => (
                  <label key={service} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your business and services..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your business address"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !formData.businessName || !formData.businessType || formData.services.length === 0}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Setting Up...' : 'Complete Setup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}