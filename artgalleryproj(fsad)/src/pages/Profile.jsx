import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userdata');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);
    } else {
      // If no user data, redirect to login
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-color mx-auto mb-4"></div>
          <p className="text-paragraph">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-card-bg rounded-lg shadow-card-shadow border border-border-color overflow-hidden">
          {/* Header */}
          <div className="bg-button-primary px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {userData.firstName ? userData.firstName.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {userData.fullName || `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'User Profile'}
                  </h1>
                  <p className="text-white/80 mt-1 capitalize">{userData.role} Account</p>
                </div>
              </div>
              <Link
                to="/profile/edit"
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-heading border-b border-border-color pb-2">
                  Personal Information
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-form-label mb-1">First Name</label>
                    <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color">
                      {userData.firstName || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-form-label mb-1">Last Name</label>
                    <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color">
                      {userData.lastName || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-form-label mb-1">Email Address</label>
                    <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color">
                      {userData.email || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-form-label mb-1">Phone Number</label>
                    <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color">
                      {userData.phone || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-heading border-b border-border-color pb-2">
                  Address Information
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-form-label mb-1">Street Address</label>
                    <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color">
                      {userData.address || 'Not provided'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-form-label mb-1">City</label>
                      <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color">
                        {userData.city || 'Not provided'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-form-label mb-1">State</label>
                      <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color">
                        {userData.state || 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-form-label mb-1">ZIP Code</label>
                      <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color">
                        {userData.zipCode || 'Not provided'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-form-label mb-1">Country</label>
                      <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color">
                        {userData.country || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="mt-8 pt-6 border-t border-border-color">
              <h2 className="text-lg font-semibold text-heading mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-form-label mb-1">Account Type</label>
                  <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color capitalize">
                    {userData.role || 'User'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-form-label mb-1">Member Since</label>
                  <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color">
                    {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-form-label mb-1">Account Status</label>
                  <p className="text-text bg-background px-3 py-2 rounded-lg border border-border-color">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-border-color">
              <Link
                to="/profile/edit"
                className="flex-1 px-6 py-3 bg-button-primary text-white rounded-lg hover:bg-button-hover transition-colors duration-200 text-center"
              >
                Edit Profile
              </Link>
              <Link
                to="/"
                className="flex-1 px-6 py-3 border border-border-color rounded-lg text-text hover:bg-button-hover/10 transition-colors duration-200 text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


