import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const [newOrderAlert, setNewOrderAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to play notification sound (optional)
  const playNotificationSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYbBDSN1/LCdSEFLITJ8Nwf');
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      console.log('Notification sound error:', error);
    }
  };

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        const newOrders = response.data.data;
        
        // Check if there are new orders
        if (newOrders.length > lastOrderCount && lastOrderCount > 0) {
          setNewOrderAlert(true);
          // Show notification for new orders
          const newOrdersCount = newOrders.length - lastOrderCount;
          toast.success(`🎉 ${newOrdersCount} new order(s) received!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
          // Play notification sound
          playNotificationSound();
          
          // Clear alert after 3 seconds
          setTimeout(() => setNewOrderAlert(false), 3000);
        }
        
        // Sort orders by date (newest first)
        const sortedOrders = newOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
        setLastOrderCount(sortedOrders.length);
        console.log("✅ Orders updated:", sortedOrders.length, "total orders");
      } else {
        toast.error("Error fetching orders")
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
    
    // Set up auto-refresh every 10 seconds to get new orders
    const interval = setInterval(() => {
      fetchAllOrders();
    }, 10000); // Refresh every 10 seconds
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [])

  return (
    <div className='order add'>
      <div className="order-header">
        <h3 className={newOrderAlert ? 'new-order-alert' : ''}>
          Order Page {newOrderAlert && '🔔 NEW ORDER!'}
        </h3>
        <div className="order-controls">
          <span className="order-count">Total Orders: {orders.length}</span>
          <button 
            className="refresh-btn" 
            onClick={fetchAllOrders}
            disabled={isLoading}
            title="Refresh Orders"
          >
            {isLoading ? '🔄 Loading...' : '🔄 Refresh'}
          </button>
          <span className="auto-refresh-indicator">
            🔄 Auto-refresh: ON (every 10s)
          </span>
        </div>
      </div>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
              <p className='order-timestamp'>
                📅 {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
              </p>
              <p className='payment-status'>
                {order.payment ? '✅ Paid' : '❌ Pending Payment'}
              </p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
