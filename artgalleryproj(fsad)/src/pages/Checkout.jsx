import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    console.log('Processing payment...', formData);
    
    // Clear cart and redirect to success page
    clearCart();
    navigate('/success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-heading">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-card-bg p-6 rounded-lg shadow-card-shadow">
          <h2 className="text-xl font-semibold mb-4 text-heading">Order Summary</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-heading">{item.title}</h3>
                  <p className="text-sm text-paragraph">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium text-heading">₹{(item.price * item.quantity).toFixed(2)}</p>
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

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-heading">Shipping Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text"
                />
              </div>
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={formData.zip}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-heading">Payment Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-button-primary text-white py-3 px-4 rounded-lg hover:bg-button-hover transition-colors"
          >
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;