import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaCheckCircle, FaShippingFast, FaTruck, FaWarehouse } from 'react-icons/fa';

const OrderTracking = () => {
  // In a real app, this would come from an API or database
  // For demo purposes, we'll use a mock order or localStorage data
  const [orderNumber, setOrderNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  
  // Check for order data in localStorage when component mounts
  useEffect(() => {
    const currentOrder = localStorage.getItem('currentOrder');
    if (currentOrder) {
      const orderData = JSON.parse(currentOrder);
      setTrackingData(orderData);
      setOrderNumber(orderData.id);
      setIsTracking(true);
      // Clear the current order from localStorage to prevent showing it again on refresh
      // In a real app, you would store this in a database and retrieve it when needed
      localStorage.removeItem('currentOrder');
    }
  }, []);

  // Mock order data
  const mockOrder = {
    id: 'ORD12345678',
    date: '2023-05-15',
    status: 'shipped',
    estimatedDelivery: '2023-05-20',
    items: [
      { id: 1, name: 'Colorful Emotions', quantity: 1, price: 1200 },
      { id: 2, name: 'Twilight Peaks', quantity: 1, price: 1500 }
    ],
    total: 2700,
    shippingAddress: {
      name: 'John Doe',
      address: '123 Art Street',
      city: 'New York',
      state: 'NY',
      zip: '10001'
    },
    trackingNumber: 'TRK987654321',
    trackingHistory: [
      { status: 'Order Placed', date: '2023-05-15', time: '10:30 AM', description: 'Your order has been placed successfully' },
      { status: 'Processing', date: '2023-05-16', time: '09:15 AM', description: 'Your order is being processed' },
      { status: 'Packed', date: '2023-05-17', time: '02:45 PM', description: 'Your order has been packed and is ready for shipping' },
      { status: 'Shipped', date: '2023-05-18', time: '11:20 AM', description: 'Your order has been shipped' }
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would fetch the order data from an API
    // For demo purposes, we'll use the mock order if the order number matches
    if (orderNumber === mockOrder.id) {
      setTrackingData(mockOrder);
      setIsTracking(true);
    } else if (orderNumber) {
      // Show a message for non-existent orders
      setTrackingData(null);
      setIsTracking(true);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return <FaBox className="text-blue-500" />;
      case 'processing':
        return <FaWarehouse className="text-yellow-500" />;
      case 'packed':
        return <FaShippingFast className="text-orange-500" />;
      case 'shipped':
        return <FaTruck className="text-green-500" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-600" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-[80vh] bg-background text-text">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-heading">Track Your Order</h1>

        {!isTracking ? (
          <div className="bg-card-bg p-8 rounded-lg shadow-md max-w-md mx-auto border border-border-color">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium mb-2 text-form-label">
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number (e.g., ORD12345678)"
                  className="w-full px-4 py-3 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-accent-color/50 focus:outline-none text-text placeholder-paragraph/60"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent-color hover:bg-accent-color/90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm"
              >
                Track Order
              </button>
            </form>
            <div className="mt-6 text-center text-paragraph text-sm">
              <p>For demo purposes, use order number: ORD12345678</p>
            </div>
          </div>
        ) : trackingData ? (
          <div className="bg-card-bg rounded-lg shadow-md overflow-hidden border border-border-color">
            {/* Order Header */}
            <div className="bg-card-bg border-b border-border-color p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-heading">Order #{trackingData.id}</h2>
                  <p className="text-paragraph">Placed on {trackingData.date}</p>
                </div>
                <div className="bg-accent-color px-4 py-2 rounded-full text-sm font-medium text-white shadow-sm">
                  Estimated Delivery: {trackingData.estimatedDelivery}
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="p-6 border-b border-border-color">
              <h3 className="text-lg font-semibold mb-6 text-heading">Tracking Status</h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 h-full w-0.5 bg-border-color"></div>

                {/* Timeline events */}
                <div className="space-y-8">
                  {trackingData.trackingHistory.map((event, index) => (
                    <div key={index} className="relative pl-12">
                      {/* Status icon */}
                      <div className="absolute left-0 top-0 bg-card-bg p-2 rounded-full border-2 border-border-color shadow-sm">
                        {getStatusIcon(event.status)}
                      </div>

                      <div>
                        <h4 className="font-medium text-lg text-heading">{event.status}</h4>
                        <p className="text-paragraph/80 text-sm">
                          {event.date} at {event.time}
                        </p>
                        <p className="mt-1 text-paragraph">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="p-6 border-b border-border-color">
              <h3 className="text-lg font-semibold mb-4 text-heading">Order Details</h3>
              <div className="space-y-4">
                {trackingData.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium text-text">{item.name}</p>
                      <p className="text-paragraph/80 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-text">₹{item.price.toFixed(2)}</p>
                  </div>
                ))}
                <div className="pt-4 border-t border-border-color flex justify-between font-bold text-heading">
                  <span>Total</span>
                  <span>₹{trackingData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-heading">Shipping Information</h3>
              <div className="bg-background p-4 rounded-lg border border-border-color shadow-sm">
                <p className="font-medium text-text">{trackingData.shippingAddress.name}</p>
                <p className="text-paragraph">{trackingData.shippingAddress.address}</p>
                <p className="text-paragraph">
                  {trackingData.shippingAddress.city}, {trackingData.shippingAddress.state}{' '}
                  {trackingData.shippingAddress.zip}
                </p>
                <p className="mt-2">
                  <span className="text-paragraph/80">Tracking Number: </span>
                  <span className="font-medium text-text">{trackingData.trackingNumber}</span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 bg-card-bg border-t border-border-color flex flex-wrap gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent-color text-white hover:bg-accent-color/90 transition-all duration-200 shadow-sm"
              >
                Back to Home
              </Link>
              <button
                onClick={() => setIsTracking(false)}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border-color text-text hover:bg-accent-color/10 transition-all duration-200"
              >
                Track Another Order
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-neutral-800 p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
            <div className="text-red-500 text-5xl mb-4">😕</div>
            <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
            <p className="text-neutral-400 mb-6">We couldn't find an order with the number {orderNumber}.</p>
            <button
              onClick={() => setIsTracking(false)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;