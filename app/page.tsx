import { supabase } from '@/lib/supabaseClient'

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Beauty Marketplace
        </h1>
        
        {/* Connection Status */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Database Status</h2>
          <p className={connectionStatus.includes('✅') ? 'text-green-500' : 'text-red-500'}>
            {connectionStatus}
          </p>
        </div>

        {/* Beauty Marketplace Content */}
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
  )
}