import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Shipping = () => {
  const { cart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  useEffect(() => {
    // Get saved shipping info from localStorage
    const savedShippingInfo = localStorage.getItem('shippingInfo');
    if (savedShippingInfo) {
      setFormData(JSON.parse(savedShippingInfo));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save shipping info to localStorage
    localStorage.setItem('shippingInfo', JSON.stringify(formData));
    navigate('/payment');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-heading">Shipping Information</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-card-bg p-6 rounded-lg shadow-md border border-border-color">
          <h2 className="text-xl font-semibold mb-4 text-heading">Order Summary</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-20 h-20 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-text">{item.title}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-paragraph">Quantity: {item.quantity}</p>
                    <p className="font-medium text-text">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-border-color pt-4">
              <div className="flex justify-between font-bold text-lg text-heading">
                <span>Total</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-card-bg p-6 rounded-lg shadow-md border border-border-color">
          <h2 className="text-xl font-semibold mb-4 text-heading">Shipping Details</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
            />
            <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                />
              </div>
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={formData.zip}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
              />
          </div>
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="px-6 py-2 border border-border-color rounded-lg hover:bg-background/80 transition-colors text-text"
            >
              Back to Cart
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-button-primary text-white rounded-lg hover:bg-button-hover transition-colors shadow-md"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;