import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Get wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  const removeFromWishlist = (item) => {
    const updatedWishlist = wishlistItems.filter((wishlistItem) => wishlistItem.id !== item.id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    toast.success(`${item.title} removed from wishlist`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-background rounded-lg shadow-card-shadow p-6 border border-border-color">
        <div className="text-4xl mb-4">💝</div>
        <h2 className="text-2xl font-bold mb-2 text-heading">
          Your Wishlist is Empty
        </h2>
        <p className="text-paragraph mb-6 text-center max-w-md">
          Discover beautiful artworks and add them to your wishlist!
        </p>
        <Link
          to="/gallery/paintings"
          className="px-6 py-2 bg-button-primary text-white rounded-full 
          font-medium hover:bg-button-hover transform hover:scale-105 
          transition-all duration-300 shadow-card-shadow hover:shadow-lg"
        >
          Explore Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-heading">
          My Wishlist
        </h1>
        <span className="text-paragraph text-sm">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="group bg-card-bg rounded-lg overflow-hidden shadow-card-shadow hover:shadow-md 
            transition-all duration-300 transform hover:-translate-y-1 border border-border-color"
          >
            <div className="relative pb-[75%] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transform 
                group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold mb-1 text-heading truncate">{item.title}</h3>
              <p className="text-sm text-paragraph mb-1 truncate">{item.artist}</p>
              <p className="text-lg font-bold text-heading mb-3">₹{item.price}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/artwork/${item.id}`}
                  className="px-3 py-1.5 bg-button-primary 
                  text-white text-sm rounded-full font-medium hover:bg-button-hover 
                  transition-colors duration-300"
                >
                  View Details
                </Link>
                <button
                  onClick={() => removeFromWishlist(item)}
                  className="p-1.5 text-paragraph hover:text-accent-color transition-colors duration-300"
                  aria-label="Remove from wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" 
                  stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;