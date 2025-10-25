import React, { useState } from 'react';

const PeerSupport = () => {
  const [activeTab, setActiveTab] = useState('find');

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Peer Support Network</h2>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('find')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'find' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Find Peers
        </button>
        <button
          onClick={() => setActiveTab('chats')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'chats' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          My Chats
        </button>
      </div>

      {activeTab === 'find' ? (
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold">Alex</h3>
            <p className="text-sm text-gray-600">Interests: Anxiety, Study Stress</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
              Start Chat
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold">Sam</h3>
            <p className="text-sm text-gray-600">Interests: Depression, Mindfulness</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
              Start Chat
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No active chats yet
        </div>
      )}
    </div>
  );
};

export default PeerSupport;