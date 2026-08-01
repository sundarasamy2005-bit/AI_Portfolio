import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaFolderOpen, FaCheckCircle, FaSpinner, FaStar } from 'react-icons/fa';

const ProjectStats = ({ projects = [] }) => {
  const stats = useMemo(() => {
    const total = projects.length;
    const completed = projects.filter(
      (p) => (p.status || '').toLowerCase() === 'completed'
    ).length;
    const inProgress = projects.filter(
      (p) => (p.status || '').toLowerCase().includes('progress')
    ).length;
    const featured = projects.filter((p) => p.featured).length;

    return [
      { label: 'Total Projects', value: total, icon: FaFolderOpen, color: '#38BDF8' },
      { label: 'Completed', value: completed || total, icon: FaCheckCircle, color: '#22C55E' },
      { label: 'In Progress', value: inProgress, icon: FaSpinner, color: '#F59E0B' },
      { label: 'Featured', value: featured, icon: FaStar, color: '#EAB308' },
    ];
  }, [projects]);

  return (
    <motion.div
      className="project-stats-grid"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div key={idx} className="project-stat-card">
            <IconComponent className="project-stat-icon" style={{ color: stat.color }} />
            <div className="project-stat-content">
              <span className="project-stat-value">{stat.value}</span>
              <span className="project-stat-label">{stat.label}</span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default React.memo(ProjectStats);
