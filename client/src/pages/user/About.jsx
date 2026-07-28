import React from "react";
import "../../style/about.css";

function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Fragranzia</h1>
          <p>
            Discover luxury fragrances that define elegance, confidence, and
            unforgettable memories.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-section">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Fragranzia was created with a passion for premium perfumes and
            timeless scents. We believe that fragrance is more than a product —
            it is an expression of personality and emotion.
          </p>
          <p>
            From Arabic oud to modern luxury blends, we carefully curate every
            collection to bring authentic and high-quality fragrances to our
            customers.
          </p>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80"
            alt="Perfume Collection"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="feature-card">
          <h3>Premium Quality</h3>
          <p>Authentic fragrances crafted with exceptional ingredients.</p>
        </div>

        <div className="feature-card">
          <h3>Luxury Experience</h3>
          <p>Elegant packaging and a seamless shopping experience.</p>
        </div>

        <div className="feature-card">
          <h3>Trusted by Customers</h3>
          <p>Hundreds of fragrance lovers choose Fragranzia every day.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To make luxury fragrances accessible while delivering quality,
          authenticity, and exceptional customer satisfaction.
        </p>
      </section>

    </div>
  );
}

export default About;