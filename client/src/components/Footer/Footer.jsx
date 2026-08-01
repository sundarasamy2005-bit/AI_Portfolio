import './Footer.css';
import React from 'react';

const Footer = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer>
        <div className="footer-links">
          <button onClick={() => scrollTo('skills')}>Skills</button>
          <button onClick={() => scrollTo('internships')}>Internships</button>
          <button onClick={() => scrollTo('education')}>Education</button>
        </div>
        <div className="social-footer">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="https://github.com" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="#" onClick={(e) => { e.preventDefault(); alert("📄 Resume simulation - PDF ready"); }}><i className="fas fa-download"></i></a>
        </div>
        <p style={{ marginTop: '1.5rem' }}>© 2026 sundarasamy. Crafted with 3D vibes ✨</p>
      </footer>
      <div className="back-to-top" id="backToTopBtn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑
      </div>
    </>
  );
};

export default Footer;

