import React from 'react';

const EducationCard = ({ item }) => {
  const { icon, color, level, institution, college, details, degree, duration, year, score, cgpa } = item;
  const heading = level || institution || college;
  const subtext = details || `${degree || ''} | ${duration || year || ''}`;
  const scoreText = score || (cgpa ? `CGPA: ${cgpa}` : '');

  return (
    <div className="edu-block">
      <i className={`${icon || 'fas fa-graduation-cap'} fa-3x`} style={{ color: color || '#3B82F6' }}></i>
      <h2>{heading}</h2>
      <p>{subtext}<br />{scoreText}</p>
    </div>
  );
};

export default EducationCard;
