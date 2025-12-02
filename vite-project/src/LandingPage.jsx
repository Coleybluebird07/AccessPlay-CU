import React, { useRef, useState } from 'react';
import './landing-page.css';

// helper navigation function
const goToBrowseGames = () => {
  window.location.href = '/browse-games';
};

// Icon components
const SearchIcon = (props) => (
  <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const AccessibilityIcon = (props) => (
  <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 0 0-2 2v3.1a2 2 0 0 0 2 2.1c1.1 0 2-.9 2-2.1V4a2 2 0 0 0-2-2z"/><path d="M10 13a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.5"/><path d="M12 15v7"/><path d="M5 12.6l4.4 2.1c.6.3 1.3.3 1.9 0L19 12.6"/></svg>
);
const ShieldCheckIcon = (props) => (
  <svg {...props} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
const ArrowRightIcon = (props) => (
  <svg {...props} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const CheckCircleIcon = (props) => (
  <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
);

// Section components
const HeroSection = () => (
  <section className="landing-hero">
    <div>
      <p className="hero-sub">Discover Mobile Games Built for Everyone</p>
      <h1 className="hero-title">
        Find games with the accessibility features you need. Our platform helps you discover mobile games designed with disability support in mind.
      </h1>
      <button className="hero-btn" onClick={goToBrowseGames}>
        Start Browsing <ArrowRightIcon style={{ marginLeft: 8 }} />
      </button>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description, iconBgColor, iconTextColor }) => (
  <div className="landing-feature-card">
    <div className="landing-feature-icon" style={{ background: iconBgColor, color: iconTextColor }}>
      {icon}
    </div>
    <div className="landing-feature-title">{title}</div>
    <div className="landing-feature-desc">{description}</div>
  </div>
);

const WhyAccessPlaySection = () => (
  <section className="landing-section">
    <div>
      <h2 className="section-title">Why AccessPlay?</h2>
      <div className="landing-features">
        <FeatureCard
          icon={<SearchIcon />}
          title="Advanced Filtering"
          description="Filter games by specific accessibility features and interests. Find exactly what you need, from screen reader support to one-handed play."
          iconBgColor="#e0f2fe"
          iconTextColor="#3b82f6"
        />
        <FeatureCard
          icon={<AccessibilityIcon />}
          title="Accessibility First"
          description="Every game is documented with detailed accessibility information. Know before you download whether a game will work for you."
          iconBgColor="#dcfce7"
          iconTextColor="#22c55e"
        />
        <FeatureCard
          icon={<ShieldCheckIcon />}
          title="WCAG AA Compliant"
          description="Our platform itself is built with accessibility in mind, featuring voice control support and full keyboard navigation."
          iconBgColor="#e0e7ff"
          iconTextColor="#6366f1"
        />
      </div>
    </div>
  </section>
);

const AccessibilityFeaturesSection = () => {
  const features = [
    "Screen Reader Compatible",
    "Colorblind Mode",
    "High Contrast",
    "Customisable Controls",
    "Voice Control",
    "Single-Handed Play",
    "Reduced Motion",
    "Captions & Subtitles",
  ];
  return (
    <section className="landing-section">
      <div style={{textAlign:'center'}}>
        <h2 className="section-title">Common Accessibility Features We Track</h2>
        <div className="landing-access-list">
          {features.map((feature, index) => (
            <div key={index} className="landing-access-item">
              <CheckCircleIcon />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToActionSection = () => (
  <section className="landing-cta">
    <div>
      <h2 className="cta-title">Ready To Find Your Next Game?</h2>
      <div className="cta-main">
        Browse our curated collection of accessible mobile games and find titles that match your needs and interests.
      </div>
      <button className="cta-btn" onClick={goToBrowseGames}>
        Browse All Games <ArrowRightIcon style={{ marginLeft: 8 }} />
      </button>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="landing-contact-section">
    <div className="contact-container">
      <h2 className="section-title">Contact Us</h2>
      <div className="contact-details">
        <div className="contact-item">
          <strong>Email:</strong> <a href="mailto:info@accessplay.co.uk">info@accessplay.co.uk</a>
        </div>
        <div className="contact-item">
          <strong>Phone:</strong> <a href="tel:+442012345678">+44 20 1234 5678</a>
        </div>
        <div className="contact-item">
          <strong>Hours:</strong> Mon–Fri, 9am–5pm (UK time)
        </div>
      </div>
      <div style={{marginTop: '2rem'}}>
        <a href="/contact" className="cta-btn" style={{textDecoration: 'none', fontWeight: 600}}>Go to Contact Page</a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="landing-footer">
    <div className="footer-title">AccessPlay - Discover Accessible Mobile Games</div>
    <div className="footer-note">Built with accessibility in mind. WCAG AA compliant with voice control support.</div>
    <div>&copy; {new Date().getFullYear()} AccessPlay. All rights reserved.</div>
  </footer>
);

const MicrophoneButton = ({ onResult }) => {
  const recognitionRef = useRef(null);
  const [popup, setPopup] = useState(null);
  const popupTimeout = useRef(null);

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setPopup(transcript);
        if (popupTimeout.current) clearTimeout(popupTimeout.current);
        popupTimeout.current = setTimeout(() => setPopup(null), 2500);
        onResult(transcript);
      };
    }
    recognitionRef.current.start();
  };

  return (
    <>
      <button
        onClick={handleMicClick}
        aria-label="Activate voice search"
        className="mic-fab"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="2" width="6" height="12" rx="3" fill="#2563eb" stroke="#2563eb" />
          <path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="#2563eb" />
          <line x1="12" y1="19" x2="12" y2="22" stroke="#2563eb" />
          <line x1="8" y1="22" x2="16" y2="22" stroke="#2563eb" />
        </svg>
      </button>
      {popup && (
        <div className="mic-popup">{popup}</div>
      )}
    </>
  );
};

export default function LandingPage() {
  const handleVoiceCommand = (transcript) => {
    if (transcript.includes('browse games')) {
      window.location.href = '/browse-games';
    } else {
      alert('Sorry, command not recognized.');
    }
  };

  return (
    <div>
      <main>
        <HeroSection />
        <WhyAccessPlaySection />
        <AccessibilityFeaturesSection />
        <CallToActionSection />
        <ContactSection />
      </main>
      <Footer />
      <MicrophoneButton onResult={handleVoiceCommand} />
    </div>
  );
}
