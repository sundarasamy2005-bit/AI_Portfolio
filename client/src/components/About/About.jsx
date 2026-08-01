import './About.css';
import React, { useEffect, useState, useRef } from 'react';
import { aboutData } from './AboutData';

const StatCard = ({ label, value, suffix }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(value / (duration / 30));
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              start = value;
              clearInterval(timer);
            }
            setCount(start);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="about-stat-card" ref={cardRef}>
      <span className="about-stat-value">{count}{suffix}</span>
      <span className="about-stat-label">{label}</span>
    </div>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = aboutData.resumePath;
    link.download = 'R_Sundarasamy_Resume.pdf';
    link.click();
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      {/* Section Header */}
      <div className={`about-header ${isVisible ? 'about-animate' : ''}`}>
        <h2 className="section-title">About Me</h2>
        <p className="about-subtitle">
          Get to know more about me, my journey, and my passion for technology.
        </p>
      </div>

      <div className={`about-container ${isVisible ? 'about-animate' : ''}`}>
        {/* Left: Profile Image */}
        <div className="about-image-col">
          <div className="about-image-wrapper">
            <div className="about-image-border"></div>
            <img
              className="about-profile-img"
              src={aboutData.profileImage}
              alt={aboutData.name}
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="about-content-col">
          {/* Name & Title */}
          <div className="about-intro">
            <span className="about-hello">Hello! I'm</span>
            <h3 className="about-name">{aboutData.name}</h3>
            <span className="about-title">{aboutData.title}</span>
          </div>

          <div className="about-divider"></div>

          {/* Biography */}
          <div className="about-block">
            <h4 className="about-block-heading">
              <i className="fas fa-book-open"></i> Biography
            </h4>
            {aboutData.bio.map((para, i) => (
              <p key={i} className="about-text">{para}</p>
            ))}
          </div>

          {/* Career Objective */}
          <div className="about-block">
            <h4 className="about-block-heading">
              <i className="fas fa-bullseye"></i> Career Objective
            </h4>
            <p className="about-text">{aboutData.careerObjective}</p>
          </div>

          <div className="about-divider"></div>

          {/* Personal Info */}
          <div className="about-block">
            <h4 className="about-block-heading">
              <i className="fas fa-id-card"></i> Personal Details
            </h4>
            <div className="about-info-grid">
              {aboutData.personalInfo.map((item, i) => (
                <div className="about-info-row" key={i}>
                  <span className="about-info-icon"><i className={item.icon}></i></span>
                  <span className="about-info-label">{item.label}</span>
                  {item.link ? (
                    <a href={item.link} className="about-info-value about-info-link">{item.value}</a>
                  ) : (
                    <span className="about-info-value">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="about-divider"></div>

          {/* Quick Facts */}
          <div className="about-block">
            <h4 className="about-block-heading">
              <i className="fas fa-bolt"></i> Quick Facts
            </h4>
            <div className="about-facts-grid">
              {aboutData.quickFacts.map((fact, i) => (
                <div className="about-fact-item" key={i}>
                  <i className="fas fa-check-circle"></i>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Button */}
          <button className="about-resume-btn" onClick={downloadResume}>
            <i className="fas fa-file-download"></i> Download Resume
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className={`about-stats-row ${isVisible ? 'about-animate' : ''}`}>
        {aboutData.stats.map((stat, i) => (
          <StatCard key={i} label={stat.label} value={stat.value} suffix={stat.suffix} />
        ))}
      </div>
    </section>
  );
};

export default About;
