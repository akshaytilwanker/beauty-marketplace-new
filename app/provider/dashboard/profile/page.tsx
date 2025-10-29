'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const businessCategories = [
    'Beauty Salon',
    'Hair Salon', 
    'Nail Parlor',
    'Spa Center',
    'Bridal Services',
    'Makeup Studio',
    'Massage Center',
    'Mehndi Artist',
    'Individual Beautician',
    'Barber Shop',
    'Skin Clinic',
    'Other'
  ];

  const [businessProfile, setBusinessProfile] = useState({
    businessName: 'Glamour Beauty Studio',
    businessCategory: 'Beauty Salon',
    businessEmail: 'contact@glamourstudio.com',
    businessPhone: '+91 98765 43210',
    businessAddress: '123 Beauty Street, Bandra West, Mumbai, Maharashtra 400050',
    businessDescription: 'Premium beauty services with certified professionals',
    establishedYear: '2018',
    employeeCount: '5-10',
    website: 'https://glamourstudio.com',
    instagram: '@glamourstudio',
    facebook: 'Glamour Beauty Studio',
    latitude: '19.0596',
    longitude: '72.8295'
  });

  const [personalInfo, setPersonalInfo] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    role: 'Owner & Head Stylist'
  });

  const [businessImages, setBusinessImages] = useState([
    { id: 1, url: '/api/placeholder/300/200', type: 'profile', isPrimary: true },
    { id: 2, url: '/api/placeholder/300/200', type: 'gallery', isPrimary: false },
    { id: 3, url: '/api/placeholder/300/200', type: 'gallery', isPrimary: false },
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (businessImages.length >= 4) {
        alert('Maximum 4 images allowed. Please remove an existing image to add a new one.');
        return;
      }
      
      const newImage = {
        id: Date.now(),
        url: URL.createObjectURL(files[0]),
        type: 'gallery',
        isPrimary: false
      };
      setBusinessImages([...businessImages, newImage]);
    }
  };

  const setPrimaryImage = (id: number) => {
    setBusinessImages(businessImages.map(img => ({
      ...img,
      isPrimary: img.id === id
    })));
  };

  const removeImage = (id: number) => {
    setBusinessImages(businessImages.filter(img => img.id !== id));
  };

  const handleAddressChange = (address: string) => {
    setBusinessProfile({...businessProfile, businessAddress: address});
  };

  const getGoogleMapsUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessProfile.businessAddress)}`;
  };

  const getLocationShareText = () => {
    return `📍 *${businessProfile.businessName}*\n🏢 ${businessProfile.businessCategory}\n📞 ${businessProfile.businessPhone}\n\n${businessProfile.businessAddress}\n\n🗺️ Get Directions`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark-text">
          Business Profile
        </h1>
        <p className="text-dark-grey font-body mt-1">
          Manage your business information, images, and location
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Business Images */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
              Business Images
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {businessImages.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-video bg-light-grey rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center">
                      <span className="text-2xl">🏢</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                    {image.isPrimary ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-body">
                        Primary
                      </span>
                    ) : (
                      <button
                        onClick={() => setPrimaryImage(image.id)}
                        className="bg-white text-dark-text px-2 py-1 rounded text-xs font-body hover:bg-gray-100"
                      >
                        Set Primary
                      </button>
                    )}
                    <button
                      onClick={() => removeImage(image.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs font-body hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              
              <label className="aspect-video border-2 border-dashed border-light-grey rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-rose-300 hover:bg-rose-50 transition-colors">
                <span className="text-3xl text-rose-400 mb-2">+</span>
                <span className="text-dark-grey font-body text-sm text-center">
                  Add Image ({4 - businessImages.length} remaining)<br />
                  <span className="text-xs">Max 4 images • 5MB each</span>
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-sm text-dark-grey font-body">
              <p>💡 <strong>Image Tips:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Set a clear profile picture as primary</li>
                <li>Add photos of your workspace and services</li>
                <li>Show before/after results (with client permission)</li>
                <li>Include team photos to build trust</li>
              </ul>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
              Business Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-dark-text font-body font-medium mb-2">
                  Business Name *
                </label>
                <input 
                  type="text" 
                  value={businessProfile.businessName}
                  onChange={(e) => setBusinessProfile({...businessProfile, businessName: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Your business name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-dark-text font-body font-medium mb-2">
                  Business Category *
                </label>
                <select
                  value={businessProfile.businessCategory}
                  onChange={(e) => setBusinessProfile({...businessProfile, businessCategory: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  {businessCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-dark-text font-body font-medium mb-2">
                  Business Address *
                </label>
                <input 
                  type="text" 
                  value={businessProfile.businessAddress}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Full business address for Google Maps"
                />
                <p className="text-dark-grey font-body text-sm mt-1">
                  This address will be shared with customers for directions via Google Maps
                </p>
              </div>
              
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Business Email *
                </label>
                <input 
                  type="email" 
                  value={businessProfile.businessEmail}
                  onChange={(e) => setBusinessProfile({...businessProfile, businessEmail: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="business@email.com"
                />
              </div>
              
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Business Phone *
                </label>
                <input 
                  type="tel" 
                  value={businessProfile.businessPhone}
                  onChange={(e) => setBusinessProfile({...businessProfile, businessPhone: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Established Year
                </label>
                <input 
                  type="number" 
                  value={businessProfile.establishedYear}
                  onChange={(e) => setBusinessProfile({...businessProfile, establishedYear: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="2018"
                  min="1900"
                  max="2024"
                />
              </div>

              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Team Size
                </label>
                <select
                  value={businessProfile.employeeCount}
                  onChange={(e) => setBusinessProfile({...businessProfile, employeeCount: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="1-5">1-5 employees</option>
                  <option value="5-10">5-10 employees</option>
                  <option value="10-20">10-20 employees</option>
                  <option value="20+">20+ employees</option>
                  <option value="Solo">Solo Practitioner</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-dark-text font-body font-medium mb-2">
                  Business Description
                </label>
                <textarea
                  value={businessProfile.businessDescription}
                  onChange={(e) => setBusinessProfile({...businessProfile, businessDescription: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Describe your business, specialties, and what makes you unique..."
                />
              </div>

              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Website
                </label>
                <input 
                  type="url" 
                  value={businessProfile.website}
                  onChange={(e) => setBusinessProfile({...businessProfile, website: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Instagram
                </label>
                <input 
                  type="text" 
                  value={businessProfile.instagram}
                  onChange={(e) => setBusinessProfile({...businessProfile, instagram: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="@username"
                />
              </div>
            </div>
            
            <button className="mt-6 bg-rose-500 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors">
              Save Business Profile
            </button>
          </div>

          {/* Location Preview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
              Location & Directions
            </h2>
            
            <div className="bg-light-grey rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🗺️</span>
                  <div>
                    <p className="font-body text-dark-text font-semibold">Find me on Google Maps</p>
                    <p className="text-dark-grey font-body text-sm">One-click directions for customers</p>
                  </div>
                </div>
                <a 
                  href={getGoogleMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-rose-500 text-white px-4 py-2 rounded text-sm font-body hover:bg-rose-600 transition-colors whitespace-nowrap"
                >
                  Test Link
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-dark-text">Location Sharing Preview</h3>
              <div className="bg-rose-50 rounded-lg p-4 border border-rose-200">
                <p className="font-body text-dark-text whitespace-pre-line">
                  {getLocationShareText()}
                </p>
                <p className="text-dark-grey font-body text-sm mt-2">
                  This will be automatically sent to customers with their booking confirmation
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Your Name *
                </label>
                <input 
                  type="text" 
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Your Role
                </label>
                <input 
                  type="text" 
                  value={personalInfo.role}
                  onChange={(e) => setPersonalInfo({...personalInfo, role: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Owner, Manager, Stylist, etc."
                />
              </div>
              
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Email *
                </label>
                <input 
                  type="email" 
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Phone *
                </label>
                <input 
                  type="tel" 
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button className="mt-6 bg-rose-500 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors">
              Save Personal Info
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
            {businessImages.find(img => img.isPrimary) ? (
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🏢</span>
              </div>
            ) : (
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">📸</span>
              </div>
            )}
            <h3 className="font-heading font-bold text-dark-text">{businessProfile.businessName}</h3>
            <p className="text-dark-grey font-body text-sm mt-1">{businessProfile.businessCategory}</p>
            <div className="mt-4 p-3 bg-rose-50 rounded-lg">
              <p className="text-rose-500 font-body text-sm font-medium">Business Verified</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-rose-500 rounded-xl p-6 text-white">
            <h3 className="font-heading font-bold text-lg mb-4">Business Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Category</span>
                <span className="font-bold">{businessProfile.businessCategory}</span>
              </div>
              <div className="flex justify-between">
                <span>Established</span>
                <span className="font-bold">{businessProfile.establishedYear}</span>
              </div>
              <div className="flex justify-between">
                <span>Team Size</span>
                <span className="font-bold">{businessProfile.employeeCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span className="font-bold">Mumbai</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h3 className="font-heading font-bold text-dark-text mb-3">Gallery Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-dark-grey font-body">Total Images</span>
                <span className="font-heading font-bold text-rose-500">{businessImages.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-grey font-body">Primary Set</span>
                <span className="font-heading font-bold text-green-500">
                  {businessImages.filter(img => img.isPrimary).length > 0 ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h3 className="font-heading font-bold text-dark-text mb-3">Location Features</h3>
            <ul className="space-y-2 text-dark-grey font-body text-sm">
              <li className="flex items-center">
                <span className="text-rose-500 mr-2">📍</span>
                Google Maps integration
              </li>
              <li className="flex items-center">
                <span className="text-rose-500 mr-2">🚗</span>
                One-click directions
              </li>
              <li className="flex items-center">
                <span className="text-rose-500 mr-2">📱</span>
                Auto-share with bookings
              </li>
              <li className="flex items-center">
                <span className="text-rose-500 mr-2">💰</span>
                No API costs
              </li>
              <li className="flex items-center">
                <span className="text-rose-500 mr-2">⭐</span>
                Better local discovery
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}