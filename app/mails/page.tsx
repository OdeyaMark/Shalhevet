'use client';
import React, { useState, useEffect } from 'react';
import { Search, Check, X, RotateCcw, Mail, ChevronLeft } from 'lucide-react';

// Types
interface Email {
  id: number;
  date: string;
  time: string;
  subject: string;
  destination: string;
  isReceived: boolean;
  content: string;
  sendTimestamp: Date;
}

// Sample email data
const sampleEmails: Email[] = [
  {
    id: 1,
    date: "17/11/2022",
    time: "11:57",
    subject: "Shalhevet Learning Program",
    destination: "sarah.baumol@email.com",
    isReceived: true,
    content: "Dear Sarah,\n\nWe are excited to inform you about the Shalhevet Learning Program. This comprehensive program offers excellent opportunities for skill development and knowledge sharing.\n\nThe program includes:\n- Interactive learning sessions\n- Peer-to-peer collaboration\n- Expert mentorship\n- Practical projects\n\nPlease confirm your participation by replying to this email.\n\nBest regards,\nThe Shalhevet Team",
    sendTimestamp: new Date("2022-11-17T11:57:00")
  },
  {
    id: 2,
    date: "17/11/2022",
    time: "11:58",
    subject: "Shalhevet Learning Program",
    destination: "hai.gur@email.com",
    isReceived: false,
    content: "Dear Hai,\n\nWe are pleased to invite you to join the Shalhevet Learning Program. This initiative aims to foster learning and development through collaborative experiences.\n\nKey features:\n- Flexible scheduling\n- Diverse learning tracks\n- Community support\n- Certificate upon completion\n\nWe look forward to your participation.\n\nWarm regards,\nShalhevet Program Team",
    sendTimestamp: new Date("2022-11-17T11:58:00")
  },
  {
    id: 3,
    date: "17/11/2022",
    time: "12:00",
    subject: "Shalhevet Learning Program",
    destination: "elazar.lifshitz@email.com",
    isReceived: true,
    content: "Hello Elazar,\n\nYou have been selected for the Shalhevet Learning Program based on your profile and interests. This program will provide you with valuable learning opportunities.\n\nProgram benefits:\n- Access to exclusive content\n- Networking opportunities\n- Skill enhancement workshops\n- Personal growth sessions\n\nPlease let us know if you have any questions.\n\nBest,\nShalhevet Coordination Team",
    sendTimestamp: new Date("2022-11-17T12:00:00")
  },
  {
    id: 4,
    date: "17/11/2022",
    time: "12:00",
    subject: "Shalhevet Learning Program",
    destination: "tamir.palant@email.com",
    isReceived: true,
    content: "Dear Tamir,\n\nWelcome to the Shalhevet Learning Program! We are thrilled to have you join our learning community.\n\nWhat to expect:\n- Weekly learning sessions\n- Project-based learning\n- Peer collaboration\n- Progress tracking\n\nYour journey starts next week. We will send you detailed information soon.\n\nRegards,\nShalhevet Team",
    sendTimestamp: new Date("2022-11-17T12:00:00")
  },
  {
    id: 5,
    date: "17/11/2022",
    time: "12:07",
    subject: "Shalhevet Learning Program",
    destination: "yoel.benavraham@email.com",
    isReceived: false,
    content: "Hi Yoel,\n\nThe Shalhevet Learning Program registration is now open! We believe this program aligns perfectly with your learning goals.\n\nProgram highlights:\n- Interactive workshops\n- One-on-one mentoring\n- Group projects\n- Resource library access\n\nRegistration deadline is approaching. Don't miss this opportunity!\n\nBest wishes,\nShalhevet Admissions",
    sendTimestamp: new Date("2022-11-17T12:07:00")
  },
  {
    id: 6,
    date: "17/11/2022",
    time: "12:08",
    subject: "Shalhevet Learning Program",
    destination: "eli.engel@email.com",
    isReceived: true,
    content: "Dear Eli,\n\nCongratulations! You have been accepted into the Shalhevet Learning Program. We are excited to support your learning journey.\n\nNext steps:\n1. Complete the orientation module\n2. Join the program community\n3. Schedule your first session\n4. Access learning materials\n\nWelcome aboard!\n\nSincerely,\nShalhevet Program Directors",
    sendTimestamp: new Date("2022-11-17T12:08:00")
  },
  {
    id: 7,
    date: "17/11/2022",
    time: "12:08",
    subject: "Shalhevet Learning Program",
    destination: "ohr.herskovitz@email.com",
    isReceived: false,
    content: "Hello Ohr,\n\nWe are reaching out to invite you to the Shalhevet Learning Program. Your background and interests make you an ideal candidate.\n\nProgram structure:\n- 12-week duration\n- Flexible timing\n- Mixed learning formats\n- Continuous support\n\nWould you be interested in learning more about this opportunity?\n\nKind regards,\nShalhevet Outreach Team",
    sendTimestamp: new Date("2022-11-17T12:08:00")
  },
  {
    id: 8,
    date: "17/11/2022",
    time: "12:10",
    subject: "Shalhevet Learning Program",
    destination: "avi.weitzmann@email.com",
    isReceived: true,
    content: "Dear Avi,\n\nThank you for your interest in the Shalhevet Learning Program. We are pleased to confirm your enrollment.\n\nImportant dates:\n- Program start: November 24, 2022\n- Orientation: November 21, 2022\n- First project due: December 1, 2022\n\nPlease mark these dates in your calendar.\n\nLooking forward to working with you!\n\nBest,\nShalhevet Program Manager",
    sendTimestamp: new Date("2022-11-17T12:10:00")
  }
];

