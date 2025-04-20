import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import the new stylesheet

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">About Us</h3>
          <p className="footer-text">
            Timeless Elegance is your premier destination for high-end timepieces, offering exquisite craftsmanship and unparalleled luxury.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <nav className="footer-nav">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/watches" className="footer-link">Watches</Link>
            <Link to="/checkout" className="footer-link">Cart</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <p className="footer-contact"><span>Email:</span> info@timeless.elegance.com</p>
          <p className="footer-contact"><span>Phone:</span> (078) 123-4567</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">&copy; 2025 Timeless Elegance. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
