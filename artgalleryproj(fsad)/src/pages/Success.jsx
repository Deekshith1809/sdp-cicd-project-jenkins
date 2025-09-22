import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Success = () => {
  // Check if there's a current order in localStorage
  const hasCurrentOrder = localStorage.getItem('currentOrder') !== null;
  return (
    <div className="min-h-[80vh] relative overflow-hidden">
      {/* Background gradient with fade-in */}
      <div className="absolute inset-0 bg-background animate-bg-fade-in" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
        {/* Checkmark with bounce-in and glow pulse */}
        <div className="mb-10 inline-flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full animate-glow-pulse-once" style={{filter: 'blur(2px)'}} />
            <div className="w-20 h-20 rounded-full bg-green-600/15 border border-green-500/30 flex items-center justify-center text-green-400 animate-bounce-in">
              <svg
                className="w-10 h-10"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 animate-slide-up delay-200 text-heading">
          Thank You for Your Purchase!
        </h1>

        {/* Supporting text */}
        <p className="max-w-2xl mx-auto text-paragraph text-lg md:text-xl animate-fade-in delay-400 mb-10">
          Your order has been successfully processed. We'll send you an email with the order details and tracking information.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-500">
          <Link
            to="/"
            className="btn-pop btn-glow inline-flex items-center justify-center px-6 py-3 rounded-lg bg-button-primary text-white border border-border-color hover:bg-button-hover"
          >
            Back to Home
          </Link>
          <Link
            to="/order-tracking"
            className={`btn-pop btn-glow inline-flex items-center justify-center px-6 py-3 rounded-lg ${hasCurrentOrder ? 'animate-pulse bg-accent-color' : 'bg-accent-color'} text-white border ${hasCurrentOrder ? 'border-border-color' : 'border-border-color'} hover:bg-button-hover`}
          >
            {hasCurrentOrder ? '✓ View Order Status' : 'Track Your Order'}
          </Link>
          <Link
            to="/gallery/paintings"
            className="btn-pop btn-glow inline-flex items-center justify-center px-6 py-3 rounded-lg border border-blue-400/60 text-blue-300 hover:text-white hover:bg-blue-600/20"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;