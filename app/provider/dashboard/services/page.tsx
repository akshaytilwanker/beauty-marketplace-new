'use client';

import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  status: 'active' | 'inactive';
  image: string;
  discountPercent: number;
  discountExpiry: string | null;
}

interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  maxDiscount: number;
  usageLimit: number;
  usedCount: number;
  expiryDate: string;
  status: 'active' | 'expired';
}

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Haircut & Styling',
      category: 'Hair',
      description: 'Professional haircut with modern styling',
      price: 500,
      duration: 60,
      status: 'active',
      image: '💇‍♀️',
      discountPercent: 10,
      discountExpiry: '2024-12-31'
    },
    {
      id: '2',
      name: 'Hair Coloring',
      category: 'Hair',
      description: 'Full hair coloring with premium products',
      price: 2500,
      duration: 120,
      status: 'active',
      image: '🎨',
      discountPercent: 15,
      discountExpiry: '2024-11-30'
    },
    {
      id: '3',
      name: 'Facial Treatment',
      category: 'Skincare',
      description: 'Relaxing facial with deep cleansing',
      price: 1200,
      duration: 90,
      status: 'active',
      image: '✨',
      discountPercent: 0,
      discountExpiry: null
    }
  ]);

  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: '1',
      code: 'WELCOME20',
      discountType: 'percentage',
      discountValue: 20,
      minOrder: 1000,
      maxDiscount: 500,
      usageLimit: 100,
      usedCount: 45,
      expiryDate: '2024-12-31',
      status: 'active'
    },
    {
      id: '2',
      code: 'FLAT500',
      discountType: 'fixed',
      discountValue: 500,
      minOrder: 2000,
      maxDiscount: 500,
      usageLimit: 50,
      usedCount: 12,
      expiryDate: '2024-11-15',
      status: 'active'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'services' | 'coupons'>('services');
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showCouponForm, setShowCouponForm] = useState(false);

  const [newService, setNewService] = useState({
    name: '',
    category: 'Hair',
    description: '',
    price: 0,
    duration: 30,
    status: 'active' as 'active' | 'inactive',
    image: '💅',
    discountPercent: 0,
    discountExpiry: ''
  });

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 10,
    minOrder: 0,
    maxDiscount: 1000,
    usageLimit: 100,
    expiryDate: ''
  });

  // Service Functions
  const addService = () => {
    const service: Service = {
      ...newService,
      id: Date.now().toString(),
      discountExpiry: newService.discountExpiry || null
    };
    setServices([...services, service]);
    setNewService({
      name: '',
      category: 'Hair',
      description: '',
      price: 0,
      duration: 30,
      status: 'active',
      image: '💅',
      discountPercent: 0,
      discountExpiry: ''
    });
    setShowServiceForm(false);
  };

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const calculateDiscountedPrice = (service: Service) => {
    if (service.discountPercent > 0) {
      return service.price - (service.price * service.discountPercent / 100);
    }
    return service.price;
  };

  // Coupon Functions
  const addCoupon = () => {
    const coupon: Coupon = {
      ...newCoupon,
      id: Date.now().toString(),
      usedCount: 0,
      status: 'active'
    };
    setCoupons([...coupons, coupon]);
    setNewCoupon({
      code: '',
      discountType: 'percentage',
      discountValue: 10,
      minOrder: 0,
      maxDiscount: 1000,
      usageLimit: 100,
      expiryDate: ''
    });
    setShowCouponForm(false);
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons(coupons.map(c => 
      c.id === id ? { ...c, status: c.status === 'active' ? 'expired' : 'active' } : c
    ));
  };

  const categories = ['Hair', 'Skincare', 'Nails', 'Makeup', 'Spa', 'Massage'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-dark-text">
            Services & Promotions
          </h1>
          <p className="text-dark-grey font-body mt-1">
            Manage services, discounts, and coupon codes
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl p-1 shadow-sm border border-light-grey inline-flex">
        <button
          onClick={() => setActiveTab('services')}
          className={`px-6 py-2 rounded-lg font-body font-medium transition-colors ${
            activeTab === 'services'
              ? 'bg-rose-500 text-white'
              : 'text-dark-grey hover:text-rose-500'
          }`}
        >
          💅 Services
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-6 py-2 rounded-lg font-body font-medium transition-colors ${
            activeTab === 'coupons'
              ? 'bg-rose-500 text-white'
              : 'text-dark-grey hover:text-rose-500'
          }`}
        >
          🏷️ Coupons
        </button>
      </div>

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
              <p className="text-2xl font-heading font-bold text-rose-500">{services.length}</p>
              <p className="text-dark-grey font-body mt-1">Total Services</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
              <p className="text-2xl font-heading font-bold text-green-500">
                {services.filter(s => s.discountPercent > 0).length}
              </p>
              <p className="text-dark-grey font-body mt-1">Active Offers</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
              <p className="text-2xl font-heading font-bold text-purple-500">
                ₹{services.reduce((sum, s) => sum + s.price, 0)}
              </p>
              <p className="text-dark-grey font-body mt-1">Total Value</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
              <p className="text-2xl font-heading font-bold text-blue-500">
                {services.filter(s => s.status === 'active').length}
              </p>
              <p className="text-dark-grey font-body mt-1">Active Services</p>
            </div>
          </div>

          {/* Add Service Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-heading font-bold text-dark-text">
              Your Services
            </h2>
            <button
              onClick={() => setShowServiceForm(true)}
              className="bg-rose-500 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors"
            >
              + Add New Service
            </button>
          </div>

          {/* Services List */}
          <div className="bg-white rounded-xl shadow-sm border border-light-grey overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light-grey border-b border-light-grey">
                  <tr>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">Service</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">Pricing</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">Discount</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">Status</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-grey">
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-rose-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center">
                            <span className="text-xl">{service.image}</span>
                          </div>
                          <div>
                            <p className="font-heading font-semibold text-dark-text">{service.name}</p>
                            <p className="text-dark-grey font-body text-sm">{service.description}</p>
                            <p className="text-dark-grey font-body text-sm">{service.duration} mins · {service.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <p className="font-heading font-bold text-dark-text">₹{service.price}</p>
                          {service.discountPercent > 0 && (
                            <p className="font-heading font-bold text-green-500 text-sm">
                              ₹{calculateDiscountedPrice(service)} after {service.discountPercent}% off
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {service.discountPercent > 0 ? (
                          <div className="space-y-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body bg-green-100 text-green-800">
                              {service.discountPercent}% OFF
                            </span>
                            {service.discountExpiry && (
                              <p className="text-dark-grey font-body text-xs">
                                Until {new Date(service.discountExpiry).toLocaleDateString('en-IN')}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-dark-grey font-body text-sm">No discount</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body ${
                          service.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => deleteService(service.id)}
                          className="text-red-500 hover:text-red-600 font-body font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Service Form */}
          {showServiceForm && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
              <h2 className="text-xl font-heading font-bold text-dark-text mb-6">Add New Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">Service Name</label>
                  <input
                    type="text"
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., Haircut & Styling"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">Category</label>
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({...newService, category: e.target.value})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">Discount %</label>
                  <input
                    type="number"
                    value={newService.discountPercent}
                    onChange={(e) => setNewService({...newService, discountPercent: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={newService.duration}
                    onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="60"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">Discount Expiry</label>
                  <input
                    type="date"
                    value={newService.discountExpiry}
                    onChange={(e) => setNewService({...newService, discountExpiry: e.target.value})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-dark-text font-body font-medium mb-2">Description</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="Describe your service..."
                  />
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={addService}
                  className="bg-rose-500 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-rose-600"
                >
                  Add Service
                </button>
                <button
                  onClick={() => setShowServiceForm(false)}
                  className="border border-light-grey text-dark-text px-6 py-2 rounded-lg font-body font-medium hover:bg-light-grey"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Coupons Tab */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          {/* Coupon Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
              <p className="text-2xl font-heading font-bold text-rose-500">{coupons.length}</p>
              <p className="text-dark-grey font-body mt-1">Total Coupons</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
              <p className="text-2xl font-heading font-bold text-green-500">
                {coupons.filter(c => c.status === 'active').length}
              </p>
              <p className="text-dark-grey font-body mt-1">Active Coupons</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
              <p className="text-2xl font-heading font-bold text-purple-500">
                {coupons.reduce((sum, c) => sum + c.usedCount, 0)}
              </p>
              <p className="text-dark-grey font-body mt-1">Total Redemptions</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
              <p className="text-2xl font-heading font-bold text-blue-500">
                {coupons.filter(c => new Date(c.expiryDate) > new Date()).length}
              </p>
              <p className="text-dark-grey font-body mt-1">Valid Coupons</p>
            </div>
          </div>

          {/* Add Coupon Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-heading font-bold text-dark-text">
              Coupon Codes
            </h2>
            <button
              onClick={() => setShowCouponForm(true)}
              className="bg-rose-500 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors"
            >
              + Create Coupon
            </button>
          </div>

          {/* Coupons List */}
          <div className="bg-white rounded-xl shadow-sm border border-light-grey overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light-grey border-b border-light-grey">
                  <tr>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">Coupon Code</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">Discount</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">Usage</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">Expiry</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">Status</th>
                    <th className="text-left py-4 px-6 font-heading font-semibold text-dark-text">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-grey">
                  {coupons.map((coupon) => (
                    <tr key={coupon.id} className="hover:bg-rose-50 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-heading font-bold text-dark-text text-lg">{coupon.code}</p>
                          <p className="text-dark-grey font-body text-sm">
                            Min order: ₹{coupon.minOrder}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <p className="font-heading font-bold text-dark-text">
                            {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`} OFF
                          </p>
                          {coupon.maxDiscount > 0 && (
                            <p className="text-dark-grey font-body text-sm">
                              Max ₹{coupon.maxDiscount}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <p className="font-body text-dark-text">
                            {coupon.usedCount} / {coupon.usageLimit} used
                          </p>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-body text-dark-text">
                          {new Date(coupon.expiryDate).toLocaleDateString('en-IN')}
                        </p>
                        <p className={`text-xs font-body ${
                          new Date(coupon.expiryDate) < new Date() 
                            ? 'text-red-500' 
                            : 'text-green-500'
                        }`}>
                          {new Date(coupon.expiryDate) < new Date() ? 'Expired' : 'Valid'}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleCouponStatus(coupon.id)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body ${
                            coupon.status === 'active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {coupon.status}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => deleteCoupon(coupon.id)}
                          className="text-red-500 hover:text-red-600 font-body font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Coupon Form */}
          {showCouponForm && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
              <h2 className="text-xl font-heading font-bold text-dark-text mb-6">Create New Coupon</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">Coupon Code</label>
                  <input
                    type="text"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g., WELCOME20"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">Discount Type</label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({...newCoupon, discountType: e.target.value as 'percentage' | 'fixed'})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="percentage">Percentage %</option>
                    <option value="fixed">Fixed Amount ₹</option>
                  </select>
                </div>
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">
                    {newCoupon.discountType === 'percentage' ? 'Discount %' : 'Discount Amount (₹)'}
                  </label>
                  <input
                    type="number"
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({...newCoupon, discountValue: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder={newCoupon.discountType === 'percentage' ? '20' : '500'}
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">Minimum Order (₹)</label>
                  <input
                    type="number"
                    value={newCoupon.minOrder}
                    onChange={(e) => setNewCoupon({...newCoupon, minOrder: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">Maximum Discount (₹)</label>
                  <input
                    type="number"
                    value={newCoupon.maxDiscount}
                    onChange={(e) => setNewCoupon({...newCoupon, maxDiscount: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">Usage Limit</label>
                  <input
                    type="number"
                    value={newCoupon.usageLimit}
                    onChange={(e) => setNewCoupon({...newCoupon, usageLimit: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                    placeholder="100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-dark-text font-body font-medium mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={newCoupon.expiryDate}
                    onChange={(e) => setNewCoupon({...newCoupon, expiryDate: e.target.value})}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={addCoupon}
                  className="bg-rose-500 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-rose-600"
                >
                  Create Coupon
                </button>
                <button
                  onClick={() => setShowCouponForm(false)}
                  className="border border-light-grey text-dark-text px-6 py-2 rounded-lg font-body font-medium hover:bg-light-grey"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}