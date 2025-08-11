'use client'
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Settings,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  User
} from 'lucide-react';


// Mock data structure similar to what you'd get from Wix CMS

const mockUsers = [
  {
    id: 1,
    name: 'Noah Morris',
    email: 'noah.morris@email.com',
    phone: '+1-555-0123',
    location: 'United States - EST',
    joinDate: '11/02/2024',
    chavruta: true,
    avatar: null,
  },
  {
    id: 2,
    name: 'Debbie Stein',
    email: 'debbie.stein@email.com',
    phone: '+1-555-0124',
    location: 'United States - PST',
    joinDate: '31/01/2024',
    chavruta: false,
    avatar: null,
  },
  {
    id: 3,
    name: 'Debbie Stein',
    email: 'debbie.stein2@email.com',
    phone: '+1-555-0125',
    location: 'United States - PST',
    joinDate: '31/01/2024',
    chavruta: false,
    avatar: null,
  },
  {
    id: 4,
    name: 'Noga Shalev',
    email: 'noga.shalev@email.com',
    phone: '+972-50-123-4567',
    location: 'Israel',
    joinDate: '31/12/2023',
    chavruta: true,
    avatar: null,
  },
  {
    id: 5,
    name: 'Shoshana Shamberg',
    email: 'shoshana.s@email.com',
    phone: '+1-555-0126',
    location: 'United States - EST',
    joinDate: '17/12/2023',
    chavruta: true,
    avatar: null,
  },
  {
    id: 6,
    name: 'Zed Baron',
    email: 'zed.baron@email.com',
    phone: '+972-52-987-6543',
    location: 'Israel',
    joinDate: '04/12/2023',
    chavruta: false,
    avatar: null,
  }
];

type User = typeof mockUsers[0]

const UsersDashboard = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [chavrutaFilter, setChavrutaFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [popupType, setPopupType] = useState(null);

  // Get unique years from join dates
  const getAvailableYears = () => {
    const years = mockUsers.map(user => {
      const dateParts = user.joinDate.split('/');
      return dateParts[2]; // Year is the third part
    });
    return [...new Set(years)].sort((a, b) => Number(b) - Number(a)); // Sort descending
  };

  // Filter and search logic
  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChavruta = chavrutaFilter === 'all' || 
                             (chavrutaFilter === 'yes' && user.chavruta) ||
                             (chavrutaFilter === 'no' && !user.chavruta);
      const matchesLocation = locationFilter === 'all' || user.location.includes(locationFilter);
      const matchesYear = yearFilter === 'all' || user.joinDate.endsWith(yearFilter);
      
      return matchesSearch && matchesChavruta && matchesLocation && matchesYear;
    });
    
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, searchTerm, chavrutaFilter, locationFilter, yearFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);


  const openPopup = (user:User) => {
    console.log('Opening popup for user:', user, 'Type:', type);
    setSelectedUser(user);
    setPopupType(type);
  };

  const closePopup = () => {
    setSelectedUser(null);
    setPopupType(null);
  };

  const handleUserAction = (action:string) => {
    if (selectedUser) {
      console.log(`Performing ${action} on user:`, selectedUser);
      // Here you would integrate with your Wix CMS API
      closePopup();
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
            <p className="text-gray-600">Manage your users and their permissions</p>
          </div> 
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white mx-6 mt-6 p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Chavruta Filter */}
          <select 
            value={chavrutaFilter}
            onChange={(e) => setChavrutaFilter(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Users</option>
            <option value="yes">Has Chavruta</option>
            <option value="no">No Chavruta</option>
          </select>

          {/* Location Filter */}
          <select 
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Locations</option>
            <option value="United States">United States</option>
            <option value="Israel">Israel</option>
          </select>

          {/* Year Filter */}
          <select 
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Years</option>
            {getAvailableYears().map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="mx-6 mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Contact</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Location</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Join Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Chavruta</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div className="text-gray-900">{user.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{user.location}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{user.joinDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      {user.chavruta ? (
                        <Check className={`w-5 h-5 text-green-600`} />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openPopup(user, 'view')}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openPopup(user, 'edit')}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        title="Edit User"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openPopup(user, 'email')}
                        className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openPopup(user, 'settings')}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                        title="User Settings"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openPopup(user, 'delete')}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className="flex items-center space-x-2">
            <select 
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 text-sm">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {popupType === 'view' && selectedUser && (
        <DetailsPopup user={selectedUser} onClose={closePopup} />
      )}
      {/* <UserProfilePopup 
        user={selectedUser} 
        onClose={closePopup} 
        type={popupType} 
        onAction={handleUserAction}
        open={popupType !== null}
      /> */}
    </div>
  );
};

export default UsersDashboard;