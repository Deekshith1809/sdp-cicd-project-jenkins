import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidemenu from './components/Sidemenu';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ArtworkDetail from './pages/ArtworkDetail';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import Success from './pages/Success';
import OrderTracking from './pages/OrderTracking';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import ArtistRegister from './pages/ArtistRegister';
import AdminDashboard from './pages/AdminDashboard';
import ArtistDashboard from './pages/ArtistDashboard';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

const UserDashboard = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">User Dashboard</h1>
    <p>Welcome to your user dashboard!</p>
  </div>
);

const Unauthorized = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold text-red-600">Unauthorized</h1>
    <p>You don't have permission to access this page.</p>
  </div>
);

function RootApp() {
  const ramana = localStorage.getItem('userdata') !== null;
  const userData = ramana ? JSON.parse(localStorage.getItem('userdata')) : null;

  const handleLogout = () => {
    localStorage.removeItem('userdata');
    window.location.reload();
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <OrderProvider>
            <Router>
              <div className="min-h-screen flex flex-col">
              <Navbar userData={userData} onLogout={handleLogout} />
              <Sidemenu />
              <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/artist-register" element={<ArtistRegister />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/gallery/:category" element={<Gallery />} />
                  <Route path="/artwork/:id" element={<ArtworkDetail />} />

                  {/* Protected Routes - require login */}
                  <Route
                    path="/cart"
                    element={
                      userData ? <Cart /> : <Navigate to="/login" state={{ from: '/cart' }} replace />
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      userData ? <Wishlist /> : <Navigate to="/login" state={{ from: '/wishlist' }} replace />
                    }
                  />
                  <Route
                    path="/shipping"
                    element={userData ? <Shipping /> : <Navigate to="/login" replace />}
                  />
                  <Route
                    path="/payment"
                    element={userData ? <Payment /> : <Navigate to="/login" replace />}
                  />
                  <Route
                    path="/success"
                    element={userData ? <Success /> : <Navigate to="/login" replace />}
                  />
                  <Route
                    path="/order-tracking"
                    element={userData ? <OrderTracking /> : <Navigate to="/login" replace />}
                  />
                  <Route
                    path="/profile/edit"
                    element={userData ? <ProfileEdit /> : <Navigate to="/login" replace />}
                  />
                  <Route
                    path="/profile"
                    element={userData ? <Profile /> : <Navigate to="/login" replace />}
                  />

                  {/* Rest of the routes remain the same */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user"
                    element={
                      <ProtectedRoute allowedRoles={['user']}>
                        <UserDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/artist"
                    element={
                      <ProtectedRoute allowedRoles={['artist']}>
                        <ArtistDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/artist-dashboard"
                    element={userData ? <ArtistDashboard /> : <Navigate to="/login" replace />}
                  />
                  <Route
                    path="/admin-dashboard"
                    element={userData ? <AdminDashboard /> : <Navigate to="/login" replace />}
                  />

                  <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
              </main>
              {userData && <Footer />}
              <Toaster position="top-right" />
              </div>
            </Router>
            </OrderProvider>
          </CartProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default RootApp;


