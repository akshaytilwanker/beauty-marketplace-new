'use client';

export default function BookingsPage() {
  // Mock data - last 10 bookings
  const bookings = [
    {
      id: 'BKG015',
      service: 'Haircut & Styling',
      date: 'Oct 28, 2024',
      time: '2:00 PM',
      provider: 'StyleStudio by Priya',
      amount: '₹500',
      status: 'completed',
      invoiceId: 'INV-0015'
    },
    {
      id: 'BKG014',
      service: 'Manicure & Pedicure',
      date: 'Oct 25, 2024', 
      time: '11:00 AM',
      provider: 'NailArt Lounge',
      amount: '₹800',
      status: 'completed',
      invoiceId: 'INV-0014'
    },
    {
      id: 'BKG013',
      service: 'Facial Treatment',
      date: 'Oct 20, 2024',
      time: '4:00 PM',
      provider: 'Glamour Spa',
      amount: '₹1,200',
      status: 'completed',
      invoiceId: 'INV-0013'
    },
    {
      id: 'BKG012',
      service: 'Hair Coloring',
      date: 'Oct 15, 2024',
      time: '1:00 PM',
      provider: 'StyleStudio by Priya',
      amount: '₹2,500',
      status: 'completed',
      invoiceId: 'INV-0012'
    },
    {
      id: 'BKG011',
      service: 'Makeup Session',
      date: 'Oct 10, 2024',
      time: '10:00 AM',
      provider: 'Bridal Beauty',
      amount: '₹3,000',
      status: 'completed', 
      invoiceId: 'INV-0011'
    },
    {
      id: 'BKG010',
      service: 'Haircut & Styling',
      date: 'Oct 5, 2024',
      time: '3:30 PM',
      provider: 'StyleStudio by Priya',
      amount: '₹500',
      status: 'completed',
      invoiceId: 'INV-0010'
    },
    {
      id: 'BKG009',
      service: 'Spa Package',
      date: 'Sep 28, 2024',
      time: '2:00 PM',
      provider: 'Glamour Spa', 
      amount: '₹2,000',
      status: 'completed',
      invoiceId: 'INV-0009'
    },
    {
      id: 'BKG008',
      service: 'Nail Art',
      date: 'Sep 22, 2024',
      time: '11:30 AM',
      provider: 'NailArt Lounge',
      amount: '₹600',
      status: 'completed',
      invoiceId: 'INV-0008'
    },
    {
      id: 'BKG007',
      service: 'Facial Treatment',
      date: 'Sep 15, 2024',
      time: '5:00 PM',
      provider: 'Glamour Spa',
      amount: '₹1,200',
      status: 'completed',
      invoiceId: 'INV-0007'
    },
    {
      id: 'BKG006',
      service: 'Hair Treatment',
      date: 'Sep 8, 2024',
      time: '12:00 PM',
      provider: 'StyleStudio by Priya',
      amount: '₹1,500',
      status: 'completed',
      invoiceId: 'INV-0006'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const downloadInvoice = (invoiceId: string) => {
    // Mock invoice download - will integrate with real API later
    alert(`Downloading invoice: ${invoiceId}`);
    // In real implementation: window.open(`/api/invoices/${invoiceId}/download`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-dark-text">
            Booking History
          </h1>
          <p className="text-dark-grey font-body mt-1">
            Your last 10 bookings and invoices
          </p>
        </div>
        <button className="bg-rose-500 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors">
          Book New Service
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-light-grey overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-light-grey border-b border-light-grey">
              <tr>
                <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">
                  Service
                </th>
                <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">
                  Date & Time
                </th>
                <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">
                  Provider
                </th>
                <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">
                  Amount
                </th>
                <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-grey">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-rose-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center">
                        <span className="text-rose-500">💇‍♀️</span>
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-dark-text">
                          {booking.service}
                        </p>
                        <p className="text-dark-grey font-body text-sm">
                          #{booking.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-body text-dark-text">{booking.date}</p>
                    <p className="text-dark-grey font-body text-sm">{booking.time}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-body text-dark-text">{booking.provider}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-heading font-bold text-dark-text">{booking.amount}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => downloadInvoice(booking.invoiceId)}
                      className="flex items-center space-x-1 text-rose-500 hover:text-rose-600 font-body font-medium"
                    >
                      <span>📄</span>
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
          <p className="text-2xl font-heading font-bold text-rose-500">10</p>
          <p className="text-dark-grey font-body mt-1">Total Bookings</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
          <p className="text-2xl font-heading font-bold text-green-500">₹12,800</p>
          <p className="text-dark-grey font-body mt-1">Total Spent</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
          <p className="text-2xl font-heading font-bold text-blue-500">3</p>
          <p className="text-dark-grey font-body mt-1">Favorite Providers</p>
        </div>
      </div>
    </div>
  );
}