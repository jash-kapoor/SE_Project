import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Calculate navbar height for spacing
  const navbarHeight = scrolled ? "70px" : "90px"; // Adjust these values as needed

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add padding to the body equal to navbar height
  useEffect(() => {
    // Create a spacer element for the navbar
    const existingSpacerElement = document.getElementById("navbar-spacer");
    if (!existingSpacerElement) {
      const spacerElement = document.createElement("div");
      spacerElement.id = "navbar-spacer";
      spacerElement.style.height = navbarHeight;
      spacerElement.style.width = "100%";
      spacerElement.style.transition = "height 0.3s ease";
      
      // Insert the spacer at the top of the body
      document.body.insertBefore(spacerElement, document.body.firstChild);
    } else {
      existingSpacerElement.style.height = navbarHeight;
    }
    
    return () => {
      // Cleanup if needed
      const spacer = document.getElementById("navbar-spacer");
      if (spacer) {
        spacer.remove();
      }
    };
  }, [navbarHeight]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      style={{
        background: "#000000", // Solid black background
        color: "#fff",
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1000,
        padding: scrolled ? "0.75rem 2rem" : "1.5rem 2rem",
        height: scrolled ? "70px" : "90px",
        transition: "all 0.3s ease",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box"
      }}
    >
      <div 
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Link 
          to="/" 
          style={{
            textDecoration: "none",
            color: "inherit"
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <div style={{
              width: "30px",
              height: "30px",
              border: "2px solid #d4af37",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative"
            }}>
              <div style={{
                width: "12px",
                height: "12px",
                border: "1px solid #d4af37",
                borderRadius: "50%",
              }}></div>
              <div style={{
                position: "absolute",
                width: "1px",
                height: "8px",
                background: "#d4af37",
                top: "0",
                left: "50%",
                transform: "translateX(-50%)"
              }}></div>
              <div style={{
                position: "absolute",
                width: "1px",
                height: "6px",
                background: "#d4af37",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)"
              }}></div>
            </div>
            <h1 style={{
              fontSize: scrolled ? "1.1rem" : "1.3rem",
              fontWeight: 700,
              letterSpacing: "1px",
              margin: 0,
              background: "linear-gradient(45deg, #d4af37, #f8f8f8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
              transition: "font-size 0.3s ease"
            }}>
              Timeless Elegance
            </h1>
          </div>
        </Link>
      </div>

      <button 
        onClick={toggleMenu}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          zIndex: 1001,
          padding: "0.5rem",
          display: "none",
          position: "relative",
          width: "40px",
          height: "40px",
          "@media (max-width: 768px)": {
            display: "block"
          }
        }}
      >
        <div style={{
          width: "24px",
          height: "2px",
          background: isMenuOpen ? "transparent" : "#fff",
          position: "relative",
          transition: "all 0.3s ease"
        }}>
          <span style={{
            width: "24px",
            height: "2px",
            background: "#fff",
            position: "absolute",
            top: isMenuOpen ? "0" : "-8px",
            left: "0",
            transform: isMenuOpen ? "rotate(45deg)" : "none",
            transition: "all 0.3s ease"
          }}></span>
          <span style={{
            width: "24px",
            height: "2px",
            background: "#fff",
            position: "absolute",
            top: isMenuOpen ? "0" : "8px",
            left: "0",
            transform: isMenuOpen ? "rotate(-45deg)" : "none",
            transition: "all 0.3s ease"
          }}></span>
        </div>
      </button>

      <div 
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
          transition: "all 0.3s ease",
          "@media (max-width: 768px)": {
            position: "fixed",
            flexDirection: "column",
            top: 0,
            right: 0,
            height: "100vh",
            width: "70%",
            maxWidth: "300px",
            backgroundColor: "#000000",
            padding: "5rem 2rem",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            boxShadow: isMenuOpen ? "-5px 0 15px rgba(0, 0, 0, 0.2)" : "none",
            zIndex: 1000
          }
        }}
      >
        {["Home", "Watches", "About"].map((item) => (
          <NavLink 
            key={item} 
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            currentPath={location.pathname}
          >
            {item}
          </NavLink>
        ))}
        
        <Link 
          to="/checkout" 
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 500,
            transition: "all 0.2s ease",
            position: "relative",
            padding: "0.5rem",
            ":hover": {
              color: "#d4af37"
            }
          }}
        >
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.2s ease",
            ":hover": {
              background: "rgba(212, 175, 55, 0.2)"
            }
          }}>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#d4af37",
                color: "#000",
                fontSize: "0.75rem",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}

// Custom NavLink component
const NavLink = ({ to, currentPath, children }) => {
  const isActive = 
    (to === "/" && currentPath === "/") || 
    (to !== "/" && currentPath.startsWith(to));
  
  return (
    <Link 
      to={to} 
      style={{
        position: "relative",
        textDecoration: "none",
        color: isActive ? "#d4af37" : "#fff",
        fontSize: "1rem",
        fontWeight: 500,
        letterSpacing: "1px",
        padding: "0.5rem 0",
        transition: "color 0.2s ease",
        ":hover": {
          color: "#d4af37"
        }
      }}
    >
      {children}
      <span style={{
        position: "absolute",
        bottom: "-2px",
        left: "0",
        width: isActive ? "100%" : "0",
        height: "2px",
        background: "#d4af37",
        transition: "width 0.3s ease"
      }}></span>
    </Link>
  );
};

export default Navbar;