import './Contact.css';
import React, { useState } from 'react';
import { createMessage } from '../../services/messageService';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Name & Email required');
      return;
    }
    try {
      await createMessage(formData);
      setStatus('✓ Message saved to database!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setStatus('Failed to send message.');
    }
  };

  return (
    <section id="contact">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-modern">
        <div className="contact-info-card">
          <i className="fas fa-phone-alt fa-2x" style={{ color: '#3B82F6' }}></i>
          <h3>Phone</h3>
          <p>+91 98765 43210</p>
        </div>
        <div className="contact-info-card">
          <i className="fas fa-envelope fa-2x" style={{ color: '#38BDF8' }}></i>
          <h3>Email</h3>
          <p>hello@sundar3d.dev</p>
        </div>
        <div className="contact-info-card">
          <i className="fab fa-linkedin fa-2x" style={{ color: '#0a66c2' }}></i>
          <h3>LinkedIn</h3>
          <p>/in/rsundar</p>
        </div>
      </div>
      <form id="contactForm" onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name *" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" placeholder="Email Address *" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <input type="text" placeholder="Subject" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
        <textarea rows="4" placeholder="Your Message..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
        <button type="submit" className="btn-primary glow-btn" style={{ width: '100%' }}>
          <i className="fas fa-paper-plane"></i> Send Message
        </button>
        <div id="formFeedback" style={{ marginTop: '1rem', color: '#4ade80' }}>{status}</div>
      </form>
    </section>
  );
};

export default Contact;