const EmailsPage: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sort emails by sending date (newest first) and set initial state
  useEffect(() => {
    const sortedEmails = [...sampleEmails].sort((a, b) => 
      b.sendTimestamp.getTime() - a.sendTimestamp.getTime()
    );
    setEmails(sortedEmails);
    setFilteredEmails(sortedEmails);
  }, []);

  // Filter emails based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = emails.filter(email =>
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.date.includes(searchTerm)
      );
      setFilteredEmails(filtered);
    } else {
      setFilteredEmails(emails);
    }
  }, [searchTerm, emails]);

  // Handle email selection
  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  // Handle resend email
  const handleResend = (e: React.MouseEvent, email: Email) => {
    e.stopPropagation();
    console.log(`Resending email to ${email.destination}`);
    // TODO: Implement resend logic
  };

  // Go back to email list
  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  if (selectedEmail) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleBackToList}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Emails</span>
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Email Details</h1>
            </div>
            
          </div>
        </div>

        {/* Email Content */}
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{selectedEmail.subject}</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {selectedEmail.date} {selectedEmail.time}
                  </span>
                  {selectedEmail.isReceived ? (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Received</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-red-600">
                      <X className="w-4 h-4" />
                      <span className="text-sm">Not Received</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <strong>To:</strong> {selectedEmail.destination}
              </div>
            </div>
            <div className="p-6">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {selectedEmail.content}
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={(e) => handleResend(e, selectedEmail)}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-md hover:bg-teal-100"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Resend</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Emails</h1>
    
        </div>
      </div>

      <div className="p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Email List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Row */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
              <div className="col-span-1 text-center">Recived</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-4">Subject</div>
              <div className="col-span-4">Destination</div>
              <div className="col-span-1 text-center">Send Again</div>
            </div>
          </div>

          {/* Email Rows */}
          <div className="divide-y divide-gray-200">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email)}
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Status */}
                  <div className="col-span-1 flex justify-center">
                    {email.isReceived ? (
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                    )}
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <div className="text-sm text-gray-900">{email.date}</div>
                    <div className="text-xs text-gray-500">{email.time}</div>
                  </div>

                  {/* Subject */}
                  <div className="col-span-4">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {email.subject}
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="col-span-4">
                    <div className="text-sm text-gray-600 truncate">
                      {email.destination}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={(e) => handleResend(e, email)}
                      className="p-1 text-gray-400 hover:text-teal-600 transition-colors"
                      title="Resend email"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredEmails.length} of {emails.length} emails
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <span className="px-3 py-1 text-sm bg-teal-600 text-white rounded">1</span>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailsPage;