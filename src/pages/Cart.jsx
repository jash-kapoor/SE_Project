import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import './cart.css'; // Import the CSS file

const Cart = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingTotal = cartItems.reduce((total, item) => total + item.shippingCharge, 0);
  const total = subtotal + shippingTotal;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">
          🛍️
        </div>
        <h2 className="empty-cart-title">
          Your Shopping Cart is Empty
        </h2>
        <p className="empty-cart-text">
          Explore our collection of luxury watches
        </p>
        <button 
          onClick={() => navigate('/watches')}
          className="checkout-btn"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">
          SHOPPING CART <span className="cart-count">({cartItems.length} items)</span>
        </h1>
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to empty your cart?')) {
              clearCart();
            }
          }}
          className="clear-cart-btn"
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="order-summary">
          <h2 className="order-summary-title">
            ORDER SUMMARY
          </h2>
          <div className="summary-details">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Shipping</span>
              <span className="summary-value">₹{shippingTotal.toLocaleString()}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            className="checkout-btn"
          >
            Proceed to Checkout
          </button>
          <button 
            onClick={() => navigate('/watches')}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>

          <div className="security-features">
            <p>
              🔒 Secure checkout process<br />
              💳 Multiple payment options<br />
              🚚 Express delivery available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;