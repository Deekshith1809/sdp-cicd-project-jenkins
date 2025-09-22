import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfileView = ({ showEditButton = true, compact = false }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userdata');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);
    }
  }, []);

  if (!userData) {
    return (
      <div className="bg-card-bg rounded-lg shadow-card-shadow border border-border-color p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-background rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-background rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="bg-card-bg rounded-lg shadow-card-shadow border border-border-color p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-button-primary flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {userData.firstName ? userData.firstName.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-heading">
              {userData.fullName || `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'User'}
            </h3>
            <p className="text-xs text-paragraph capitalize">{userData.role}</p>
          </div>
          {showEditButton && (
            <Link
              to="/profile/edit"
              className="text-accent-color hover:text-accent-color/80 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg rounded-lg shadow-card-shadow border border-border-color p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-button-primary flex items-center justify-center">
            <span className="text-lg font-bold text-white">
              {userData.firstName ? userData.firstName.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-heading">
              {userData.fullName || `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'User Profile'}
            </h3>
            <p className="text-paragraph capitalize">{userData.role} Account</p>
          </div>
        </div>
        {showEditButton && (
          <Link
            to="/profile/edit"
            className="px-4 py-2 bg-button-primary text-white rounded-lg hover:bg-button-hover transition-colors duration-200 text-sm"
          >
            Edit Profile
          </Link>
        )}
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-form-label">Email:</span>
            <p className="text-text">{userData.email || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-form-label">Phone:</span>
            <p className="text-text">{userData.phone || 'Not provided'}</p>
          </div>
        </div>
        
        {(userData.address || userData.city) && (
          <div className="text-sm">
            <span className="text-form-label">Location:</span>
            <p className="text-text">
              {[userData.address, userData.city, userData.state, userData.country]
                .filter(Boolean)
                .join(', ') || 'Not provided'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;


