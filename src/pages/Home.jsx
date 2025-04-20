import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Home.css";

function Home() {
  const heroRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Parallax and scroll effects
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionY = `${position * 0.5}px`;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate opacity for fade effects
  const calculateOpacity = (element, startFade, endFade) => {
    if (scrollPosition < startFade) return 1;
    if (scrollPosition > endFade) return 0;
    return 1 - (scrollPosition - startFade) / (endFade - startFade);
  };

  return (
    <div className="home">
      {/* Enhanced Hero Section with 3D Parallax */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-overlay"></div>
        <div className="hero-watch-visual">
          <div className="watch-frame"></div>
          <div className="watch-dial"></div>
          <div className="watch-hands">
            <div className="hour-hand"></div>
            <div className="minute-hand"></div>
            <div className="second-hand"></div>
          </div>
        </div>
        <div className="hero-content" style={{ opacity: calculateOpacity(heroRef.current, 100, 400) }}>
          <h1>
            <span className="reveal-text">ELEVATE YOUR</span><br/>
            <span className="reveal-text delay-1">PERSONA</span>
          </h1>
          <p className="hero-subtext">
            Where <span className="gold-text">centuries of craftsmanship</span> meet 
            <span className="gold-text"> contemporary boldness</span>
          </p><br/>
          <Link to="/watches" className="cta-button">
            <span>DISCOVER YOUR SIGNATURE</span>
            <div className="button-hover-effect"></div>
          </Link>
        </div>
        <div className="parallax-dots"></div>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">Explore</span>
        </div>
      </section>

      {/* Video Showcase Section - New Addition */}
      <section className="video-showcase">
        <div className="video-background">
          <div className="video-overlay"></div>
        </div>
        <div className="showcase-content">
          <h2 className="section-title showcase-title">
            <span className="title-stroke">CRAFTED</span><br/>
            <span className="title-fill">WITH PRECISION</span>
          </h2>
          <p className="showcase-description">
            Experience the meticulous artistry behind every timepiece. Each watch is a symphony of 
            <span className="gold-text"> over 300 handcrafted components</span>, assembled by master horologists.
          </p>
          <button className="showcase-button">
            <span>WITNESS THE ARTISTRY</span>
            <div className="button-ripple"></div>
          </button>
        </div>
      </section>

      {/* Featured Collections - Now with animated transitions */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-stroke">CURATED</span><br/>
            <span className="title-fill">COLLECTIONS</span>
          </h2>
          <p className="section-subtitle">
            For those who demand nothing less than <span className="gold-text">perfection</span>
          </p>
        </div>
        
        <div className="featured-grid">
          {[
            {
              name: "LEGACY SERIES",
              desc: "Timeless masterpieces that whisper status",
              img: "/classic.jpg",
              link: "/watches?collection=classic",
              bgPos: "center 30%"
            },
            {
              name: "CHRONOGRAPH EDITION",
              desc: "Precision engineered for dominant performance",
              img: "/sports.jpg",
              link: "/watches?collection=sport",
              bgPos: "center 45%"
            },
            {
              name: "BLACK LABEL",
              desc: "The ultimate expression of horological supremacy",
              img: "/luxury.jpg",
              link: "/watches?collection=luxury",
              bgPos: "center 25%"
            }
          ].map((collection, index) => (
            <div className="featured-item" key={index}>
              <div 
                className="collection-image" 
                style={{ 
                  backgroundImage: `url(${collection.img})`,
                  backgroundPosition: collection.bgPos
                }}
              >
                <div className="collection-shimmer"></div>
              </div>
              <div className="collection-content">
                <h3>{collection.name}</h3>
                <p>{collection.desc}</p>
                <Link to={collection.link} className="collection-link">
                  <span>EXPLORE</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Now more exclusive */}
      <section className="why-choose-us">
        <div className="luxury-divider">
          <div className="divider-line"></div>
          <div className="divider-icon">✻</div>
          <div className="divider-line"></div>
        </div>
        
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-stroke">THE HOROLOGIST DIFFERENCE</span>
          </h2>
        </div>

        <div className="features-grid">
          {[
            {
              icon: "✧",
              title: "COUTURE CERTIFICATION",
              desc: "Each timepiece undergoes 127-point authentication"
            },
            {
              icon: "✧",
              title: "WHITE GLOVE CONCIERGE",
              desc: "Dedicated horologist assigned to your account"
            },
            {
              icon: "✧",
              title: "STEALTH DELIVERY",
              desc: "Discreet armored transportation worldwide"
            },
            {
              icon: "✧",
              title: "ETERNAL SERVICE",
              desc: "Generational maintenance for your legacy piece"
            },
            {
              icon: "✧",
              title: "PRIVATE LOUNGE ACCESS",
              desc: "VIP showrooms in 12 global capitals"
            },
            {
              icon: "✧",
              title: "BESPOKE ATELIER",
              desc: "Commission one-of-one creations"
            }
          ].map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <div className="card-hover"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Watch Customizer Preview - New Section */}
      <section className="customizer-preview">
        <div className="customizer-content">
          <h2>DESIGN YOUR LEGACY</h2>
          <p>Our bespoke service allows you to create a timepiece as unique as your journey.</p>
          <Link to="/customize" className="customizer-button">
            <span>ENTER THE ATELIER</span>
          </Link>
        </div>
        <div className="customizer-visual">
          <div className="watch-customize-preview">
            <div className="watch-part case"></div>
            <div className="watch-part dial"></div>
            <div className="watch-part hands"></div>
            <div className="watch-part strap"></div>
          </div>
          <div className="customizer-options">
            <div className="option-dot" data-position="case"></div>
            <div className="option-dot" data-position="dial"></div>
            <div className="option-dot" data-position="hands"></div>
            <div className="option-dot" data-position="strap"></div>
          </div>
        </div>
      </section>

      {/* Signature Series Teaser - Enhanced */}
      <section className="signature-teaser">
        <div className="teaser-overlay"></div>
        <div className="constellation-effect"></div>
        <div className="teaser-content">
          <div className="teaser-badge">LIMITED EDITION</div>
          <h3>COMING SOON</h3>
          <h2>THE NOCTURNE COLLECTION</h2>
          <p>
            The darkest expression of time ever conceived. 
            Join the exclusive waitlist for first access.
          </p>
          <button className="teaser-button">
            RESERVE YOUR PLACE
            <span className="button-shine"></span>
          </button>
          <div className="countdown-timer">
            <div className="time-unit">
              <span className="time-number">21</span>
              <span className="time-label">DAYS</span>
            </div>
            <div className="time-divider"></div>
            <div className="time-unit">
              <span className="time-number">07</span>
              <span className="time-label">HOURS</span>
            </div>
            <div className="time-divider"></div>
            <div className="time-unit">
              <span className="time-number">32</span>
              <span className="time-label">MINUTES</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;