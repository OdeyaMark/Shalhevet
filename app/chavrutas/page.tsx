'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Mail, Trash2, Plus } from 'lucide-react';
import ExpandableDetails from '../ExpandableDetails'; // Import the ExpandableDetails component

// Separate component for the expandable details

enum Status {
  Active = 'Active',
  Pending = 'Pending',
  Completed = 'Completed',
};

const ContactsTable = () => {
  const [expandedRows, setExpandedRows] = useState(new Set([0])); // First row expanded by default
  const [contacts, setContacts] = useState([
    {
      id: 0,
      israeliParticipantName: 'רחל הרשברג',
      diasporaParticipantName: 'Talia Wacks',
      creationDate: '22/07/2025',
      track: 'Technology',
      status: 'Active',
      israeliParticipant: {
        name: 'רחל הרשברג',
        email: 'rachelhershberg@gmail.com',
        phone: '972-545737224+',
        location: 'Israel'
      },
      diasporaParticipant: {
        name: 'Talia Wacks',
        email: 'talia2610@gmail.com',
        phone: '44-7709628270+',
        location: 'United Kingdom'
      }
    },
    {
      id: 1,
      israeliParticipantName: 'נתן אדינאוש',
      diasporaParticipantName: 'Steven Hoffman',
      creationDate: '17/07/2025',
      track: 'Business',
      status: 'Pending',
      israeliParticipant: {
        name: 'נתן אדינאוש',
        email: 'natan.adinov@gmail.com',
        phone: '972-50-123-4567',
        location: 'Tel Aviv, Israel'
      },
      diasporaParticipant: {
        name: 'Steven Hoffman',
        email: 'steven.hoffman@gmail.com',
        phone: '1-555-123-4567',
        location: 'New York, USA'
      }
    },
    {
      id: 2,
      israeliParticipantName: 'שלמה סופר',
      diasporaParticipantName: 'David Sussman',
      creationDate: '09/06/2025',
      track: 'Academic',
      status: 'Completed',
      israeliParticipant: {
        name: 'שלמה סופר',
        email: 'shlomo.sofer@gmail.com',
        phone: '972-54-987-6543',
        location: 'Jerusalem, Israel'
      },
      diasporaParticipant: {
        name: 'David Sussman',
        email: 'david.sussman@gmail.com',
        phone: '1-416-555-0123',
        location: 'Toronto, Canada'
      }
    }
  ]);

  const toggleRow = (id:number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleDelete = (id:number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    const newExpanded = new Set(expandedRows);
    newExpanded.delete(id);
    setExpandedRows(newExpanded);
  };

//   const handleEmail = (contact) => {
//     // Handle email functionality
//     console.log('Sending email to:', contact);
//   };

  const getStatusColor = (status:Status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Participant Matches</h1>
            <div className="flex gap-4">
              <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                <option>All Tracks</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Academic</option>
              </select>
              <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
              <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                <option>All Participants</option>
              </select>
              <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Israeli Participant</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Diaspora Participant</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Creation Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Track</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <React.Fragment key={contact.id}>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button 
                            className="text-teal-600 hover:text-teal-800"
                            onClick={() => console.log(`Sending email to ${contact.israeliParticipant.name} and ${contact.diasporaParticipant.name}`)}
                            title="Send Email"
                          >
                            <Mail size={16} />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800" 
                            onClick={() => handleDelete(contact.id)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900" dir="auto">
                        {contact.israeliParticipant.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {contact.diasporaParticipant.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {contact.creationDate}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {contact.track}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button onClick={() => toggleRow(contact.id)}>
                          {expandedRows.has(contact.id) ? 
                            <ChevronDown size={16} className="text-gray-600" /> : 
                            <ChevronRight size={16} className="text-gray-600" />
                          }
                        </button>
                      </td>
                    </tr>
                    
                    {expandedRows.has(contact.id) && (
                      <ExpandableDetails contact1={contact.israeliParticipant} contact2 = {contact.diasporaParticipant} />
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
            <div className="text-sm text-gray-600">
              10 records, 49 total
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-100">‹</button>
              <button className="px-3 py-1 text-sm border rounded bg-teal-600 text-white">1</button>
              <span className="text-sm">...</span>
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-100">5</button>
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-100">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsTable;