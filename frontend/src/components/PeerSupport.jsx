import React, { useState } from 'react';
import { Users, MessageCircle, Shield, Clock, Star } from 'lucide-react';

const PeerSupport = () => {
  const [activeTab, setActiveTab] = useState('online');

  const onlinePeers = [
    {
      id: 1,
      name: 'Alex Johnson',
      status: 'online',
      major: 'Psychology',
      year: 'Senior',
      rating: 4.8,
      skills: ['Active Listening', 'Crisis Support', 'Academic Stress'],
      available: true
    },
    {
      id: 2,
      name: 'Taylor Smith',
      status: 'online',
      major: 'Social Work',
      year: 'Graduate',
      rating: 4.9,
      skills: ['Mindfulness', 'Stress Management', 'Relationship Issues'],
      available: true
    },
    {
      id: 3,
      name: 'Jordan Lee',
      status: 'away',
      major: 'Nursing',
      year: 'Junior',
      rating: 4.7,
      skills: ['Health Anxiety', 'Time Management', 'Self-Care'],
      available: false
    }
  ];

  const supportGroups = [
    {
      id: 1,
      name: 'Anxiety Support Circle',
      members: 12,
      nextMeeting: 'Tomorrow, 6:00 PM',
      focus: 'Anxiety Management',
      facilitator: 'Dr. Maria Garcia'
    },
    {
      id: 2,
      name: 'Academic Stress Relief',
      members: 8,
      nextMeeting: 'Wednesday, 7:30 PM',
      focus: 'Study Stress',
      facilitator: 'Prof. James Wilson'
    },
    {
      id: 3,
      name: 'Mindfulness Meditation',
      members: 15,
      nextMeeting: 'Friday, 5:00 PM',
      focus: 'Meditation & Relaxation',
      facilitator: 'Yoga Instructor Kim'
    }
  ];

  const startChat = (peerId) => {
    alert(`Starting chat with peer ${peerId}. This would open a chat interface in a real application.`);
  };

  const joinGroup = (groupId) => {
    alert(`Joining group ${groupId}. This would add you to the group in a real application.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
          <Users className="w-8 h-8 mr-3 text-primary-600" />
          Peer Support Network
        </h1>
        <p className="text-gray-600 mt-2">
          Connect with trained peer supporters who understand what you're going through
        </p>
      </div>

      {/* Safety Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900">Safe & Confidential</h3>
            <p className="text-blue-700 text-sm mt-1">
              All conversations are confidential. Peer supporters are trained students 
              who can provide emotional support and connect you with professional resources when needed.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'online', name: 'Online Peers', count: onlinePeers.filter(p => p.available).length },
            { id: 'groups', name: 'Support Groups', count: supportGroups.length },
            { id: 'resources', name: 'Resources', count: 0 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              {tab.count > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Online Peers Tab */}
      {activeTab === 'online' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {onlinePeers.map((peer) => (
            <div
              key={peer.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {/* Peer Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{peer.name}</h3>
                  <p className="text-sm text-gray-600">{peer.major} • {peer.year}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{peer.rating}</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center mb-3">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    peer.available
                      ? 'bg-green-500'
                      : 'bg-yellow-500'
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {peer.available ? 'Available now' : 'Away'}
                </span>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Support Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {peer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => startChat(peer.id)}
                disabled={!peer.available}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Support Groups Tab */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          {supportGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{group.name}</h3>
                  <p className="text-gray-600 mt-1">{group.focus}</p>
                  
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {group.members} members
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {group.nextMeeting}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-2">
                    Facilitated by: {group.facilitator}
                  </p>
                </div>
                
                <button
                  onClick={() => joinGroup(group.id)}
                  className="btn-primary ml-4"
                >
                  Join Group
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-lg p-6 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Peer Support Resources
          </h3>
          <p className="text-gray-600 mb-4">
            Training materials, guidelines, and resources for peer supporters
          </p>
          <div className="space-y-3 max-w-md mx-auto">
            <button className="w-full btn-secondary">
              Peer Support Training Guide
            </button>
            <button className="w-full btn-secondary">
              Crisis Intervention Protocol
            </button>
            <button className="w-full btn-secondary">
              Self-Care Resources
            </button>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>
          Peer supporters are trained students, not licensed professionals. 
          For immediate crisis support, please use the SOS button or contact emergency services.
        </p>
      </div>
    </div>
  );
};

export default PeerSupport;