import React, { useContext, useState } from 'react'
import './cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const promoCodes = [
    { code: "FIRST20", description: "First time delivery", discount: 20 },
    { code: "ORDER50", description: "Order above $50", discount: 15, minOrder: 50 },
    { code: "SAVE10", description: "General discount", discount: 10 }
  ];

  const applyPromoCode = (code) => {
    const promo = promoCodes.find(p => p.code === code.toUpperCase());
    if (promo) {
      if (promo.minOrder && getTotalCartAmount() < promo.minOrder) {
        alert(`Minimum order of $${promo.minOrder} required for this promo code`);
        return;
      }
      setAppliedPromo(promo);
      setPromoCode(code.toUpperCase());
    } else {
      alert("Invalid promo code");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode("");
  };

  const getDiscountAmount = () => {
    if (!appliedPromo) return 0;
    return (getTotalCartAmount() * appliedPromo.discount) / 100;
  };

  const getFinalTotal = () => {
    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 2;
    const discount = getDiscountAmount();
    return subtotal + deliveryFee - discount;
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
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
            {appliedPromo && (
              <>
                <hr />
                <div className="cart-total-details">
                  <p>Discount ({appliedPromo.code} - {appliedPromo.discount}%)</p>
                  <p style={{color: '#28a745'}}>-${getDiscountAmount().toFixed(2)}</p>
                </div>
              </>
            )}
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getFinalTotal().toFixed(2)}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <h3>Promo Codes</h3>
          <div className="promo-codes-list">
            {promoCodes.map((promo, index) => (
              <div 
                key={index} 
                className={`promo-code-item ${appliedPromo?.code === promo.code ? 'applied' : ''}`}
                onClick={() => appliedPromo?.code === promo.code ? removePromoCode() : applyPromoCode(promo.code)}
              >
                <div className="promo-info">
                  <span className="promo-code">{promo.code}</span>
                  <span className="promo-desc">{promo.description}</span>
                </div>
                <span className="promo-discount">{promo.discount}% OFF</span>
              </div>
            ))}
          </div>
          <div>
            <p>Or enter your promo code manually:</p>
            <div className="cart-promocode-input">
              <input 
                type="text" 
                placeholder='Enter promo code' 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={() => applyPromoCode(promoCode)}>
                {appliedPromo ? 'Remove' : 'Apply'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
