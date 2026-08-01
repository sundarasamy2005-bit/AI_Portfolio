import './Navbar.css';
import React, { useState, useEffect } from 'react';


const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') !== 'light-mode';
  });

  useEffect(() => {
    if (!isDark) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark-mode' : 'light-mode');
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav id="mainNav">
      <div className="logo">✨ R. Sundarasamy</div>
      <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', flex: 1, justifyContent: 'flex-end' }}>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => scrollTo('home')}>Home</button>
          <button className="nav-btn" onClick={() => scrollTo('about')}>About</button>
          <button className="nav-btn" onClick={() => scrollTo('skills')}>Skills</button>
          <button className="nav-btn" onClick={() => scrollTo('projects')}>Project</button>
          <button className="nav-btn" onClick={() => scrollTo('internships')}>Internships</button>
          <button className="nav-btn" onClick={() => scrollTo('achievements')}>Achievements</button>
          <button className="nav-btn" onClick={() => scrollTo('education')}>Education</button>
          <button className="nav-btn" onClick={() => scrollTo('contact')}>Contact</button>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          <i className={isDark ? "fas fa-sun" : "fas fa-moon"}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

