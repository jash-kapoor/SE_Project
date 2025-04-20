import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page bg-black text-white px-6 md:px-20 py-10 font-light">
      <div className="about-hero text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-gold tracking-wide mb-4">
          About Timeless Elegance
        </h1>
        <p className="text-lg md:text-xl text-gray-300 italic">
          Crafting Timeless Elegance Since 2025
        </p>
      </div>

      <div className="about-content space-y-20">
        {/* Our Story */}
        <section className="about-section flex flex-col md:flex-row items-center gap-10">
          <div className="about-text flex-1 space-y-6">
            <h2 className="text-3xl font-serif text-gold">Our Story</h2>
            <p className="text-gray-300 text-readable">
              Founded in 2025, Timeless Elegance has been at the forefront of
              premium timepiece retail. What started as a small boutique in New
              York has grown into a nationwide destination for watch
              enthusiasts and collectors alike.
            </p>
            <p className="text-gray-300 text-readable">
              We pride ourselves on offering an expertly curated selection of
              the world's finest watches, combining traditional craftsmanship
              with modern innovation.
            </p>
          </div>
          <div className="about-image flex-1">
            <img
              src="/About.png"
              alt="Our Store"
              className="rounded-2xl shadow-lg shadow-gold/20"
            />
          </div>
        </section>

        {/* Our Values */}
        <section className="values-section text-center">
          <h2 className="text-3xl font-serif text-gold mb-10">Our Values</h2>
          <div className="values-grid grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "🌟", title: "Quality", text: "Every timepiece meets the highest standards of excellence." },
              { icon: "🤝", title: "Trust", text: "We build lasting relationships through integrity." },
              { icon: "💎", title: "Expertise", text: "Decades of horological knowledge at your service." },
              { icon: "♾️", title: "Innovation", text: "We embrace the future while honoring traditions." }
            ].map((val, idx) => (
              <div
                key={idx}
                className="value-card bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-4">{val.icon}</div>
                <h3 className="text-xl text-gold font-semibold mb-2">{val.title}</h3>
                <p className="text-gray-300 text-readable">{val.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Team */}
        <section className="team-section text-center">
          <h2 className="text-3xl font-serif text-gold mb-10">Our Team</h2>
          <div className="team-grid grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { img: "/Jash2.jpeg", name: "Mr. Jash Kapoor", role: "Founder & CEO" },
              { img: "/Darshan.jpeg", name: "Mr. Darshan Dixit", role: "CTO & Watch Specialist" }
            ].map((member, idx) => (
              <div key={idx} className="team-member">
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-full w-40 h-40 object-cover mx-auto border-4 border-gold mb-4"
                />
                <h3 className="text-xl font-semibold text-gold">{member.name}</h3>
                <p className="text-gray-400 text-readable">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="contact-section">
          <h2 className="text-3xl font-serif text-gold mb-10 text-center">
            Visit Our Store
          </h2>
          <div className="contact-grid flex flex-col md:flex-row gap-12 items-center">
            <div className="contact-info flex-1 text-gray-300 space-y-4">
              <h3 className="text-xl text-gold">Store Hours</h3>
              <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
              <br />
              <h3 className="text-xl text-gold">Contact Information</h3>
              <p>📞 (078) 123-4567</p>
              <p>📧 info@timeless.elegance.com</p>
              <p>📍 IIIT Surat Kholvad, Kamrej, 394185</p>
            </div>
            <div className="store-image flex-1">
              <img
                src="/store-interior.jpg"
                alt="Store Interior"
                className="rounded-xl shadow-lg shadow-gold/20"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
