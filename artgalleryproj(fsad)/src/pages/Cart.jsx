import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4 text-heading">Your Cart is Empty</h1>
        <p className="text-lg mb-4 text-paragraph">Looks like you haven't added any items to your cart yet.</p>
        <Link
          to="/gallery/paintings"
          className="inline-block bg-button-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover transition-colors"
        >
          Browse Artworks
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-heading">Your Cart</h1>
      
      <div className="grid gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border border-border-color rounded-lg bg-card-bg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-heading">{item.title}</h3>
              <p className="text-paragraph">{item.artist}</p>
              <p className="font-bold text-heading">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-3 py-1 border border-border-color rounded hover:bg-button-hover text-text"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 border border-border-color rounded hover:bg-button-hover text-text"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-accent-color hover:text-accent-color-dark"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-border-color pt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-heading">Total: ₹{getCartTotal().toFixed(2)}</h2>
          <button
            onClick={() => navigate('/shipping')}
            className="bg-button-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;