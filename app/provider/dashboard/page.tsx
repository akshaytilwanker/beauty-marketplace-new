'use client';

export default function ProviderDashboardPage() {
  const stats = [
    { label: 'Total Earnings', value: '₹1,24,500', icon: '💰', change: '+12%' },
    { label: 'Active Bookings', value: '8', icon: '📅', change: '+2' },
    { label: 'Services', value: '6', icon: '💅', change: '+1' },
    { label: 'Customer Rating', value: '4.8/5', icon: '⭐', change: '+0.2' },
  ];

  const recentBookings = [
    {
      id: 'BKG024',
      customer: 'Priya Sharma',
      service: 'Haircut & Styling',
      date: 'Today, 3:00 PM',
      amount: '₹500',
      status: 'confirmed'
    },
    {
      id: 'BKG023',
      customer: 'Rahul Verma',
      service: 'Beard Trim',
      date: 'Tomorrow, 11:00 AM',
      amount: '₹300',
      status: 'confirmed'
    },
    {
      id: 'BKG022',
      customer: 'Anjali Patel',
      service: 'Hair Coloring',
      date: 'Nov 3, 2:00 PM',
      amount: '₹2,500',
      status: 'pending'
    }
  ];

  const popularServices = [
    { name: 'Haircut & Styling', bookings: 45, revenue: '₹22,500' },
    { name: 'Hair Coloring', bookings: 18, revenue: '₹45,000' },
    { name: 'Facial Treatment', bookings: 12, revenue: '₹14,400' },
    { name: 'Beard Trim', bookings: 22, revenue: '₹6,600' },
  ];

  const quickActions = [
    { name: 'Add Service', icon: '➕', href: '/provider/dashboard/services', color: 'bg-purple-500' },
    { name: 'Manage Team', icon: '👥', href: '/provider/dashboard/team', color: 'bg-blue-500' },
    { name: 'View Earnings', icon: '💰', href: '/provider/dashboard/earnings', color: 'bg-green-500' },
    { name: 'Calendar', icon: '📅', href: '/provider/dashboard/calendar', color: 'bg-orange-500' },
    { name: 'Business Profile', icon: '👤', href: '/provider/dashboard/profile', color: 'bg-rose-500' },
    { name: 'Subscription', icon: '💳', href: '/provider/dashboard/subscription', color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 to-rose-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-heading font-bold mb-2">
          Welcome to Your Business Hub! 🎯
        </h1>
        <p className="text-purple-100 font-body text-lg">
          Manage your services, track earnings, and grow your beauty business
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">{stat.icon}</div>
              <span className="text-green-500 font-body text-sm font-medium">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-dark-grey font-body text-sm">{stat.label}</p>
              <p className="text-2xl font-heading font-bold text-dark-text mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
        <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="flex flex-col items-center p-4 border border-light-grey rounded-lg hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center text-white text-xl mb-2 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <span className="font-body font-medium text-dark-text text-center text-sm">
                {action.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-dark-text">
              Recent Bookings
            </h2>
            <a href="/provider/dashboard/calendar" className="text-purple-600 hover:text-purple-700 font-body font-medium">
              View All
            </a>
          </div>

          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border border-light-grey rounded-lg hover:bg-purple-50 transition-colors">
                <div>
                  <h3 className="font-heading font-semibold text-dark-text">
                    {booking.service}
                  </h3>
                  <p className="text-dark-grey font-body text-sm">
                    {booking.customer} · {booking.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-heading font-bold text-dark-text">{booking.amount}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-dark-text">
              Popular Services
            </h2>
            <a href="/provider/dashboard/services" className="text-purple-600 hover:text-purple-700 font-body font-medium">
              Manage
            </a>
          </div>

          <div className="space-y-4">
            {popularServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <span className="text-purple-500">💇‍♀️</span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-dark-text">
                      {service.name}
                    </p>
                    <p className="text-dark-grey font-body text-sm">
                      {service.bookings} bookings
                    </p>
                  </div>
                </div>
                <p className="font-heading font-bold text-green-500">
                  {service.revenue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business Health */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
        <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
          Business Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-light-grey rounded-lg">
            <div className="text-3xl text-green-500 mb-2">📈</div>
            <p className="font-heading font-bold text-dark-text">85%</p>
            <p className="text-dark-grey font-body text-sm">Booking Rate</p>
          </div>
          <div className="text-center p-4 border border-light-grey rounded-lg">
            <div className="text-3xl text-blue-500 mb-2">⏰</div>
            <p className="font-heading font-bold text-dark-text">92%</p>
            <p className="text-dark-grey font-body text-sm">On-time Rate</p>
          </div>
          <div className="text-center p-4 border border-light-grey rounded-lg">
            <div className="text-3xl text-yellow-500 mb-2">⭐</div>
            <p className="font-heading font-bold text-dark-text">4.8/5</p>
            <p className="text-dark-grey font-body text-sm">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}