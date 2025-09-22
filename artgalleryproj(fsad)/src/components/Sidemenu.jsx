import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const Sidemenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Paintings', path: '/gallery/paintings', icon: '🖼️' },
    { name: 'Sculptures', path: '/gallery/sculptures', icon: '🗿' },
    { name: 'Photography', path: '/gallery/photography', icon: '📸' },
    { name: 'Digital Art', path: '/gallery/digital-art', icon: '💻' },
    { name: 'Mixed Media', path: '/gallery/mixed-media', icon: '🎨' },
  ];

  const accountItems = [
    { name: 'Profile', path: '/profile', icon: '👤' },
    { name: 'Cart', path: '/cart', icon: '🛒' },
    { name: 'Wishlist', path: '/wishlist', icon: '❤️' },
     { name: 'My orders', path: '/order-tracking', icon: '🚚' },
  ];

  const settingsItems = [
    { name: 'Account Settings', path: '/settings/account', icon: '⚙️' },
    // Notifications, Privacy, and Payment Methods items removed as requested
  ];
  
  // Theme toggle item
  const themeToggleItem = {
    name: theme === 'light' ? 'Dark Mode' : 'Light Mode',
    icon: theme === 'light' ? '🌙' : '☀️',
    action: toggleTheme
  };

  // Help & Support section removed as requested

  const handleLogout = () => {
    toast.success('Logged out successfully');
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* Toggle Button with Roll Animation */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        // className={`fixed top-4 left-4 z-50 p-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 
        // text-white hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 
        // focus:ring-purple-500 focus:ring-offset-2 shadow-lg transition-all duration-300 
        // ${isOpen ? 'rotate-180 translate-x-64' : 'rotate-0'}`}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 
          text-white hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 
          focus:ring-purple-500 focus:ring-offset-2 shadow-lg transition-all duration-300 
          "
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay with Fade Effect */}
      <div
        className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out z-40
        ${isOpen ? 'opacity-50 backdrop-blur-sm' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar with Roll Animation */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-card-bg text-text transform transition-all duration-300 ease-in-out z-50 
        shadow-card-shadow ${
          isOpen 
            ? 'translate-x-0 rotate-0 scale-100' 
            : '-translate-x-full -rotate-12 scale-95 opacity-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header with Slide Effect */}
          <div className={`bg-button-primary p-6 transform transition-transform duration-500 ease-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Art Gallery</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links with Stagger Effect */}
          <nav className="flex-grow p-4 overflow-y-auto">
            <div className="space-y-1">
              {/* Main Navigation */}
              <div className="mb-6 transform transition-all duration-300 ease-out">
                <h3 className="px-4 text-xs font-semibold text-paragraph uppercase tracking-wider mb-2">
                  Navigation
                </h3>
                {menuItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 
                    transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
                    ${location.pathname === item.path
                      ? 'bg-button-primary text-white shadow-card-shadow scale-102'
                      : 'text-paragraph hover:bg-button-hover/10 hover:text-heading hover:shadow-card-shadow hover:scale-102'
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xl transform transition-transform duration-200 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Account Section */}
              <div className="mb-6 transform transition-all duration-300 ease-out delay-100">
                <h3 className="px-4 text-xs font-semibold text-paragraph uppercase tracking-wider mb-2">
                  Account
                </h3>
                {accountItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 
                    transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
                    ${location.pathname === item.path
                      ? 'bg-button-primary text-white shadow-card-shadow scale-102'
                      : 'text-paragraph hover:bg-button-hover/10 hover:text-heading hover:shadow-card-shadow hover:scale-102'
                    }`}
                    style={{ transitionDelay: `${(index + menuItems.length) * 50}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xl transform transition-transform duration-200 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Settings Section */}
              <div className="mb-6 transform transition-all duration-300 ease-out delay-200">
                <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Settings
                </h3>
                {settingsItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 
                    transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
                    ${location.pathname === item.path
                      ? 'bg-button-primary text-white shadow-card-shadow scale-102'
                      : 'text-paragraph hover:bg-button-hover/10 hover:text-heading hover:shadow-card-shadow hover:scale-102'
                    }`}
                    style={{ transitionDelay: `${(index + menuItems.length + accountItems.length) * 50}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xl transform transition-transform duration-200 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                
                {/* Theme Toggle Button */}
                <button
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 
                  transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
                  text-paragraph hover:bg-button-hover/10 hover:text-heading hover:shadow-card-shadow hover:scale-102`}
                  style={{ transitionDelay: `${(settingsItems.length + menuItems.length + accountItems.length) * 50}ms` }}
                  onClick={() => {
                    toggleTheme();
                    toast.success(`${theme === 'light' ? 'Dark' : 'Light'} mode activated`);
                  }}
                >
                  <span className="text-xl transform transition-transform duration-200 group-hover:scale-110">
                    {themeToggleItem.icon}
                  </span>
                  <span className="font-medium">{themeToggleItem.name}</span>
                </button>
              </div>

              {/* Help & Support Section removed as requested */}
            </div>
          </nav>

          {/* Logout Button with Slide Up Effect */}
          <div className={`p-4 transform transition-all duration-300 ease-out delay-500
            ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-400 
              hover:bg-red-400/10 hover:text-red-300 transition-all duration-200 hover:scale-102"
            >
              <span className="text-xl">🚪</span>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidemenu;