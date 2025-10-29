'use client';

import { useState, useEffect } from 'react';

interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  upiId: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
}

interface Payout {
  id: string;
  date: string;
  amount: number;
  status: 'processed' | 'pending' | 'failed';
  method: 'bank_transfer' | 'upi';
}

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'banking' | 'transactions' | 'settings'>('overview');
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    upiId: ''
  });

  const [taxInfo, setTaxInfo] = useState({
    gstin: '',
    pan: ''
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);

  // Stats
  const [stats, setStats] = useState({
    currentBalance: 12500,
    totalEarnings: 89499,
    pendingPayout: 4500,
    thisMonthEarnings: 24500,
    totalBookings: 156,
    completedBookings: 142,
    cancellationRate: '8.9%',
    averageBookingValue: 573
  });

  // Sample data
  useEffect(() => {
    // Sample transactions
    const sampleTransactions: Transaction[] = [
      {
        id: '1',
        date: '2024-01-15',
        description: 'Hair Cut - Priya Sharma',
        amount: 499,
        type: 'credit',
        status: 'completed'
      },
      {
        id: '2',
        date: '2024-01-15',
        description: 'Hair Color - Rahul Kumar',
        amount: 1499,
        type: 'credit',
        status: 'completed'
      },
      {
        id: '3',
        date: '2024-01-14',
        description: 'Weekly Payout',
        amount: 8500,
        type: 'debit',
        status: 'completed'
      },
      {
        id: '4',
        date: '2024-01-14',
        description: 'Manicure - Anjali Patel',
        amount: 299,
        type: 'credit',
        status: 'completed'
      },
      {
        id: '5',
        date: '2024-01-13',
        description: 'Facial - Sanjay Gupta',
        amount: 899,
        type: 'credit',
        status: 'pending'
      }
    ];

    // Sample payouts
    const samplePayouts: Payout[] = [
      {
        id: '1',
        date: '2024-01-14',
        amount: 8500,
        status: 'processed',
        method: 'bank_transfer'
      },
      {
        id: '2',
        date: '2024-01-07',
        amount: 9200,
        status: 'processed',
        method: 'bank_transfer'
      },
      {
        id: '3',
        date: '2024-01-01',
        amount: 7800,
        status: 'processed',
        method: 'upi'
      },
      {
        id: '4',
        date: '2024-01-21',
        amount: 4500,
        status: 'pending',
        method: 'bank_transfer'
      }
    ];

    setTransactions(sampleTransactions);
    setPayouts(samplePayouts);
  }, []);

  const handleBankDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Bank details saved successfully!');
  };

  const handleTaxInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Tax information updated successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'processed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark-text">
          👤 My Account
        </h1>
        <p className="text-dark-grey font-body mt-1">
          Manage your banking details, track earnings, and account settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-light-grey">
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: 'overview', label: '📊 Overview', icon: '📊' },
            { key: 'banking', label: '🏦 Banking', icon: '🏦' },
            { key: 'transactions', label: '💰 Transactions', icon: '💰' },
            { key: 'settings', label: '⚙️ Settings', icon: '⚙️' }
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex-shrink-0 py-3 px-4 rounded-lg font-body font-medium transition-colors whitespace-nowrap ${
                activeTab === key
                  ? 'bg-rose-500 text-white'
                  : 'bg-light-grey text-dark-text hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm opacity-90">Available Balance</div>
              <div className="text-2xl font-heading font-bold mt-1">₹{stats.currentBalance.toLocaleString()}</div>
              <div className="text-xs opacity-80 mt-1">Ready for withdrawal</div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-sm opacity-90">This Month</div>
              <div className="text-2xl font-heading font-bold mt-1">₹{stats.thisMonthEarnings.toLocaleString()}</div>
              <div className="text-xs opacity-80 mt-1">January 2024 earnings</div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="text-2xl mb-2">⏳</div>
              <div className="text-sm opacity-90">Pending Payout</div>
              <div className="text-2xl font-heading font-bold mt-1">₹{stats.pendingPayout.toLocaleString()}</div>
              <div className="text-xs opacity-80 mt-1">Next settlement: 21 Jan</div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm opacity-90">Total Earnings</div>
              <div className="text-2xl font-heading font-bold mt-1">₹{stats.totalEarnings.toLocaleString()}</div>
              <div className="text-xs opacity-80 mt-1">All time revenue</div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
              <h3 className="font-heading font-bold text-dark-text mb-4">📈 Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-dark-grey font-body">Total Bookings</span>
                  <span className="font-heading font-bold text-rose-500">{stats.totalBookings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-grey font-body">Completed</span>
                  <span className="font-heading font-bold text-green-500">{stats.completedBookings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-grey font-body">Cancellation Rate</span>
                  <span className="font-heading font-bold text-yellow-500">{stats.cancellationRate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-grey font-body">Avg. Booking Value</span>
                  <span className="font-heading font-bold text-purple-500">₹{stats.averageBookingValue}</span>
                </div>
              </div>
            </div>

            {/* Recent Payouts */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
              <h3 className="font-heading font-bold text-dark-text mb-4">💸 Recent Payouts</h3>
              <div className="space-y-3">
                {payouts.slice(0, 3).map(payout => (
                  <div key={payout.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-body text-dark-text font-medium">
                        {new Date(payout.date).toLocaleDateString()}
                      </div>
                      <div className="text-dark-grey font-body text-sm capitalize">
                        {payout.method.replace('_', ' ')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-heading font-bold text-rose-500">₹{payout.amount.toLocaleString()}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payout.status)}`}>
                        {payout.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setActiveTab('transactions')}
                className="w-full mt-4 text-rose-500 hover:text-rose-700 font-body text-sm"
              >
                View All Transactions →
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h3 className="font-heading font-bold text-dark-text mb-4">⚡ Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setActiveTab('banking')}
                className="p-4 border-2 border-light-grey rounded-lg hover:border-rose-300 hover:bg-rose-50 transition-colors text-center"
              >
                <div className="text-2xl mb-2">🏦</div>
                <div className="font-body text-dark-text font-medium">Setup Banking</div>
                <div className="text-dark-grey font-body text-sm mt-1">Add account details</div>
              </button>

              <button className="p-4 border-2 border-light-grey rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-center">
                <div className="text-2xl mb-2">💸</div>
                <div className="font-body text-dark-text font-medium">Request Payout</div>
                <div className="text-dark-grey font-body text-sm mt-1">Withdraw ₹{stats.currentBalance.toLocaleString()}</div>
              </button>

              <button 
                onClick={() => setActiveTab('transactions')}
                className="p-4 border-2 border-light-grey rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
              >
                <div className="text-2xl mb-2">📄</div>
                <div className="font-body text-dark-text font-medium">Tax Documents</div>
                <div className="text-dark-grey font-body text-sm mt-1">Download reports</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banking Tab */}
      {activeTab === 'banking' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bank Details Form */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
              🏦 Bank Account Details
            </h2>
            
            <form onSubmit={handleBankDetailsSubmit} className="space-y-4">
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  value={bankDetails.accountHolderName}
                  onChange={(e) => setBankDetails({...bankDetails, accountHolderName: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="As per bank records"
                  required
                />
              </div>

              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="12-digit account number"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    value={bankDetails.ifscCode}
                    onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="SBIN0000123"
                    required
                  />
                </div>

                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    value={bankDetails.bankName}
                    onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="State Bank of India"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  UPI ID (Optional)
                </label>
                <input
                  type="text"
                  value={bankDetails.upiId}
                  onChange={(e) => setBankDetails({...bankDetails, upiId: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="yourname@upi"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors"
              >
                💾 Save Bank Details
              </button>
            </form>
          </div>

          {/* Banking Info & Tips */}
          <div className="space-y-6">
            {/* Payout Schedule */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
              <h3 className="font-heading font-bold text-dark-text mb-4">📅 Payout Schedule</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-dark-grey font-body">Next Payout</span>
                  <span className="font-heading font-bold text-rose-500">21 January 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-grey font-body">Frequency</span>
                  <span className="font-heading font-bold text-green-500">Weekly</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-grey font-body">Minimum Payout</span>
                  <span className="font-heading font-bold text-blue-500">₹1,000</span>
                </div>
              </div>
            </div>

            {/* Security Tips */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-heading font-bold text-dark-text mb-4">🔒 Security Tips</h3>
              <ul className="space-y-2 text-dark-grey font-body text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Never share your banking passwords
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Double-check account number before saving
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Ensure IFSC code matches your bank branch
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Use UPI for faster settlements
                </li>
              </ul>
            </div>

            {/* Current Balance */}
            <div className="bg-gradient-to-r from-purple-500 to-rose-500 rounded-xl p-6 text-white">
              <h3 className="font-heading font-bold text-lg mb-2">💰 Available Balance</h3>
              <div className="text-3xl font-heading font-bold mb-2">₹{stats.currentBalance.toLocaleString()}</div>
              <p className="font-body text-sm opacity-90">
                Ready for immediate withdrawal to your bank account
              </p>
              <button className="w-full mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-body font-medium hover:bg-gray-100 transition-colors">
                💸 Request Payout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          {/* Transactions List */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
              💰 Transaction History
            </h2>
            
            <div className="space-y-4">
              {transactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-light-grey rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '⬇️' : '⬆️'}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-dark-text">
                        {transaction.description}
                      </h3>
                      <p className="text-dark-grey font-body text-sm">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-heading font-bold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h3 className="font-heading font-bold text-dark-text mb-4">📄 Export Records</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border-2 border-light-grey rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-center">
                <div className="text-xl mb-2">📊</div>
                <div className="font-body text-dark-text font-medium">Monthly Report</div>
                <div className="text-dark-grey font-body text-sm mt-1">January 2024</div>
              </button>

              <button className="p-4 border-2 border-light-grey rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center">
                <div className="text-xl mb-2">🧾</div>
                <div className="font-body text-dark-text font-medium">Tax Invoice</div>
                <div className="text-dark-grey font-body text-sm mt-1">Financial Year 2023-24</div>
              </button>

              <button className="p-4 border-2 border-light-grey rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-center">
                <div className="text-xl mb-2">💳</div>
                <div className="font-body text-dark-text font-medium">Payout Summary</div>
                <div className="text-dark-grey font-body text-sm mt-1">All transactions</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
              ⚙️ Account Settings
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="priya.sharma@example.com"
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Change Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <button className="w-full bg-rose-500 text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors">
                🔄 Update Settings
              </button>
            </div>
          </div>

          {/* Tax Information - GST OPTIONAL */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
              <h3 className="font-heading font-bold text-dark-text mb-4">🧾 Tax Information (Optional)</h3>
              <form onSubmit={handleTaxInfoSubmit} className="space-y-4">
                <div>
                  <label className="block text-dark-grey font-body text-sm mb-2">
                    GSTIN Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={taxInfo.gstin}
                    onChange={(e) => setTaxInfo({...taxInfo, gstin: e.target.value})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="22AAAAA0000A1Z5"
                  />
                  <p className="text-dark-grey font-body text-xs mt-1">
                    Add GSTIN if registered for GST. Optional for small businesses.
                  </p>
                </div>

                <div>
                  <label className="block text-dark-grey font-body text-sm mb-2">
                    PAN Number (Recommended)
                  </label>
                  <input
                    type="text"
                    value={taxInfo.pan}
                    onChange={(e) => setTaxInfo({...taxInfo, pan: e.target.value})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="ABCDE1234F"
                  />
                  <p className="text-dark-grey font-body text-xs mt-1">
                    PAN card number for tax purposes
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-500 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors"
                >
                  💾 Save Tax Information
                </button>
              </form>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
              <h3 className="font-heading font-bold text-dark-text mb-4">🔔 Notifications</h3>
              <div className="space-y-4">
                {[
                  { label: 'New Booking Alerts', defaultChecked: true },
                  { label: 'Payment Notifications', defaultChecked: true },
                  { label: 'Payout Updates', defaultChecked: true },
                  { label: 'Promotional Emails', defaultChecked: false },
                  { label: 'SMS Reminders', defaultChecked: true }
                ].map(({ label, defaultChecked }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-dark-text font-body">{label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={defaultChecked}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}