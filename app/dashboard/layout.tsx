'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Overview', href: '/dashboard', icon: '📊' },
    { name: 'My Bookings', href: '/dashboard/bookings', icon: '📅' },
    { name: 'Favorites', href: '/dashboard/favorites', icon: '❤️' },
    { name: 'Profile', href: '/dashboard/profile', icon: '👤' },
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
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-dark-text font-body">Welcome, User!</span>
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
              Dashboard
            </h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-body transition-colors ${
                    pathname === item.href
                      ? 'bg-rose-50 text-rose-500 border border-rose-200'
                      : 'text-dark-grey hover:text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
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