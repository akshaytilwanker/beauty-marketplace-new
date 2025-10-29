import Link from 'next/link';

export default function ProviderBenefits() {
  const benefits = [
    {
      icon: '👥',
      title: 'Reach More Customers',
      description: 'Connect with thousands of beauty seekers in your area'
    },
    {
      icon: '💸',
      title: 'Increase Earnings',
      description: 'Grow your business with our commission-free first month'
    },
    {
      icon: '📅',
      title: 'Smart Booking',
      description: 'Automated scheduling and appointment management'
    },
    {
      icon: '⭐',
      title: 'Build Reputation',
      description: 'Collect reviews and build your beauty brand'
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      description: 'Get paid securely and on time, every time'
    },
    {
      icon: '📱',
      title: 'Easy Management',
      description: 'Manage your services and availability from anywhere'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-rose-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-rose-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-heading font-bold mb-6">
            Grow Your Beauty Business
          </h1>
          <p className="text-xl opacity-90 mb-8 font-body">
            Join the fastest growing beauty marketplace and reach thousands of new customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup?role=provider"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-body font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link 
              href="#benefits"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-body font-medium hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="benefits" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-heading font-bold text-center text-dark-text mb-4">
            Why Choose BeautyConnect?
          </h2>
          <p className="text-xl text-dark-grey text-center mb-12 font-body">
            Everything you need to grow your beauty business
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-heading font-bold text-dark-text mb-3">
                  {benefit.title}
                </h3>
                <p className="text-dark-grey font-body">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-heading font-bold text-dark-text mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-dark-grey mb-8 font-body">
            Join thousands of beauty professionals already growing with BeautyConnect
          </p>
          <Link 
            href="/signup?role=provider"
            className="bg-gradient-to-r from-purple-500 to-rose-500 text-white px-12 py-4 rounded-lg font-body font-bold text-lg hover:shadow-xl transition-all"
          >
            Get Started - Free for 30 Days
          </Link>
          <p className="text-dark-grey mt-4 font-body">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}