import './Hero.css';
import React, { useEffect, useState, useRef } from 'react';
import { heroData } from './HeroData';
import SplineScene from '../ui/spline-scene';
import Spotlight from '../ui/spotlight';
import { FaRocket, FaFileDownload, FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

const SPLINE_SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const Hero = () => {
  const [typingText, setTypingText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Fade-in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation
  useEffect(() => {
    const { roles } = heroData;
    let roleIdx = 0, charIdx = 0, deleting = false;
    let timer;

    const type = () => {
      const current = roles[roleIdx];
      if (!deleting && charIdx <= current.length) {
        setTypingText(current.substring(0, charIdx));
        charIdx++;
        if (charIdx > current.length) {
          deleting = true;
          timer = setTimeout(type, 2000);
          return;
        }
      } else if (deleting && charIdx >= 0) {
        setTypingText(current.substring(0, charIdx));
        charIdx--;
        if (charIdx < 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          charIdx = 0;
          timer = setTimeout(type, 300);
          return;
        }
      }
      timer = setTimeout(type, deleting ? 40 : 80);
    };

    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = heroData.resumePath;
    link.download = 'R_Sundarasamy_Resume.pdf';
    link.click();
  };

  return (
    <section id="home" className="hero-section" ref={sectionRef}>
      {/* Animated Background Orbs */}
      <div className="hero-bg">
        <div className="hero-particle hero-particle-1"></div>
        <div className="hero-particle hero-particle-2"></div>
        <div className="hero-particle hero-particle-3"></div>
        <div className="hero-particle hero-particle-4"></div>
        <div className="hero-particle hero-particle-5"></div>
      </div>

      {/* Spotlight Effect */}
      <Spotlight className="-top-20 left-0 md:left-60" size={320} />

      <div className={`hero-container ${isVisible ? 'hero-visible' : ''}`}>
        {/* Left Side: Hero Text & Actions */}
        <div className="hero-text">
          <span className="hero-greeting">{heroData.greeting}</span>
          <h1 className="hero-name">{heroData.name}</h1>
          <div className="hero-role-wrapper">
            <span className="hero-role">{typingText}</span>
            <span className="hero-cursor">|</span>
          </div>
          <p className="hero-bio">
            Full Stack Developer and AI enthusiast building responsive, modern, and user-focused web applications with React, Firebase, Node.js, and 3D web technologies.
          </p>

          {/* Action Buttons */}
          <div className="hero-buttons">
            <button className="hero-btn hero-btn-primary" onClick={scrollToProjects}>
              <FaRocket /> View Projects
            </button>
            <button className="hero-btn hero-btn-secondary" onClick={downloadResume}>
              <FaFileDownload /> Download Resume
            </button>
          </div>

          {/* Social Icons */}
          <div className="hero-socials">
            <a href={heroData.socialLinks.github} target="_blank" rel="noreferrer" className="hero-social-icon" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={heroData.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hero-social-icon" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={heroData.socialLinks.email} className="hero-social-icon" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href={heroData.socialLinks.instagram} target="_blank" rel="noreferrer" className="hero-social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Spline 3D Scene */}
        <div className="hero-spline-wrapper">
          <div className="hero-spline-card">
            <SplineScene scene={SPLINE_SCENE_URL} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
