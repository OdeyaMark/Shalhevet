import React from 'react';
import { X } from 'lucide-react';

interface UserProfileData {
  id: number;
  name: string;
  gender: 'male' | 'female';
  age: number;
  birthDate: string;
  jewishAffiliation: string;
  profession: string;
  city: string;
  state: string;
  chevrutaRequests: string;
  experience: string;
  personalQuestions: {
    question: string;
    answer: string;
  }[];
  learningPreferences: {
    daily: boolean;
    weekly: boolean;
    monthly: boolean;
    yearly: boolean;
  };
  categories: {
    beginners: boolean;
    intermediate: boolean;
    advanced: boolean;
    expertTalmud: boolean;
  };
  availableTimes: string[];
  phoneticLearning: boolean;
  optionalPreferences: number;
}

interface UserProfilePopupProps {
  user: UserProfileData;
  isOpen: boolean;
  onClose: () => void;
}

const UserProfilePopup: React.FC<UserProfilePopupProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h2 className="text-2xl font-semibold text-center flex-1">{user.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 ml-4"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Left Column - General Info */}
          <div className="space-y-6">
            {/* Personal Questions Section */}
            <div className="bg-teal-100 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-4">Personal Questions</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Any requests regarding your Chevruta
                  </label>
                  <div className="bg-white p-3 rounded border text-sm">
                    {user.chevrutaRequests}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience of Jewish studies and learning preferences
                  </label>
                  <div className="bg-white p-3 rounded border text-sm">
                    {user.experience}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Basic Info */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-teal-100 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-4">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Gender:</span>
                  <span>{user.gender === 'male' ? 'Male' : 'Female'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Age:</span>
                  <span>{user.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date of Birth:</span>
                  <span>{user.birthDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Jewish Affiliation:</span>
                  <span>{user.jewishAffiliation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Profession:</span>
                  <span className="text-right">{user.profession}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">City:</span>
                  <span>{user.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">State:</span>
                  <span>{user.state}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preferences */}
          <div className="space-y-6">
            {/* Learning Preferences */}
            <div className="bg-teal-100 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-4">Learning Preferences</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Preferred Learning:</span>
                  <span>{user.personalQuestions[0]?.answer || 'English with Hebrew'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Optional Preferences:</span>
                  <span>{user.optionalPreferences}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Learning Schedule & Categories */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Schedule */}
            <div className="bg-teal-600 text-white p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Learning Schedule</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="bg-white text-teal-600 p-2 rounded text-center text-sm">
                    <div>Daily</div>
                    <div className="text-xs">Advanced</div>
                  </div>
                  <div className="bg-white text-teal-600 p-2 rounded text-center text-sm">
                    <div>Advanced</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white text-teal-600 p-2 rounded text-center text-sm">
                    <div>Weekly</div>
                    <div className="text-xs">Advanced</div>
                  </div>
                  <div className="bg-white text-teal-600 p-2 rounded text-center text-sm">
                    <div>Advanced</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white text-teal-600 p-2 rounded text-center text-sm">
                    <div>Monthly</div>
                    <div className="text-xs">Beginners</div>
                  </div>
                  <div className="bg-white text-teal-600 p-2 rounded text-center text-sm">
                    <div>Expert Talmud</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white text-teal-600 p-2 rounded text-center text-sm">
                    <div>Yearly</div>
                    <div className="text-xs">Advanced</div>
                  </div>
                  <div className="bg-white text-teal-600 p-2 rounded text-center text-sm">
                    <div>Expert Talmud</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Times */}
            <div className="bg-teal-100 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-4">Available Times</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2 rounded text-center text-sm">Morning</div>
                <div className="bg-white p-2 rounded text-center text-sm">Evening</div>
                <div className="bg-white p-2 rounded text-center text-sm">Afternoon</div>
                <div className="bg-white p-2 rounded text-center text-sm">Flexible</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 px-6 py-4 bg-gray-50 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-medium">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const ExampleUsage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const sampleUser: UserProfileData = {
    id: 1,
    name: 'Noah Morris',
    gender: 'male',
    age: 36,
    birthDate: '15/05/1987',
    jewishAffiliation: 'Jewish',
    profession: 'Online marketing, social media. I produce Torah videos online for my clients.',
    city: 'Boca Raton',
    state: 'Florida',
    chevrutaRequests: "I'm pretty open minded, I want to learn through all of tanach and any specific rabbis commentary or works. Would also be open to learn through Gemara, mishna, tanach, rambam or similar.",
    experience: "I want to learn Hebrew better and learn all of Torah. We have plenty of time. I am 34 years old was in modern orthodox yeshiva day school through out grade school other than high school. Went to yeshiva in israel for a year and a half but have a lot to improve in.",
    personalQuestions: [
      {
        question: "Learning preference",
        answer: "English with Hebrew (bilingual)"
      }
    ],
    learningPreferences: {
      daily: true,
      weekly: true,
      monthly: true,
      yearly: true
    },
    categories: {
      beginners: true,
      intermediate: false,
      advanced: true,
      expertTalmud: true
    },
    availableTimes: ['Morning', 'Evening', 'Afternoon', 'Flexible'],
    phoneticLearning: false,
    optionalPreferences: 1
  };

  return (
    <div className="p-8">
      <button
        onClick={() => setIsPopupOpen(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Open User Profile
      </button>

      <UserProfilePopup
        user={sampleUser}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default ExampleUsage;