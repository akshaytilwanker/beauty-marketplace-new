'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Overview', href: '/provider/dashboard', icon: '📊' },
    { name: 'Business Profile', href: '/provider/dashboard/profile', icon: '👤' },
    { name: 'Subscription', href: '/provider/dashboard/subscription', icon: '💳' },
    { name: 'Team Management', href: '/provider/dashboard/team', icon: '👥' },
    { name: 'Amenities', href: '/provider/dashboard/amenities', icon: '🏢' },
    { name: 'Social Media', href: '/provider/dashboard/social', icon: '📱' },
    { name: 'Services', href: '/provider/dashboard/services', icon: '💅' },
    { name: 'Earnings', href: '/provider/dashboard/earnings', icon: '💰' },
    { name: 'Calendar', href: '/provider/dashboard/calendar', icon: '📅' },
    { name: 'Reviews', href: '/provider/dashboard/reviews', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-heading font-bold text-rose-500">
                BeautyConnect
              </h1>
              <span className="ml-4 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-body font-medium">
                Provider Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-dark-text font-body">Welcome, Business Owner!</span>
              <button className="text-dark-text hover:text-rose-500 font-body">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
            <h2 className="text-lg font-heading font-semibold text-dark-text mb-6">
              Business Hub
            </h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-body transition-colors ${
                    pathname === item.href
                      ? 'bg-purple-50 text-purple-600 border border-purple-200'
                      : 'text-dark-grey hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Business Stats */}
            <div className="mt-8 pt-6 border-t border-light-grey">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-grey">This Month</span>
                  <span className="font-heading font-bold text-green-500">₹24,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-grey">Active Bookings</span>
                  <span className="font-heading font-bold text-dark-text">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-grey">Customer Rating</span>
                  <span className="font-heading font-bold text-yellow-500">4.8⭐</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-grey">Plan</span>
                  <span className="font-heading font-bold text-blue-500">Professional</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}