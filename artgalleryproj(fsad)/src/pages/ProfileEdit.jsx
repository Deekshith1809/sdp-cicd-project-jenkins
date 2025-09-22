import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userdata');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        country: user.country || '',
      });
    } else {
      // If no user data, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Determine the endpoint based on user role
      const endpoint = userData.role === 'artist' 
        ? `http://localhost:2004/artist/update/${userData.id}`
        : `http://localhost:2004/user/update/${userData.id}`;

      const updateData = {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`,
      };

      const response = await axios.put(endpoint, updateData);

      if (response.status === 200) {
        // Update localStorage with new data
        const updatedUserData = {
          ...userData,
          ...updateData,
        };
        localStorage.setItem('userdata', JSON.stringify(updatedUserData));
        
        toast.success('Profile updated successfully!');
        navigate(-1); // Go back to previous page
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-color mx-auto mb-4"></div>
          <p className="text-paragraph">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-card-bg rounded-lg shadow-card-shadow border border-border-color overflow-hidden">
          {/* Header */}
          <div className="bg-button-primary px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
                <p className="text-white/80 mt-1">Update your personal information</p>
              </div>
              <button
                onClick={handleCancel}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-heading border-b border-border-color pb-2">
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-form-label mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-form-label mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-form-label mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-form-label mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-heading border-b border-border-color pb-2">
                  Address Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-form-label mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-form-label mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-form-label mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-form-label mb-1">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-form-label mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border-color">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 border border-border-color rounded-lg text-text hover:bg-button-hover/10 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-button-primary text-white rounded-lg hover:bg-button-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;


