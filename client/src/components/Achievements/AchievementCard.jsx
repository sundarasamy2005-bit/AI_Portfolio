import React from 'react';

const AchievementCard = ({ achievement, onOpenModal }) => {
  return (
    <div className="achievement-card">
      <img className="card-media" src={achievement.certImg || achievement.image} alt={achievement.name || achievement.title} />
      <div className="card-content">
        <div className="card-header">
          <h3 style={{ color: '#38BDF8' }}>{achievement.name || achievement.title}</h3>
        </div>
        <p>{achievement.desc || achievement.description}</p>
        <div className="action-buttons">
          <i className="fas fa-external-link-alt icon-action open-icon-card" onClick={(e) => { e.stopPropagation(); if (onOpenModal) onOpenModal(achievement); }}></i>
          {achievement.linkedinPost && (
            <i className="fab fa-linkedin linkedin-icon" style={{ color: '#0a66c2', fontSize: '1.3rem' }} onClick={(e) => { e.stopPropagation(); window.open(achievement.linkedinPost, '_blank'); }}></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
