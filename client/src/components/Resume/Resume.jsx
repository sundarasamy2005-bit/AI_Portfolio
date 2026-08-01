import React from 'react';
import './Resume.css';

const Resume = () => {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'R_Sundarasamy_Resume.pdf';
    link.click();
  };

  return (
    <section id="resume" className="resume-section">
      <div className="section-header">
        <h2 className="section-title">Resume</h2>
        <p className="section-subtitle">Download my resume to learn more about my experience and qualifications.</p>
      </div>
      <div className="resume-container">
        <div className="resume-card">
          <div className="resume-icon">
            <i className="fas fa-file-pdf"></i>
          </div>
          <h3>R. Sundarasamy</h3>
          <p>Full Stack Developer | B.E. CSE</p>
          <div className="resume-highlights">
            <span><i className="fas fa-check-circle"></i> MERN Stack</span>
            <span><i className="fas fa-check-circle"></i> React & Firebase</span>
            <span><i className="fas fa-check-circle"></i> AI & ML</span>
            <span><i className="fas fa-check-circle"></i> Python & Java</span>
          </div>
          <button className="resume-download-btn" onClick={downloadResume}>
            <i className="fas fa-download"></i> Download Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Resume;
