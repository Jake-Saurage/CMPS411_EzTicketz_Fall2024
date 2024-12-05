import React, { useState, useEffect } from 'react';
import { Bell, Ticket, Clock } from 'lucide-react';
import './App.css'; // Make sure the CSS file is imported

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="hero-content">
            <h1 className={`hero-title ${isVisible ? 'visible' : ''}`}>
              Welcome to EZ Ticketz
            </h1>
            <p className={`hero-description ${isVisible ? 'visible' : ''}`}>
              Seamlessly manage your support tickets and enhance your team's workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="features-title">Features You'll Love</h2>
          <div className="features-grid">
            <AnimatedFeatureCard
              delay={100}
              icon={<Ticket className="icon" />}
              title="Easy Ticket Creation"
              description="Create and assign tickets to team members in just a few clicks"
            />
            <AnimatedFeatureCard
              delay={200}
              icon={<Bell className="icon" />}
              title="Instant Notifications"
              description="Stay updated with real-time notifications on ticket status changes"
            />
            <AnimatedFeatureCard
              delay={400}
              icon={<Clock className="icon" />}
              title="Quick Resolution"
              description="Track and resolve tickets efficiently with automated workflows"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const AnimatedFeatureCard = ({ icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`feature-card ${isVisible ? 'visible' : ''}`}>
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default App;
