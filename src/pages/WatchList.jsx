import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchWatches } from "../server/api";

// Watch Card Component with Luxury Styling
const WatchCard = React.memo(({ watch }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: isHovered 
          ? "0 30px 60px rgba(0, 0, 0, 0.15)"
          : "0 15px 30px rgba(0, 0, 0, 0.1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        height: "100%"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/watch/${watch.id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          height: "100%"
        }}
      >
        {/* Image with elegant overlay */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "380px",
            overflow: "hidden"
          }}
        >
          <img
            src={watch.images?.[0] || "https://via.placeholder.com/400x600/ffffff/cccccc?text=Luxury+Timepiece"}
            alt={watch.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: isHovered ? "scale(1.05)" : "scale(1)"
            }}
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x600/ffffff/cccccc?text=Watch+Image";
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "24px",
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.4s ease"
            }}
          >
            <button
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "12px 24px",
                borderRadius: "30px",
                fontSize: "0.9rem",
                letterSpacing: "1px",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease"
              }}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Watch details */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#fff",
            borderTop: "1px solid rgba(0,0,0,0.05)"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "12px"
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "1.3rem",
                fontWeight: 600,
                color: "#1a1a1a",
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "0.5px"
              }}
            >
              {watch.title}
            </h3>
            {watch.discount > 0 && (
              <span
                style={{
                  backgroundColor: "#d4af37",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.5px"
                }}
              >
                {watch.discount}% OFF
              </span>
            )}
          </div>

          <p
            style={{
              color: "#666",
              fontSize: "0.95rem",
              margin: "0 0 12px",
              fontStyle: "italic"
            }}
          >
            {watch.brand}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.4rem",
                color: "#1a1a1a",
                letterSpacing: "0.5px"
              }}
            >
              ₹{watch.price.toLocaleString()}
            </span>
            <span
              style={{
                color: "#888",
                fontSize: "0.85rem",
                textTransform: "capitalize",
                border: "1px solid #eee",
                padding: "4px 10px",
                borderRadius: "4px"
              }}
            >
              {watch.gender}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
});

// Skeleton Loading Component
const SkeletonCard = () => (
  <div
    style={{
      backgroundColor: "#fff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.05)",
      height: "100%"
    }}
  >
    <div
      style={{
        width: "100%",
        height: "380px",
        backgroundColor: "#f5f5f5",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(90deg, #f5f5f5 25%, #e8e8e8 50%, #f5f5f5 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite"
        }}
      />
    </div>
    <div style={{ padding: "24px" }}>
      <div
        style={{
          height: "24px",
          width: "70%",
          backgroundColor: "#f5f5f5",
          marginBottom: "12px",
          borderRadius: "4px"
        }}
      />
      <div
        style={{
          height: "18px",
          width: "50%",
          backgroundColor: "#f5f5f5",
          marginBottom: "16px",
          borderRadius: "4px"
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div
          style={{
            height: "22px",
            width: "30%",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px"
          }}
        />
        <div
          style={{
            height: "22px",
            width: "20%",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px"
          }}
        />
      </div>
    </div>
  </div>
);

const WatchList = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleWatches, setVisibleWatches] = useState([]);
  const [page, setPage] = useState(1);
  const watchesPerPage = 12;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Taking longer than expected. Please wait...");
      }
    }, 1000);

    const getWatches = async () => {
      try {
        const data = await fetchWatches();
        if (!Array.isArray(data)) throw new Error("Invalid data format");
        setWatches(data);
        setError(null);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message || "Failed to fetch watches");
        setWatches([]);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    getWatches();

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const start = 0;
    const end = page * watchesPerPage;
    setVisibleWatches(watches.slice(start, end));
  }, [watches, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
        visibleWatches.length < watches.length &&
        !loading
      ) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleWatches, watches, loading]);

  if (loading) {
    return (
      <div style={{ 
        backgroundColor: "#f9f9f9", 
        minHeight: "100vh", 
        padding: "80px 20px" 
      }}>
        <div style={{ 
          maxWidth: "1400px", 
          margin: "0 auto", 
          textAlign: "center" 
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.8rem",
            fontWeight: 600,
            color: "#1a1a1a",
            marginBottom: "60px",
            letterSpacing: "1px"
          }}>
            Curating Your Collection
          </h1>
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "40px",
            padding: "0 20px"
          }}>
            {[...Array(6)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return (
    <div style={{ 
      textAlign: "center", 
      padding: "100px 20px",
      backgroundColor: "#f9f9f9", 
      minHeight: "100vh" 
    }}>
      <div style={{ 
        maxWidth: "600px", 
        margin: "0 auto",
        padding: "40px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.05)"
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2rem",
          color: "#1a1a1a",
          marginBottom: "20px"
        }}>
          Something Went Wrong
        </h2>
        <p style={{ 
          color: "#666", 
          marginBottom: "30px",
          lineHeight: "1.6"
        }}>
          {error}
        </p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: "12px 30px",
            backgroundColor: "#1a1a1a",
            color: "white",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            fontSize: "0.9rem",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
            ":hover": {
              backgroundColor: "#d4af37"
            }
          }}
        >
          Retry
        </button>
      </div>
    </div>
  );

  if (!watches.length) return (
    <div style={{ 
      textAlign: "center", 
      padding: "100px 20px",
      backgroundColor: "#f9f9f9", 
      minHeight: "100vh" 
    }}>
      <div style={{ 
        maxWidth: "600px", 
        margin: "0 auto",
        padding: "40px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.05)"
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2rem",
          color: "#1a1a1a",
          marginBottom: "20px"
        }}>
          No Watches Found
        </h2>
        <p style={{ 
          color: "#666", 
          marginBottom: "30px",
          lineHeight: "1.6"
        }}>
          Our collection is currently being updated. Please check back soon.
        </p>
      </div>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "80px 20px",
      }}
    >
      <div style={{ 
        maxWidth: "1400px", 
        margin: "0 auto" 
      }}>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            textAlign: "center",
            fontSize: "2.8rem",
            fontWeight: 600,
            color: "#1a1a1a",
            marginBottom: "60px",
            letterSpacing: "1px",
            position: "relative",
            display: "inline-block",
            left: "50%",
            transform: "translateX(-50%)"
          }}
        >
          <span style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "100%",
            height: "2px",
            backgroundColor: "#d4af37"
          }} />
          Timeless Collection
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "40px",
            padding: "0 20px"
          }}
        >
          {visibleWatches.map((watch) => (
            <WatchCard key={watch._id || watch.id} watch={watch} />
          ))}
        </div>

        {visibleWatches.length < watches.length && (
          <div style={{ 
            textAlign: "center", 
            padding: "60px 0",
            marginTop: "40px"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              border: "3px solid rgba(0,0,0,0.1)",
              borderTopColor: "#d4af37",
              borderRadius: "50%",
              margin: "0 auto",
              animation: "spin 1s linear infinite"
            }} />
          </div>
        )}
      </div>

      {/* Global animations */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default WatchList;