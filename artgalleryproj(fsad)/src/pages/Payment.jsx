import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Payment = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState(null);
  const [formData, setFormData] = useState({
    paymentMethod: 'card', // Default payment method
    cardNumber: '',
    expiry: '',
    cvv: '',
    upiId: ''
  });

  const getPriceRange = (total) => {
    if (total < 50) return 'Budget';
    if (total < 100) return 'Standard';
    if (total < 200) return 'Premium';
    return 'Luxury';
  };

  useEffect(() => {
    // Get shipping info from localStorage
    const savedShippingInfo = localStorage.getItem('shippingInfo');
    if (!savedShippingInfo) {
      navigate('/shipping');
      return;
    }
    setShippingInfo(JSON.parse(savedShippingInfo));
  }, [navigate]);

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
    console.log('Processing payment...', { ...formData, shippingInfo });
    
    // Generate a random order ID and save order details to localStorage
    const orderId = 'ORD' + Math.floor(Math.random() * 90000000 + 10000000);
    const orderDate = new Date().toISOString().split('T')[0];
    
    const orderDetails = {
      id: orderId,
      date: orderDate,
      status: 'processing',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: getCartTotal(),
      shippingAddress: shippingInfo,
      trackingNumber: 'TRK' + Math.floor(Math.random() * 900000000 + 100000000),
      trackingHistory: [
        { status: 'Order Placed', date: orderDate, time: new Date().toLocaleTimeString(), description: 'Your order has been placed successfully' }
      ]
    };
    
    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
    
    // Clear cart and redirect to success page
    clearCart();
    localStorage.removeItem('shippingInfo');
    navigate('/success');
  };

  if (!shippingInfo) {
    return null;
  }

  const total = getCartTotal();
  const priceRange = getPriceRange(total);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-heading">Payment Information</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-card-bg p-6 rounded-lg shadow-md border border-border-color">
          <h2 className="text-xl font-semibold mb-4 text-heading">Order Summary</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text">{item.title}</h3>
                  <p className="text-sm text-paragraph">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium text-text">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t border-border-color pt-4">
              <div className="flex justify-between font-bold text-lg text-heading">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-paragraph mt-1">
                <span>Price Range:</span>
                <span>{priceRange}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-heading mb-2">Shipping Address</h3>
            <div className="text-paragraph">
              <p>{shippingInfo.name}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
              <p>{shippingInfo.email}</p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="bg-card-bg p-6 rounded-lg shadow-md border border-border-color">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-heading">Payment Method</h3>
            <div className="flex space-x-4 mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleChange}
                className="mr-2 accent-accent-color"
              />
              <span className="text-text">Credit/Debit Card</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={formData.paymentMethod === 'upi'}
                onChange={handleChange}
                className="mr-2 accent-accent-color"
              />
              <span className="text-text">UPI</span>
            </label>
          </div>
        </div>
        
        {formData.paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block mb-1 text-form-label">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block mb-1 text-form-label">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block mb-1 text-form-label">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                />
              </div>
            </div>
          </div>
        )}
          
          {formData.paymentMethod === 'upi' && (
            <div>
              <label htmlFor="upiId" className="block mb-1 text-form-label">UPI ID</label>
              <input
                type="text"
                id="upiId"
                name="upiId"
                placeholder="username@upi"
                value={formData.upiId}
                onChange={handleChange}
                required={formData.paymentMethod === 'upi'}
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-background text-text placeholder-paragraph/60 focus:outline-none focus:ring-2 focus:ring-accent-color/50"
              />
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/shipping')}
              className="px-6 py-2 bg-card-bg text-text border border-border-color rounded-lg hover:bg-accent-color/10 transition-all duration-200 shadow-sm"
            >
              Back to Shipping
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-accent-color text-white rounded-lg hover:bg-accent-color/90 transition-all duration-200 shadow-md"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;