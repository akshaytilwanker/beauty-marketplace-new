// src/pages/dashboard/user/index.tsx
import { NextPage } from 'next'
import { useState } from 'react'
import UserSidebar from '../../../components/UserSidebar'
import UserHeader from '../../../components/UserHeader'

const UserDashboard: NextPage = () => {
  const [activeTab, setActiveTab] = useState('profile')

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />
      case 'bookings':
        return <MyBookings />
      case 'favorites':
        return <MyFavorites />
      default:
        return <UserProfile />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      
      <div className="flex">
        <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[80vh]">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

// Component implementations
function UserProfile() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
      <div className="max-w-2xl">
        <p className="text-gray-600">User profile form will go here...</p>
      </div>
    </div>
  )
}

function MyBookings() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
      <div className="space-y-4">
        <p className="text-gray-600">Your bookings will appear here...</p>
      </div>
    </div>
  )
}

function MyFavorites() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Favorites</h2>
      <div className="space-y-4">
        <p className="text-gray-600">Your favorite providers will appear here...</p>
      </div>
    </div>
  )
}

export default UserDashboard