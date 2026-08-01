import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Achievements from '../components/Achievements/Achievements';
import Internships from '../components/Internships/Internships';
import Education from '../components/Education/Education';
import Resume from '../components/Resume/Resume';
import Contact from '../components/Contact/Contact';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/common/ScrollToTop';

const Home = () => {
  return (
    <>
      <div className="bg-3d">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
        <div className="orb orb4"></div>
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Internships />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Home;
