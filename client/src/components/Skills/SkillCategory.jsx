import React from 'react';
import { motion } from 'framer-motion';
import SkillCard from './SkillCard';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      duration: 0.4,
    },
  },
};

const SkillCategory = ({ title, skills = [] }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <motion.div
      className="skill-category"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <h3 className="skill-category-title">{title}</h3>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.name || skill.id || index}
            name={skill.name}
            icon={skill.icon}
            level={skill.level}
            experience={skill.experience}
            status={skill.status}
            rating={skill.rating}
            color={skill.color}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default React.memo(SkillCategory);
