import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle, FaStar, FaHeart, FaCalendarAlt } from 'react-icons/fa';

const ProjectCard = ({ project, onOpenModal }) => {
  const [isLiked, setIsLiked] = useState(false);

  const {
    title,
    name,
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
    year = '2026'
  } = project;

  const projectTitle = name || title;
  const projectImg = img || image;
  const projectDesc = details || description;
  const projectTechs = technologies.length > 0
    ? technologies
    : (languages ? languages.split(',').map((s) => s.trim()) : ['React', 'Web']);
  const liveUrl = liveDemo || live;

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  return (
    <motion.div
      className={`project-card ${featured ? 'featured-card' : ''}`}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      tabIndex={0}
      role="article"
      aria-label={`${projectTitle} project card`}
      onClick={() => onOpenModal && onOpenModal(project)}
    >
      {/* Featured Ribbon */}
      {featured && (
        <div className="project-featured-ribbon" aria-label="Featured project">
          <FaStar /> Featured
        </div>
      )}

      {/* Media Header */}
      <div className="project-media-wrapper">
        <img
          className="card-media"
          src={projectImg}
          alt={projectTitle}
          loading="lazy"
        />
        <div className="project-media-overlay" />

        {/* Favorite Heart Button */}
        <button
          className={`project-like-btn ${isLiked ? 'liked' : ''}`}
          onClick={toggleLike}
          aria-label={isLiked ? 'Unlike project' : 'Like project'}
        >
          <FaHeart />
        </button>

        {/* Status Badge */}
        <span className={`project-status-badge ${status.toLowerCase().replace(/\s+/g, '-')}`}>
          {status}
        </span>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div className="card-header-row">
          <h3 className="project-card-title">{projectTitle}</h3>
          {year && (
            <span className="project-year-tag">
              <FaCalendarAlt /> {year}
            </span>
          )}
        </div>

        <p className="project-card-desc">{projectDesc}</p>

        {/* Technology Badges */}
        <div className="project-tech-badges" aria-label="Technologies used">
          {projectTechs.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="tech-badge">
              {tech}
            </span>
          ))}
          {projectTechs.length > 4 && (
            <span className="tech-badge extra-tech">+{projectTechs.length - 4}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {liveUrl && (
            <button
              className="btn-small live-action"
              onClick={(e) => {
                e.stopPropagation();
                window.open(liveUrl, '_blank', 'noopener,noreferrer');
              }}
              aria-label={`View live demo for ${projectTitle}`}
            >
              <FaExternalLinkAlt /> Live Demo
            </button>
          )}

          {github && (
            <button
              className="btn-small github-action"
              onClick={(e) => {
                e.stopPropagation();
                window.open(github, '_blank', 'noopener,noreferrer');
              }}
              aria-label={`View GitHub repository for ${projectTitle}`}
            >
              <FaGithub /> Code
            </button>
          )}

          <button
            className="btn-small details-action"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenModal) onOpenModal(project);
            }}
            aria-label={`View full details for ${projectTitle}`}
          >
            <FaInfoCircle /> Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
