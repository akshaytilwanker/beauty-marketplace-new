import { supabase } from '@/lib/supabaseClient'

// Fetch services from our backend API
async function getServices() {
  try {
    const response = await fetch('http://localhost:5000/api/services', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    
    const data = await response.json();
    return data.services || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export default async function Home() {
  // Test Supabase connection
  let connectionStatus = 'Testing...'
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1)
    if (error) {
      connectionStatus = `❌ Error: ${error.message}`
    } else {
      connectionStatus = '✅ Supabase connected successfully!'
    }
  } catch (error) {
    connectionStatus = `❌ Connection failed: ${error}`
  }

  // Fetch real services from backend
  const services = await getServices();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Beauty Marketplace
        </h1>
        
        {/* Connection Status */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Database Status</h2>
          <p className={connectionStatus.includes('✅') ? 'text-green-500' : 'text-red-500'}>
            {connectionStatus}
          </p>
          <p className="text-blue-500 mt-2">
            Backend API: {services.length > 0 ? '✅ Connected' : '❌ Not connected'}
          </p>
        </div>

        {/* Real Services from Backend */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Available Services ({services.length})
          </h2>
          
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: any) => (
                <div key={service.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{service.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-pink-100 text-pink-800 px-2 py-1 rounded">
                      {service.category}
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      ₹{service.price}
                    </span>
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-500">
                    Duration: {service.duration} mins
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-yellow-800">
                No services found. Make sure your backend server is running on port 5000.
              </p>
            </div>
          )}
        </div>

        {/* Category Overview */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-2">💇 Hair Services</h3>
              <p className="text-gray-600">Professional hair styling and treatments</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-2">💄 Makeup</h3>
              <p className="text-gray-600">Makeup artists for all occasions</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-2">💅 Nail Care</h3>
              <p className="text-gray-600">Manicures, pedicures & nail art</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}