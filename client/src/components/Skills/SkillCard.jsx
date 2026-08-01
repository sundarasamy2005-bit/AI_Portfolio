import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaFigma,
  FaDatabase,
  FaCode,
  FaTerminal,
  FaStar,
  FaStarHalfAlt
} from 'react-icons/fa';
import {
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiMysql,
  SiTailwindcss,
  SiCplusplus,
  SiPostman,
  SiVercel
} from 'react-icons/si';

// Helper to resolve icon component by string key
const resolveIcon = (iconName) => {
  if (!iconName) return <FaCode />;
  const normalized = iconName.toLowerCase().replace(/[^a-z0-9]/g, '');

  switch (normalized) {
    case 'html':
    case 'html5':
      return <FaHtml5 />;
    case 'css':
    case 'css3':
      return <FaCss3Alt />;
    case 'javascript':
    case 'js':
      return <SiJavascript />;
    case 'react':
    case 'reactjs':
      return <FaReact />;
    case 'tailwind':
    case 'tailwindcss':
      return <SiTailwindcss />;
    case 'node':
    case 'nodejs':
      return <FaNodeJs />;
    case 'express':
    case 'expressjs':
      return <SiExpress />;
    case 'python':
      return <FaPython />;
    case 'java':
      return <FaJava />;
    case 'cplusplus':
    case 'cpp':
      return <SiCplusplus />;
    case 'mongodb':
    case 'mongo':
      return <SiMongodb />;
    case 'firebase':
      return <SiFirebase />;
    case 'mysql':
    case 'sql':
      return <SiMysql />;
    case 'git':
      return <FaGitAlt />;
    case 'github':
      return <FaGithub />;
    case 'docker':
      return <FaDocker />;
    case 'figma':
      return <FaFigma />;
    case 'postman':
      return <SiPostman />;
    case 'vercel':
    case 'vscode':
      return <SiVercel />;
    case 'database':
      return <FaDatabase />;
    case 'tools':
      return <FaTerminal />;
    default:
      return <FaCode />;
  }
};

const RenderStars = ({ rating = 4 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="skill-star-icon" />);
  }
  if (hasHalf) {
    stars.push(<FaStarHalfAlt key="half" className="skill-star-icon" />);
  }
  return <div className="skill-stars">{stars}</div>;
};

const SkillCard = ({ name, icon, level = 0, experience, status, rating = 4, color }) => {
  const IconComponent = useMemo(() => resolveIcon(icon), [icon]);

  return (
    <motion.div
      className="skill-card"
      whileHover={{ scale: 1.03, translateY: -4 }}
      transition={{ duration: 0.2 }}
      tabIndex={0}
      role="article"
      aria-label={`${name} skill level ${level}%`}
    >
      <div className="skill-card-top">
        <div className="skill-header">
          <span className="skill-icon" style={{ color: color || 'var(--accent)' }}>
            {IconComponent}
          </span>
          <div className="skill-title-block">
            <span className="skill-name">{name}</span>
            <RenderStars rating={rating} />
          </div>
        </div>

        {(experience || status) && (
          <div className="skill-badges">
            {experience && <span className="skill-badge skill-exp-badge">{experience}</span>}
            {status && <span className="skill-badge skill-status-badge">{status}</span>}
          </div>
        )}
      </div>

      <div
        className="skill-level-bar"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            background: color
              ? `linear-gradient(90deg, ${color}, var(--accent))`
              : 'var(--gradient-progress)'
          }}
        />
      </div>

      <div className="skill-card-bottom" aria-hidden="true">
        <span className="skill-level-tag">{status || 'Proficient'}</span>
        <span className="percentage-text">{level}% Mastery</span>
      </div>
    </motion.div>
  );
};

export default React.memo(SkillCard);
