import './Hero.css';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { heroData } from './HeroData';
import SplineScene from '../ui/spline-scene';
import Spotlight from '../ui/spotlight';
import { FaRocket, FaFileDownload, FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaChevronDown } from 'react-icons/fa';

const SPLINE_SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const robotVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 } },
};

const Hero = () => {
  const [typingText, setTypingText] = useState('');
  const sectionRef = useRef(null);

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

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = heroData.resumePath;
    link.download = 'R_Sundarasamy_Resume.pdf';
    link.click();
  };

  return (
    <section id="home" className="hero-section" ref={sectionRef}>
      {/* Background Particles & Orbs */}
      <div className="hero-bg">
        <div className="hero-particle hero-particle-1"></div>
        <div className="hero-particle hero-particle-2"></div>
        <div className="hero-particle hero-particle-3"></div>
        <div className="hero-particle hero-particle-4"></div>
        <div className="hero-particle hero-particle-5"></div>
      </div>

      {/* Text Gradient Overlay for High Contrast Reading */}
      <div className="hero-gradient-overlay" />

      {/* Spotlight Effect */}
      <Spotlight className="-top-20 left-0 md:left-60" size={340} />

      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side: Hero Text & Actions */}
        <div className="hero-text">
          <motion.span className="hero-greeting" variants={itemVariants}>
            👋 Hello, I'm
          </motion.span>

          <motion.h1 className="hero-name" variants={itemVariants}>
            R. Sundarasamy
          </motion.h1>

          <motion.div className="hero-role-wrapper" variants={itemVariants}>
            <span className="hero-role">{typingText}</span>
            <span className="hero-cursor">|</span>
          </motion.div>

          <motion.p className="hero-bio" variants={itemVariants}>
            I build responsive, scalable, and user-focused web applications using React, Node.js, Firebase, MongoDB, and modern AI technologies.
          </motion.p>

          {/* Action Buttons */}
          <motion.div className="hero-buttons" variants={itemVariants}>
            <button className="hero-btn hero-btn-primary" onClick={scrollToProjects}>
              <FaRocket /> View Projects
            </button>
            <button className="hero-btn hero-btn-secondary" onClick={downloadResume}>
              <FaFileDownload /> Download Resume
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div className="hero-socials" variants={itemVariants}>
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
          </motion.div>
        </div>

        {/* Right Side: Full Height Interactive 3D Robot (Spline) */}
        <motion.div className="hero-robot-wrapper" variants={robotVariants}>
          <div className="hero-robot-container">
            <SplineScene scene={SPLINE_SCENE_URL} className="w-full h-full" />
          </div>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        className="hero-scroll-down"
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        role="button"
        tabIndex={0}
        aria-label="Scroll down to About section"
      >
        <span className="scroll-text">Scroll Down</span>
        <FaChevronDown className="scroll-arrow" />
      </motion.div>
    </section>
  );
};

export default Hero;
