import React from 'react';
import './landing-page.css';

const ContactPage = () => (
  <div className="contact-page-wrapper">
    <section className="landing-contact-section" style={{minHeight: '60vh'}}>
      <div className="contact-container">
        <h1 className="section-title">Contact Us</h1>
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
        <div className="contact-extra">
          <h2 style={{marginTop: '2.5rem', fontSize: '1.2rem'}}>Or send us a message:</h2>
          <form className="contact-form" onSubmit={e => {e.preventDefault(); alert('Message sent!')}}>
            <input type="text" className="contact-input" placeholder="Your Name" required />
            <input type="email" className="contact-input" placeholder="Your Email" required />
            <textarea className="contact-input" placeholder="Your Message" rows="5" required />
            <button type="submit" className="cta-btn" style={{marginTop: '1rem'}}>Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </div>
);

export default ContactPage;
