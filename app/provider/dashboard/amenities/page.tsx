'use client';

import { useState } from 'react';

interface Amenity {
  id: string;
  name: string;
  category: string;
  icon: string;
  selected: boolean;
  custom?: boolean;
}

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<Amenity[]>([
    // Facilities
    { id: 'ac', name: 'Air Conditioning', category: 'facilities', icon: '❄️', selected: true },
    { id: 'wifi', name: 'Free WiFi', category: 'facilities', icon: '📶', selected: true },
    { id: 'parking', name: 'Parking Available', category: 'facilities', icon: '🅿️', selected: false },
    { id: 'waiting', name: 'Waiting Area', category: 'facilities', icon: '🪑', selected: true },
    { id: 'wheelchair', name: 'Wheelchair Access', category: 'facilities', icon: '♿', selected: false },
    { id: 'changing', name: 'Changing Rooms', category: 'facilities', icon: '🚪', selected: true },
    { id: 'restroom', name: 'Restroom', category: 'facilities', icon: '🚻', selected: true },
    
    // Equipment
    { id: 'sanitized', name: 'Sanitized Tools', category: 'equipment', icon: '🧼', selected: true },
    { id: 'premium', name: 'Premium Products', category: 'equipment', icon: '⭐', selected: true },
    { id: 'modern', name: 'Modern Equipment', category: 'equipment', icon: '🔧', selected: false },
    { id: 'sterilization', name: 'Sterilization System', category: 'equipment', icon: '🦠', selected: true },
    
    // Safety
    { id: 'covid', name: 'COVID Safety', category: 'safety', icon: '😷', selected: true },
    { id: 'firstaid', name: 'First Aid Kit', category: 'safety', icon: '🩹', selected: true },
    { id: 'fire', name: 'Fire Extinguisher', category: 'safety', icon: '🧯', selected: false },
    { id: 'emergency', name: 'Emergency Exit', category: 'safety', icon: '🚨', selected: true },
    
    // Comfort
    { id: 'refreshments', name: 'Refreshments', category: 'comfort', icon: '☕', selected: false },
    { id: 'magazines', name: 'Magazines/Entertainment', category: 'comfort', icon: '📚', selected: true },
    { id: 'charging', name: 'Charging Points', category: 'comfort', icon: '🔌', selected: true },
    { id: 'music', name: 'Music System', category: 'comfort', icon: '🎵', selected: true },
  ]);

  const [customAmenity, setCustomAmenity] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const categories = [
    {
      id: 'facilities',
      name: '🏠 Facilities',
      description: 'Basic infrastructure and space amenities'
    },
    {
      id: 'equipment',
      name: '🔧 Equipment',
      description: 'Tools, products and technical equipment'
    },
    {
      id: 'safety',
      name: '🛡️ Safety',
      description: 'Safety measures and emergency facilities'
    },
    {
      id: 'comfort',
      name: '💎 Comfort',
      description: 'Additional comfort and convenience features'
    }
  ];

  const toggleAmenity = (id: string) => {
    setAmenities(prev =>
      prev.map(amenity =>
        amenity.id === id ? { ...amenity, selected: !amenity.selected } : amenity
      )
    );
  };

  const addCustomAmenity = () => {
    if (customAmenity.trim()) {
      const newAmenity: Amenity = {
        id: `custom-${Date.now()}`,
        name: customAmenity.trim(),
        category: 'custom',
        icon: '✨',
        selected: true,
        custom: true
      };
      setAmenities(prev => [...prev, newAmenity]);
      setCustomAmenity('');
      setShowCustomInput(false);
    }
  };

  const removeCustomAmenity = (id: string) => {
    setAmenities(prev => prev.filter(amenity => amenity.id !== id));
  };

  const getAmenitiesByCategory = (categoryId: string) => {
    return amenities.filter(amenity => amenity.category === categoryId);
  };

  const getCustomAmenities = () => {
    return amenities.filter(amenity => amenity.custom);
  };

  const selectedAmenities = amenities.filter(a => a.selected);
  const customAmenities = getCustomAmenities();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark-text">
          Amenities & Facilities
        </h1>
        <p className="text-dark-grey font-body mt-1">
          Showcase what makes your space special and comfortable
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pre-defined Amenities */}
          {categories.map(category => (
            <div key={category.id} className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
              <div className="flex items-start space-x-3 mb-6">
                <div className="text-2xl">{category.name.split(' ')[0]}</div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-dark-text">
                    {category.name}
                  </h2>
                  <p className="text-dark-grey font-body text-sm">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getAmenitiesByCategory(category.id).map(amenity => (
                  <label
                    key={amenity.id}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      amenity.selected
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-light-grey bg-white hover:border-rose-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={amenity.selected}
                      onChange={() => toggleAmenity(amenity.id)}
                      className="rounded border-light-grey text-rose-500 focus:ring-rose-500"
                    />
                    <span className="text-2xl">{amenity.icon}</span>
                    <span className="font-body text-dark-text flex-1">
                      {amenity.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Custom Amenities */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <div className="flex items-start space-x-3 mb-6">
              <div className="text-2xl">✨</div>
              <div>
                <h2 className="text-xl font-heading font-bold text-dark-text">
                  Custom Amenities
                </h2>
                <p className="text-dark-grey font-body text-sm">
                  Add unique features that make your business special
                </p>
              </div>
            </div>

            {/* Add Custom Amenity */}
            {showCustomInput ? (
              <div className="bg-rose-50 rounded-lg p-4 border border-rose-200 mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={customAmenity}
                    onChange={(e) => setCustomAmenity(e.target.value)}
                    placeholder="e.g., Valet Parking, Kids Play Area, Free Coffee..."
                    className="flex-1 px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addCustomAmenity()}
                  />
                  <button
                    onClick={addCustomAmenity}
                    className="bg-rose-500 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowCustomInput(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full border-2 border-dashed border-light-grey rounded-lg p-6 text-center hover:border-rose-300 hover:bg-rose-50 transition-colors mb-4"
              >
                <div className="text-2xl mb-2">+</div>
                <div className="font-body text-dark-text font-medium">
                  Add Custom Amenity
                </div>
                <div className="text-dark-grey font-body text-sm">
                  Unique features not in our list
                </div>
              </button>
            )}

            {/* Custom Amenities List */}
            {customAmenities.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-heading font-semibold text-dark-text mb-3">
                  Your Custom Amenities ({customAmenities.length})
                </h3>
                {customAmenities.map(amenity => (
                  <div
                    key={amenity.id}
                    className="flex items-center justify-between p-3 bg-rose-50 rounded-lg border border-rose-200"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{amenity.icon}</span>
                      <span className="font-body text-dark-text">
                        {amenity.name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeCustomAmenity(amenity.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h3 className="font-heading font-bold text-dark-text mb-4">
              Customer Preview
            </h3>
            
            <div className="space-y-3">
              <div className="text-center p-4 bg-gradient-to-r from-purple-500 to-rose-500 rounded-lg text-white">
                <div className="text-2xl mb-2">🏢</div>
                <div className="font-heading font-bold">Your Business</div>
                <div className="font-body text-sm opacity-90">
                  {selectedAmenities.length} amenities
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-dark-text text-sm">
                  Featured Amenities:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAmenities.slice(0, 8).map(amenity => (
                    <span
                      key={amenity.id}
                      className="inline-flex items-center space-x-1 bg-rose-100 text-rose-800 px-2 py-1 rounded text-xs font-body"
                    >
                      <span>{amenity.icon}</span>
                      <span>{amenity.name.split(' ')[0]}</span>
                    </span>
                  ))}
                  {selectedAmenities.length > 8 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-body">
                      +{selectedAmenities.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h3 className="font-heading font-bold text-dark-text mb-4">
              Amenities Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-dark-grey font-body">Total Selected</span>
                <span className="font-heading font-bold text-rose-500">
                  {selectedAmenities.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-grey font-body">Custom Added</span>
                <span className="font-heading font-bold text-purple-500">
                  {customAmenities.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-grey font-body">Categories</span>
                <span className="font-heading font-bold text-green-500">
                  {categories.length}
                </span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h3 className="font-heading font-bold text-dark-text mb-4">
              💡 Tips
            </h3>
            <ul className="space-y-2 text-dark-grey font-body text-sm">
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                Select amenities that match your actual facilities
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                Highlight unique features with custom amenities
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                Safety amenities build customer trust
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                Comfort features improve customer experience
              </li>
            </ul>
          </div>

          {/* Save Button */}
          <button className="w-full bg-rose-500 text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors">
            Save Amenities
          </button>
        </div>
      </div>
    </div>
  );
}