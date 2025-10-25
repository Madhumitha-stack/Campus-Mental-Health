import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, Star } from 'lucide-react';

const SafeSpacesMap = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSpace, setSelectedSpace] = useState(null);

  const categories = [
    { id: 'all', name: 'All Spaces' },
    { id: 'counseling', name: 'Counseling Centers' },
    { id: 'quiet', name: 'Quiet Zones' },
    { id: 'recreation', name: 'Recreation' },
    { id: 'academic', name: 'Academic Support' },
  ];

  const safeSpaces = [
    {
      id: 1,
      name: 'Campus Counseling Center',
      category: 'counseling',
      description: 'Professional mental health services and support',
      location: 'Student Services Building, Room 201',
      hours: 'Mon-Fri 8:00 AM - 6:00 PM',
      phone: '(555) 123-4567',
      rating: 4.8,
      features: ['Individual Therapy', 'Group Sessions', 'Crisis Support', 'Workshops'],
      emergency: true,
      coordinates: { x: 35, y: 60 }
    },
    {
      id: 2,
      name: 'Mindfulness Garden',
      category: 'quiet',
      description: 'Peaceful outdoor space for meditation and reflection',
      location: 'Between Library and Science Building',
      hours: '24/7',
      phone: null,
      rating: 4.9,
      features: ['Outdoor Seating', 'Quiet Zone', 'Nature Sounds', 'Meditation Path'],
      emergency: false,
      coordinates: { x: 60, y: 30 }
    },
    {
      id: 3,
      name: 'Student Recreation Center',
      category: 'recreation',
      description: 'Fitness facilities and wellness activities',
      location: 'Recreation Building',
      hours: 'Mon-Fri 5:00 AM - 11:00 PM, Weekends 7:00 AM - 9:00 PM',
      phone: '(555) 123-4568',
      rating: 4.7,
      features: ['Yoga Classes', 'Meditation Room', 'Fitness Center', 'Sports'],
      emergency: false,
      coordinates: { x: 75, y: 70 }
    },
    {
      id: 4,
      name: '24/7 Study Lounge',
      category: 'quiet',
      description: 'Comfortable study space with mental health resources',
      location: 'Library Basement',
      hours: '24/7',
      phone: '(555) 123-4569',
      rating: 4.5,
      features: ['Comfortable Seating', 'Tea & Coffee', 'Resource Library', 'Peer Support'],
      emergency: false,
      coordinates: { x: 25, y: 40 }
    },
    {
      id: 5,
      name: 'Academic Success Center',
      category: 'academic',
      description: 'Support for academic stress and time management',
      location: 'Learning Commons, Room 105',
      hours: 'Mon-Thu 9:00 AM - 7:00 PM, Fri 9:00 AM - 5:00 PM',
      phone: '(555) 123-4570',
      rating: 4.6,
      features: ['Tutoring', 'Study Skills', 'Time Management', 'Stress Workshops'],
      emergency: false,
      coordinates: { x: 50, y: 50 }
    }
  ];

  const filteredSpaces = selectedCategory === 'all' 
    ? safeSpaces 
    : safeSpaces.filter(space => space.category === selectedCategory);

  const getDirections = (space) => {
    alert(`Getting directions to ${space.name}. This would open campus maps in a real application.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
          <MapPin className="w-8 h-8 mr-3 text-primary-600" />
          Campus Safe Spaces
        </h1>
        <p className="text-gray-600 mt-2">
          Discover supportive environments across campus for your mental wellbeing
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Campus Map Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campus Map</h3>
            
            {/* Simplified Map Visualization */}
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 border-2 border-gray-300">
              {/* Map landmarks */}
              <div className="absolute top-10 left-20 bg-yellow-200 px-3 py-1 rounded text-sm font-medium">
                Library
              </div>
              <div className="absolute top-40 left-60 bg-red-200 px-3 py-1 rounded text-sm font-medium">
                Student Center
              </div>
              <div className="absolute top-60 left-30 bg-green-200 px-3 py-1 rounded text-sm font-medium">
                Science Building
              </div>
              
              {/* Safe Space markers */}
              {safeSpaces.map((space) => (
                <button
                  key={space.id}
                  onClick={() => setSelectedSpace(space)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 ${
                    selectedSpace?.id === space.id ? 'scale-110 z-10' : ''
                  }`}
                  style={{ left: `${space.coordinates.x}%`, top: `${space.coordinates.y}%` }}
                >
                  <div className={`p-2 rounded-full shadow-lg ${
                    space.emergency 
                      ? 'bg-red-500 text-white' 
                      : 'bg-primary-500 text-white'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className={`text-xs font-medium mt-1 px-2 py-1 rounded ${
                    selectedSpace?.id === space.id 
                      ? 'bg-white text-gray-900 shadow-md' 
                      : 'bg-transparent'
                  }`}>
                    {space.name}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                <span>Safe Space</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Emergency Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Space Details */}
        <div className="space-y-4">
          {selectedSpace ? (
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedSpace.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{selectedSpace.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{selectedSpace.description}</p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{selectedSpace.location}</span>
                </div>

                <div className="flex items-center text-sm text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{selectedSpace.hours}</span>
                </div>

                {selectedSpace.phone && (
                  <div className="flex items-center text-sm text-gray-700">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{selectedSpace.phone}</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSpace.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Emergency Notice */}
              {selectedSpace.emergency && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">
                    Emergency mental health services available
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => getDirections(selectedSpace)}
                  className="w-full flex items-center justify-center btn-primary"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </button>
                {selectedSpace.phone && (
                  <button
                    onClick={() => window.open(`tel:${selectedSpace.phone}`, '_self')}
                    className="w-full flex items-center justify-center btn-secondary"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select a Location
              </h3>
              <p className="text-gray-600">
                Click on a map marker to see details about a safe space
              </p>
            </div>
          )}

          {/* Quick Access */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Access</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Nearest Quiet Space</div>
                <div className="text-sm text-gray-600">Find the closest available quiet zone</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Emergency Counseling</div>
                <div className="text-sm text-gray-600">Immediate mental health support</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">After-Hours Support</div>
                <div className="text-sm text-gray-600">24/7 available resources</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeSpacesMap;