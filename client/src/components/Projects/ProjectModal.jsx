import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCheckCircle, FaStar, FaCalendarAlt } from 'react-icons/fa';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const ProjectModal = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const {
    title,
    name,
    category = 'Web Application',
    description,
    details,
    image,
    img,
    github,
    liveDemo,
    live,
    technologies = [],
    languages,
    featured,
    status = 'Completed',
    year = '2026',
    screenshots = [],
    features = []
  } = project;

  const projectTitle = name || title;
  const projectImg = img || image;
  const projectDesc = details || description;
  const projectTechs = technologies.length > 0
    ? technologies
    : (languages ? languages.split(',').map((s) => s.trim()) : ['React']);
  const liveUrl = liveDemo || live;

  // Combine main image with screenshots for carousel
  const allImages = [projectImg, ...(screenshots || [])].filter(Boolean);
  const currentImage = allImages[activeImageIndex] || projectImg;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay active"
        onClick={onClose}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <motion.div
          className="project-modal-container"
          onClick={(e) => e.stopPropagation()}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          tabIndex={-1}
        >
          {/* Close Button */}
          <button
            className="project-modal-close"
            onClick={onClose}
            aria-label="Close project modal"
          >
            <FaTimes />
          </button>

          {/* Modal Header Badge */}
          <div className="project-modal-badges">
            {featured && <span className="modal-badge modal-badge-featured"><FaStar /> Featured</span>}
            <span className="modal-badge modal-badge-category">{category}</span>
            <span className="modal-badge modal-badge-year"><FaCalendarAlt /> {year}</span>
            <span className="modal-badge modal-badge-status">{status}</span>
          </div>

          <h2 id="modal-project-title" className="project-modal-title">
            {projectTitle}
          </h2>

          {/* Main Image Display */}
          <div className="project-modal-media-container">
            <img src={currentImage} alt={projectTitle} className="project-modal-main-img" />
          </div>

          {/* Screenshots Gallery Carousel Thumbnails */}
          {allImages.length > 1 && (
            <div className="project-modal-thumbnails" aria-label="Project screenshot gallery">
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  className={`modal-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={imgUrl} alt={`${projectTitle} screenshot ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="project-modal-body">
            <p className="project-modal-desc">{projectDesc}</p>

            {/* Key Features List */}
            {features.length > 0 && (
              <div className="project-modal-section">
                <h4>Key Features</h4>
                <ul className="project-modal-features-list">
                  {features.map((feat, idx) => (
                    <li key={idx}>
                      <FaCheckCircle className="feature-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="project-modal-section">
              <h4>Technologies & Libraries</h4>
              <div className="project-modal-tech-list">
                {projectTechs.map((tech, idx) => (
                  <span key={idx} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="project-modal-actions">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <FaExternalLinkAlt /> Live Preview
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FaGithub /> Source Code
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(ProjectModal);
