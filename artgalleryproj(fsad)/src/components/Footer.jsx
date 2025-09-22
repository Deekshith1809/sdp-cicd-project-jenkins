import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card-bg text-text py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-heading">Art Gallery</h3>
            <p className="text-paragraph">
              Discover and collect unique artworks from talented artists around the world.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-paragraph hover:text-heading transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery/paintings" className="text-paragraph hover:text-heading transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-paragraph hover:text-heading transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-heading">Contact Us</h3>
            <ul className="space-y-2 text-paragraph">
              <li>Email: 2300031766@kluniversity.in</li>
              <li>Phone: +91 7386460183</li>
              <li>Address: 123 Art Street, Gallery City</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border-color mt-8 pt-8 text-center text-paragraph">
          <p>&copy; {new Date().getFullYear()} Art Gallery. All rights reserved by 2300031766.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;