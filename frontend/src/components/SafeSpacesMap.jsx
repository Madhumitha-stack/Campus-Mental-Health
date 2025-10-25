import React, { useState } from 'react';

const SafeSpacesMap = () => {
  const [selectedSpace, setSelectedSpace] = useState(null);

  const safeSpaces = [
    {
      id: 1,
      name: 'Wellness Center',
      type: 'Counseling',
      occupancy: 'Low'
    },
    {
      id: 2,
      name: 'Library Quiet Zone',
      type: 'Study',
      occupancy: 'Medium'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Campus Safe Spaces</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {safeSpaces.map(space => (
            <div
              key={space.id}
              className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300"
              onClick={() => setSelectedSpace(space)}
            >
              <h3 className="font-semibold">{space.name}</h3>
              <p className="text-sm text-gray-600">{space.type}</p>
              <span className={`px-2 py-1 rounded-full text-xs ${
                space.occupancy === 'Low' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {space.occupancy} Occupancy
              </span>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-100 rounded-lg flex items-center justify-center">
          {selectedSpace ? (
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold">{selectedSpace.name}</h3>
              <p className="text-gray-600">{selectedSpace.type}</p>
            </div>
          ) : (
            <p className="text-gray-500">Select a space to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafeSpacesMap;