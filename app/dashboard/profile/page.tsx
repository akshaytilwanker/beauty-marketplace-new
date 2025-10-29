'use client';

// This component renders the user's profile page, displaying personal information and account statistics.

export default function ProfilePage() {
  const user = {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    joined: 'October 2024',
    bookings: 12,
    favorites: 5
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark-text">
          My Profile
        </h1>
        <p className="text-dark-grey font-body mt-1">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  defaultValue={user.name}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  defaultValue={user.email}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  defaultValue={user.phone}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Member Since
                </label>
                <input 
                  type="text" 
                  defaultValue={user.joined}
                  disabled
                  className="w-full px-4 py-2 border border-light-grey rounded-lg bg-light-grey text-dark-grey"
                />
              </div>
            </div>
            
            <button className="mt-6 bg-rose-500 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="font-heading font-bold text-dark-text">{user.name}</h3>
            <p className="text-dark-grey font-body text-sm">{user.email}</p>
          </div>

          <div className="bg-gradient-to-r from-rose-500 to-purple-500 rounded-xl p-6 text-white text-center">
            <h3 className="font-heading font-bold text-lg mb-4">Account Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Bookings</span>
                <span className="font-bold">{user.bookings}</span>
              </div>
              <div className="flex justify-between">
                <span>Favorites</span>
                <span className="font-bold">{user.favorites}</span>
              </div>
              <div className="flex justify-between">
                <span>Member Since</span>
                <span className="font-bold">{user.joined}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}