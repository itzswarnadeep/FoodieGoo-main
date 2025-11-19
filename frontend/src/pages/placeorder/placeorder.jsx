import React, { useContext, useState, useEffect } from 'react'
import './placeorder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PlaceOrder = () => {
  
  const { getTotalCartAmount, food_list, cartItems, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token])
  
  const [deliveryData, setDeliveryData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDeliveryData(data => ({ ...data, [name]: value }));
  };



  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUseCurrentLocation(true);
          // In a real app, you'd reverse geocode these coordinates to get address
          alert(`Location captured: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          alert("Unable to get your location. Please enter address manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    
    // Basic validation
    if (!deliveryData.firstName || !deliveryData.email || !deliveryData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = {
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          category: item.category,
          quantity: cartItems[item._id]
        };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: deliveryData,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    console.log("📦 Order data being sent:", orderData);
    console.log("🛒 Items count:", orderItems.length);
    console.log("💰 Total amount:", orderData.amount);

    if (paymentMethod === "cod") {
      // For Cash on Delivery, place order directly
      try {
        let response = await axios.post(url + "/api/order/place-cod", orderData, { headers: { token } });
        if (response.data.success) {
          // Clear cart immediately
          localStorage.removeItem('cartItems');
          alert("🎉 Order placed successfully! You will receive a confirmation call shortly.");
          navigate('/myorders');
        } else {
          alert("Error placing order. Please try again.");
          console.error("COD order failed:", response.data);
        }
      } catch (error) {
        console.log("COD error:", error);
        if (error.response) {
          alert(`Order failed: ${error.response.data.message || 'Please try again'}`);
        } else {
          alert("Network error. Please check your connection and try again.");
        }
      }
    } else if (paymentMethod === "card") {
      // For card payments, integrate with Stripe
      try {
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
          const { session_url } = response.data;
          // Redirect to Stripe checkout
          window.location.replace(session_url);
        } else {
          alert("Error creating payment session. Please try again.");
          console.error("Order placement failed:", response.data);
        }
      } catch (error) {
        console.log("Payment error:", error);
        if (error.response) {
          alert(`Payment failed: ${error.response.data.message || 'Please try again'}`);
        } else {
          alert("Network error. Please check your connection and try again.");
        }
      }
    } else {
      // For UPI or other methods, you can add specific integrations
      alert("UPI payment integration coming soon. Please use Card or COD for now.");
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={deliveryData.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={deliveryData.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={deliveryData.email} type="email" placeholder='Email address' />
        <div className="location-section">
          <input name='street' onChange={onChangeHandler} value={deliveryData.street} type="text" placeholder='Street' />
          <button type="button" className="location-btn" onClick={getCurrentLocation}>
            📍 Use Current Location
          </button>
        </div>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={deliveryData.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={deliveryData.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={deliveryData.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={deliveryData.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={deliveryData.phone} type="text" placeholder='Phone' />
        
        <div className="payment-section">
          <p className="title">Payment Method</p>
          <div className="payment-methods">
            <div className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
              <input type="radio" name="payment" checked={paymentMethod === 'card'} readOnly />
              <label>💳 Credit/Debit Card</label>
            </div>
            <div className={`payment-option ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
              <input type="radio" name="payment" checked={paymentMethod === 'upi'} readOnly />
              <label>📱 UPI Payment</label>
            </div>
            <div className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>
              <input type="radio" name="payment" checked={paymentMethod === 'cod'} readOnly />
              <label>💵 Cash on Delivery</label>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="card-details">
              <p className="payment-note">💳 You will be redirected to Stripe's secure payment page</p>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="upi-details">
              <p className="payment-note">📱 UPI payment integration coming soon. Please use Card or COD for now.</p>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="cod-details">
              <p className="payment-note">💡 Please keep exact change ready. Additional charges may apply for COD orders.</p>
            </div>
          )}
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          
          <div className="order-items">
            <h3>Order Summary</h3>
            <div className="order-items-list">
              {food_list.map((item, index) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <div key={index} className="order-item">
                      <img src={item.image} alt="" />
                      <div className="order-item-details">
                        <p className="item-name">{item.name}</p>
                        <p className="item-quantity">Qty: {cartItems[item._id]}</p>
                      </div>
                      <p className="item-total">${item.price * cartItems[item._id]}</p>
                    </div>
                  )
                }
              })}
            </div>
          </div>
          
          <button type="submit">PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder