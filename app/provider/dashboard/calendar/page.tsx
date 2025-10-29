'use client';

import { useState, useEffect } from 'react';

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  serviceId: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'noshow';
  amount: number;
  paid: boolean;
  notes: string;
  createdAt: string;
  cancellationReason?: string;
  cancelledBy?: 'provider' | 'customer';
}

interface Service {
  id: string;
  name: string;
  duration: number;
  color: string;
  price: number;
}

interface WorkingDay {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
  slotDuration: number;
  breaks: { start: string; end: string; reason: string }[];
}

export default function BookingManagementPage() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'time-slots'>('bookings');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'upcoming' | 'today'>('today');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Services and Time Slot Management State
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: '💇 Hair Cut', duration: 45, color: 'bg-purple-500', price: 499 },
    { id: '2', name: '🎨 Hair Color', duration: 120, color: 'bg-pink-500', price: 1499 },
    { id: '3', name: '💅 Manicure', duration: 30, color: 'bg-blue-500', price: 299 },
    { id: '4', name: '✨ Facial', duration: 90, color: 'bg-green-500', price: 899 },
  ]);

  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([
    { day: 'Monday', enabled: true, startTime: '09:00', endTime: '18:00', slotDuration: 30, breaks: [{ start: '13:00', end: '14:00', reason: 'Lunch Break' }] },
    { day: 'Tuesday', enabled: true, startTime: '09:00', endTime: '18:00', slotDuration: 30, breaks: [{ start: '13:00', end: '14:00', reason: 'Lunch Break' }] },
    { day: 'Wednesday', enabled: true, startTime: '09:00', endTime: '18:00', slotDuration: 30, breaks: [{ start: '13:00', end: '14:00', reason: 'Lunch Break' }] },
    { day: 'Thursday', enabled: true, startTime: '09:00', endTime: '18:00', slotDuration: 30, breaks: [{ start: '13:00', end: '14:00', reason: 'Lunch Break' }] },
    { day: 'Friday', enabled: true, startTime: '09:00', endTime: '18:00', slotDuration: 30, breaks: [{ start: '13:00', end: '14:00', reason: 'Lunch Break' }] },
    { day: 'Saturday', enabled: true, startTime: '10:00', endTime: '17:00', slotDuration: 30, breaks: [{ start: '13:00', end: '14:00', reason: 'Lunch Break' }] },
    { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '16:00', slotDuration: 30, breaks: [] },
  ]);

  const [newService, setNewService] = useState({ name: '', duration: 30, price: 0 });

  // Sample bookings data
  useEffect(() => {
    const sampleBookings: Booking[] = [
      {
        id: '1',
        customerName: 'Priya Sharma',
        customerPhone: '+91 98765 43210',
        service: '💇 Hair Cut',
        serviceId: '1',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        duration: 45,
        status: 'confirmed',
        amount: 499,
        paid: true,
        notes: 'Regular customer',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '2',
        customerName: 'Rahul Kumar',
        customerPhone: '+91 98765 12345',
        service: '🎨 Hair Color',
        serviceId: '2',
        date: new Date().toISOString().split('T')[0],
        time: '14:00',
        duration: 120,
        status: 'pending',
        amount: 1499,
        paid: false,
        notes: 'First time customer',
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: '3',
        customerName: 'Anjali Patel',
        customerPhone: '+91 98765 67890',
        service: '💅 Manicure',
        serviceId: '3',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '11:00',
        duration: 30,
        status: 'confirmed',
        amount: 299,
        paid: true,
        notes: '',
        createdAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: '4',
        customerName: 'Sanjay Gupta',
        customerPhone: '+91 98765 24680',
        service: '✨ Facial',
        serviceId: '4',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '15:00',
        duration: 90,
        status: 'cancelled',
        amount: 899,
        paid: false,
        notes: 'Customer emergency',
        cancellationReason: 'Customer had emergency',
        cancelledBy: 'customer',
        createdAt: new Date(Date.now() - 259200000).toISOString()
      },
      {
        id: '5',
        customerName: 'Meera Iyer',
        customerPhone: '+91 98765 13579',
        service: '💇 Hair Cut',
        serviceId: '1',
        date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        time: '16:00',
        duration: 45,
        status: 'confirmed',
        amount: 499,
        paid: false,
        notes: 'Wants styling advice',
        createdAt: new Date(Date.now() - 432000000).toISOString()
      }
    ];
    setBookings(sampleBookings);
  }, []);

  // Filter bookings based on selection
  const filteredBookings = bookings.filter(booking => {
    const today = new Date().toISOString().split('T')[0];
    const bookingDate = booking.date;
    const isUpcoming = bookingDate > today;
    const isToday = bookingDate === today;

    switch (bookingFilter) {
      case 'today':
        return isToday && booking.status !== 'cancelled' && booking.status !== 'completed';
      case 'upcoming':
        return isUpcoming && booking.status === 'confirmed';
      case 'pending':
        return booking.status === 'pending';
      case 'confirmed':
        return booking.status === 'confirmed' && !isToday && !isUpcoming;
      case 'cancelled':
        return booking.status === 'cancelled';
      default:
        return true;
    }
  });

  // Booking Actions
  const confirmBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'confirmed' } : booking
      )
    );
  };

  const cancelBooking = (bookingId: string, reason: string, cancelledBy: 'provider' | 'customer') => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId 
          ? { 
              ...booking, 
              status: 'cancelled',
              cancellationReason: reason,
              cancelledBy: cancelledBy
            } 
          : booking
      )
    );
  };

  const completeBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'completed', paid: true } : booking
      )
    );
  };

  const markAsNoShow = (bookingId: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'noshow' } : booking
      )
    );
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId 
          ? { ...booking, date: newDate, time: newTime, status: 'confirmed' }
          : booking
      )
    );
  };

  // Time Slot Management Functions
  const addService = () => {
    if (newService.name && newService.duration > 0) {
      const service: Service = {
        id: Date.now().toString(),
        name: newService.name,
        duration: newService.duration,
        color: `bg-${['purple', 'pink', 'blue', 'green', 'yellow', 'indigo'][services.length % 6]}-500`,
        price: newService.price
      };
      setServices([...services, service]);
      setNewService({ name: '', duration: 30, price: 0 });
    }
  };

  const removeService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const updateWorkingDay = (index: number, field: keyof WorkingDay, value: any) => {
    const updated = [...workingDays];
    updated[index] = { ...updated[index], [field]: value };
    setWorkingDays(updated);
  };

  const addBreak = (dayIndex: number) => {
    const updated = [...workingDays];
    updated[dayIndex].breaks.push({ start: '14:00', end: '15:00', reason: 'Break Time' });
    setWorkingDays(updated);
  };

  const removeBreak = (dayIndex: number, breakIndex: number) => {
    const updated = [...workingDays];
    updated[dayIndex].breaks.splice(breakIndex, 1);
    setWorkingDays(updated);
  };

  // Get status color and text
  const getStatusInfo = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return { color: 'bg-green-100 text-green-800 border-green-300', text: '✅ Confirmed' };
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', text: '⏳ Pending' };
      case 'cancelled':
        return { color: 'bg-red-100 text-red-800 border-red-300', text: '❌ Cancelled' };
      case 'completed':
        return { color: 'bg-blue-100 text-blue-800 border-blue-300', text: '✅ Completed' };
      case 'noshow':
        return { color: 'bg-orange-100 text-orange-800 border-orange-300', text: '🚫 No Show' };
      default:
        return { color: 'bg-gray-100 text-gray-800 border-gray-300', text: status };
    }
  };

  const slotDurations = [10, 15, 20, 30, 45, 60, 90, 120];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark-text">
          📋 Booking Management
        </h1>
        <p className="text-dark-grey font-body mt-1">
          Manage all bookings, time slots, and availability in one place
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-light-grey">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-3 px-4 rounded-lg font-body font-medium transition-colors ${
              activeTab === 'bookings'
                ? 'bg-rose-500 text-white'
                : 'bg-light-grey text-dark-text hover:bg-gray-200'
            }`}
          >
            📅 All Bookings
          </button>
          <button
            onClick={() => setActiveTab('time-slots')}
            className={`flex-1 py-3 px-4 rounded-lg font-body font-medium transition-colors ${
              activeTab === 'time-slots'
                ? 'bg-rose-500 text-white'
                : 'bg-light-grey text-dark-text hover:bg-gray-200'
            }`}
          >
            ⚙️ Time Slots & Services
          </button>
        </div>
      </div>

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {/* Booking Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'today', label: "📅 Today's", count: bookings.filter(b => b.date === new Date().toISOString().split('T')[0] && b.status !== 'cancelled' && b.status !== 'completed').length },
                { key: 'upcoming', label: '⏭️ Upcoming', count: bookings.filter(b => b.date > new Date().toISOString().split('T')[0] && b.status === 'confirmed').length },
                { key: 'pending', label: '⏳ Pending', count: bookings.filter(b => b.status === 'pending').length },
                { key: 'confirmed', label: '✅ Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
                { key: 'cancelled', label: '❌ Cancelled', count: bookings.filter(b => b.status === 'cancelled').length },
                { key: 'all', label: '📊 All', count: bookings.length }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setBookingFilter(key as any)}
                  className={`px-4 py-2 rounded-lg font-body transition-colors ${
                    bookingFilter === key
                      ? 'bg-rose-500 text-white'
                      : 'bg-light-grey text-dark-text hover:bg-gray-200'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
              {bookingFilter === 'today' ? "Today's Appointments" :
               bookingFilter === 'upcoming' ? 'Upcoming Appointments' :
               bookingFilter === 'pending' ? 'Pending Approvals' :
               bookingFilter === 'cancelled' ? 'Cancelled Bookings' : 
               bookingFilter === 'confirmed' ? 'Confirmed Bookings' : 'All Bookings'}
            </h2>
            
            <div className="space-y-4">
              {filteredBookings.map(booking => {
                const statusInfo = getStatusInfo(booking.status);
                
                return (
                  <div key={booking.id} className="border border-light-grey rounded-lg p-4 hover:border-rose-300 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Booking Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-heading font-semibold text-dark-text text-lg">
                              {booking.customerName}
                            </h3>
                            <p className="text-dark-grey font-body text-sm">
                              📞 {booking.customerPhone}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-body border ${statusInfo.color}`}>
                            {statusInfo.text}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-dark-grey">Service:</span>
                            <div className="font-medium text-dark-text">{booking.service}</div>
                          </div>
                          <div>
                            <span className="text-dark-grey">Date & Time:</span>
                            <div className="font-medium text-dark-text">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </div>
                          </div>
                          <div>
                            <span className="text-dark-grey">Amount:</span>
                            <div className="font-medium text-dark-text">
                              ₹{booking.amount} {booking.paid ? '✅ Paid' : '💳 Collect'}
                            </div>
                          </div>
                        </div>
                        
                        {booking.notes && (
                          <div className="mt-2">
                            <span className="text-dark-grey text-sm">Notes: </span>
                            <span className="text-dark-text text-sm">{booking.notes}</span>
                          </div>
                        )}
                        
                        {booking.cancellationReason && (
                          <div className="mt-2">
                            <span className="text-red-600 text-sm">
                              Cancellation reason: {booking.cancellationReason}
                              {booking.cancelledBy && ` (by ${booking.cancelledBy})`}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col space-y-2 min-w-[200px]">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => confirmBooking(booking.id)}
                              className="bg-green-500 text-white px-4 py-2 rounded text-sm font-body hover:bg-green-600 transition-colors"
                            >
                              ✅ Confirm
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Reason for cancellation:');
                                if (reason) cancelBooking(booking.id, reason, 'provider');
                              }}
                              className="bg-red-500 text-white px-4 py-2 rounded text-sm font-body hover:bg-red-600 transition-colors"
                            >
                              ❌ Reject
                            </button>
                          </>
                        )}
                        
                        {booking.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => completeBooking(booking.id)}
                              className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-body hover:bg-blue-600 transition-colors"
                            >
                              ✅ Mark Complete
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Reason for cancellation:');
                                if (reason) cancelBooking(booking.id, reason, 'provider');
                              }}
                              className="bg-red-500 text-white px-4 py-2 rounded text-sm font-body hover:bg-red-600 transition-colors"
                            >
                              ❌ Cancel
                            </button>
                            <button
                              onClick={() => {
                                const newDate = prompt('New date (YYYY-MM-DD):', booking.date);
                                const newTime = prompt('New time (HH:MM):', booking.time);
                                if (newDate && newTime) {
                                  rescheduleBooking(booking.id, newDate, newTime);
                                }
                              }}
                              className="bg-purple-500 text-white px-4 py-2 rounded text-sm font-body hover:bg-purple-600 transition-colors"
                            >
                              📅 Reschedule
                            </button>
                          </>
                        )}
                        
                        {(booking.status === 'confirmed' || booking.status === 'pending') && (
                          <button
                            onClick={() => markAsNoShow(booking.id)}
                            className="bg-orange-500 text-white px-4 py-2 rounded text-sm font-body hover:bg-orange-600 transition-colors"
                          >
                            🚫 Mark No Show
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredBookings.length === 0 && (
                <div className="text-center py-12 text-dark-grey font-body">
                  <div className="text-4xl mb-4">📭</div>
                  <div>No bookings found</div>
                  <div className="text-sm mt-1">All clear for now!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Time Slots Tab */}
      {activeTab === 'time-slots' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Services */}
          <div className="space-y-6">
            {/* Services Setup */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
              <h2 className="text-xl font-heading font-bold text-dark-text mb-4">
                💇 Your Services & Timing
              </h2>
              
              {/* Add New Service */}
              <div className="bg-rose-50 rounded-lg p-4 mb-4 border border-rose-200">
                <h3 className="font-heading font-semibold text-dark-text mb-3">
                  ➕ Add New Service
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                    placeholder="Service name (e.g., Hair Spa, Pedicure)"
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-dark-grey font-body text-sm mb-1">
                        ⏱️ Duration (minutes)
                      </label>
                      <select
                        value={newService.duration}
                        onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      >
                        {slotDurations.map(duration => (
                          <option key={duration} value={duration}>
                            {duration} min
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-dark-grey font-body text-sm mb-1">
                        💰 Price (₹)
                      </label>
                      <input
                        type="number"
                        value={newService.price}
                        onChange={(e) => setNewService({...newService, price: parseInt(e.target.value) || 0})}
                        placeholder="0"
                        className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={addService}
                    className="w-full bg-rose-500 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors"
                  >
                    Add Service
                  </button>
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-2">
                <h3 className="font-heading font-semibold text-dark-text mb-3">
                  Your Services ({services.length})
                </h3>
                {services.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${service.color}`}></div>
                      <div>
                        <div className="font-body text-dark-text font-medium">
                          {service.name}
                        </div>
                        <div className="text-dark-grey font-body text-sm">
                          {service.duration} min • ₹{service.price}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeService(service.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Working Days */}
          <div className="space-y-6">
            {/* Working Days Setup */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
              <h2 className="text-xl font-heading font-bold text-dark-text mb-4">
                📅 Set Working Days & Hours
              </h2>
              
              <div className="space-y-4">
                {workingDays.map((day, index) => (
                  <div key={day.day} className="border border-light-grey rounded-lg p-4">
                    {/* Day Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={day.enabled}
                            onChange={(e) => updateWorkingDay(index, 'enabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                        </label>
                        <span className="font-heading font-semibold text-dark-text">
                          {day.day}
                        </span>
                      </div>
                      
                      {day.enabled ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-body">
                          ✅ OPEN
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-body">
                          ❌ CLOSED
                        </span>
                      )}
                    </div>

                    {/* Working Hours - Only show if enabled */}
                    {day.enabled && (
                      <div className="space-y-4 pl-11">
                        {/* Working Time */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-dark-grey font-body text-sm mb-1">
                              🕐 Open At
                            </label>
                            <input
                              type="time"
                              value={day.startTime}
                              onChange={(e) => updateWorkingDay(index, 'startTime', e.target.value)}
                              className="w-full px-3 py-2 border border-light-grey rounded text-sm"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-dark-grey font-body text-sm mb-1">
                              🕔 Close At
                            </label>
                            <input
                              type="time"
                              value={day.endTime}
                              onChange={(e) => updateWorkingDay(index, 'endTime', e.target.value)}
                              className="w-full px-3 py-2 border border-light-grey rounded text-sm"
                            />
                          </div>
                        </div>

                        {/* Slot Duration */}
                        <div>
                          <label className="block text-dark-grey font-body text-sm mb-1">
                            ⏱️ Slot Duration
                          </label>
                          <select
                            value={day.slotDuration}
                            onChange={(e) => updateWorkingDay(index, 'slotDuration', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-light-grey rounded text-sm"
                          >
                            {slotDurations.map(duration => (
                              <option key={duration} value={duration}>
                                {duration} min
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Breaks */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-dark-grey font-body text-sm">
                              ☕ Break Times
                            </label>
                            <button
                              onClick={() => addBreak(index)}
                              className="text-rose-500 hover:text-rose-700 text-sm font-body"
                            >
                              + Add Break
                            </button>
                          </div>
                          
                          {day.breaks.map((breakTime, breakIndex) => (
                            <div key={breakIndex} className="flex items-center space-x-2 mb-2">
                              <input
                                type="time"
                                value={breakTime.start}
                                onChange={(e) => {
                                  const updated = [...workingDays];
                                  updated[index].breaks[breakIndex].start = e.target.value;
                                  setWorkingDays(updated);
                                }}
                                className="px-3 py-1 border border-light-grey rounded text-sm"
                              />
                              <span className="text-dark-grey text-sm">to</span>
                              <input
                                type="time"
                                value={breakTime.end}
                                onChange={(e) => {
                                  const updated = [...workingDays];
                                  updated[index].breaks[breakIndex].end = e.target.value;
                                  setWorkingDays(updated);
                                }}
                                className="px-3 py-1 border border-light-grey rounded text-sm"
                              />
                              <input
                                type="text"
                                value={breakTime.reason}
                                onChange={(e) => {
                                  const updated = [...workingDays];
                                  updated[index].breaks[breakIndex].reason = e.target.value;
                                  setWorkingDays(updated);
                                }}
                                placeholder="Lunch, Break..."
                                className="px-3 py-1 border border-light-grey rounded text-sm flex-1"
                              />
                              <button
                                onClick={() => removeBreak(index, breakIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                ❌
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button className="w-full bg-green-500 text-white px-6 py-4 rounded-lg font-body font-medium hover:bg-green-600 transition-colors text-lg">
              💾 SAVE ALL SETTINGS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}