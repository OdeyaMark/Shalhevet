'use client';
import React, { useState, useEffect } from 'react';
import { Search, User,Contact, Phone } from 'lucide-react';

// Types
interface User {
  id: number;
  name: string;
  country: string;
  phone: string;
  email: string;
  learningTracks: string[];
  teachingTracks: string[];
}

interface PairingMatch {
  user: User;
  matchPercentage: number;
  commonLearningTracks: string[];
  commonTeachingTracks: string[];
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: "Sarah Baumol",
    country: "United States",
    phone: "+1-555-0123",
    email: "sarah.baumol@email.com",
    learningTracks: ["React", "TypeScript"],
    teachingTracks: ["HTML", "CSS"]
  },
  {
    id: 2,
    name: "Hai Gur",
    country: "Israel",
    phone: "+972-50-1234567",
    email: "hai.gur@email.com",
    learningTracks: ["Node.js", "Python"],
    teachingTracks: ["JavaScript", "React"]
  },
  {
    id: 3,
    name: "Elazar Lifshitz",
    country: "Israel",
    phone: "+972-54-2345678",
    email: "elazar.lifshitz@email.com",
    learningTracks: ["Machine Learning", "AI"],
    teachingTracks: ["Python", "Data Science"]
  },
  {
    id: 4,
    name: "Tamir Palant",
    country: "Israel",
    phone: "+972-52-3456789",
    email: "tamir.palant@email.com",
    learningTracks: ["Flutter", "Dart"],
    teachingTracks: ["Mobile Development", "UI/UX"]
  },
  {
    id: 5,
    name: "Yoel Ben-Avraham",
    country: "Israel",
    phone: "+972-58-4567890",
    email: "yoel.benavraham@email.com",
    learningTracks: ["DevOps", "AWS"],
    teachingTracks: ["Docker", "Kubernetes"]
  },
  {
    id: 6,
    name: "Eli Engel",
    country: "Israel",
    phone: "+972-53-5678901",
    email: "eli.engel@email.com",
    learningTracks: ["GraphQL", "Apollo"],
    teachingTracks: ["Node.js", "Express"]
  },
  {
    id: 7,
    name: "Ohr Herskovitz",
    country: "Israel",
    phone: "+972-55-6789012",
    email: "ohr.herskovitz@email.com",
    learningTracks: ["Vue.js", "Nuxt"],
    teachingTracks: ["JavaScript", "Frontend"]
  },
  {
    id: 8,
    name: "Avi Weitzmann",
    country: "Israel",
    phone: "+972-50-7890123",
    email: "avi.weitzmann@email.com",
    learningTracks: ["Blockchain", "Solidity"],
    teachingTracks: ["Web3", "Smart Contracts"]
  }
];

const UserPairingPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(sampleUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pairingMatches, setPairingMatches] = useState<PairingMatch[]>([]);
  const [showContactInfo, setShowContactInfo] = useState<number | null>(null);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  // Handle contact icon click
  const handleContactClick = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation(); // Prevent user selection when clicking contact icon
    setShowContactInfo(showContactInfo === userId ? null : userId);
  };

  // Get contact icon based on type
  const getContactIcon = () => {
    return <Contact className="w-5 h-5 text-blue-600 hover:text-blue-700 cursor-pointer" />;
  };

  // Handle user selection for pairing
  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    // TODO: Implement pairing logic here
    // For now, we'll show empty matches as requested
    setPairingMatches([]);
  };

  // Handle pair action
  const handlePair = (matchedUser: User) => {
    // TODO: Implement pairing action
    console.log(`Pairing ${selectedUser?.name} with ${matchedUser.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">User Pairing</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Archives
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Pending Matches
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700">
              Automate
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* User List Panel */}
        <div className="flex-shrink-0 bg-white border-r border-gray-200" style={{ minWidth: 'fit-content' }}>
          <div className="p-4 border-b border-gray-200" style={{ width: '400px' }}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-full" style={{ width: '400px' }}>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {filteredUsers.length} Available Users
              </h2>
              
              <div className="space-y-3">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="relative">
                    <div
                      onClick={() => handleUserSelect(user)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedUser?.id === user.id
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="flex-shrink-0"
                            onClick={(e) => handleContactClick(e, user.id)}
                          >
                            {getContactIcon()}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {user.name}
                            </h3>
                            <p className="text-sm text-gray-500">{user.country}</p>
                          </div>
                        </div>
                        <button className="px-3 py-1 text-xs font-medium text-white bg-teal-600 rounded hover:bg-teal-700">
                          View
                        </button>
                      </div>
                    </div>
                    
                    {/* Contact Info Popup */}
                    {showContactInfo === user.id && (
                      <div className="absolute top-full left-4 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10 min-w-max">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-900">{user.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-900">{user.email}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pairing Panel */}
        <div className="flex-1 bg-gray-50">
          {selectedUser ? (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Pairing options for {selectedUser.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Find the perfect learning partner based on skills and interests
                </p>
              </div>

              {pairingMatches.length === 0 ? (
                <div className="text-center py-12">
                  <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No matches yet
                  </h3>
                  <p className="text-gray-600">
                    Pairing logic will be implemented here to show potential matches
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pairingMatches.map((match, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {getContactIcon()}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {match.user.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {match.user.country}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-teal-600">
                            {match.matchPercentage}%
                          </div>
                          <div className="text-xs text-gray-500">Match</div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="text-xs text-gray-600 mb-1">
                          Learning Tracks:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {match.commonLearningTracks.map((track, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {track}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-gray-600 mb-1">
                          Teaching Tracks:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {match.commonTeachingTracks.map((track, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800"
                            >
                              {track}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handlePair(match.user)}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        Pair
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a user to view pairing options
                </h3>
                <p className="text-gray-600">
                  Choose a user from the list to see potential matches
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPairingPage;