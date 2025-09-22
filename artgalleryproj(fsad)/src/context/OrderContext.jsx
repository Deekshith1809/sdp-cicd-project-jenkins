import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Load orders from localStorage on initial render
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCurrentOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrderById = (orderId) => {
    return orders.find((order) => order.id === orderId);
  };

  const getUserOrders = (userId) => {
    return orders.filter((order) => order.userId === userId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getUserOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};