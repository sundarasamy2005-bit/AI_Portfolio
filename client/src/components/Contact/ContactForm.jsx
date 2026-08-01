import React, { useState } from 'react';
import { useContact } from '../../hooks/useContact';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { sendMessage, loading, status, error } = useContact();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await sendMessage(formData);
    if (success) {
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <form id="contactForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name *"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email Address *"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
      />
      <textarea
        rows="4"
        placeholder="Your Message..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      ></textarea>
      <button type="submit" className="btn-primary glow-btn" style={{ width: '100%' }} disabled={loading}>
        <i className="fas fa-paper-plane"></i> {loading ? 'Sending...' : 'Send Message'}
      </button>
      {status && <div id="formFeedback" style={{ marginTop: '1rem', color: '#4ade80' }}>✓ {status}</div>}
      {error && <div id="formFeedback" style={{ marginTop: '1rem', color: '#EF4444' }}>⚠ {error}</div>}
    </form>
  );
};

export default ContactForm;
