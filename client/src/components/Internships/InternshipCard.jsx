import React from 'react';

const InternshipCard = ({ item }) => {
  return (
    <div className="intern-card">
      <img className="card-media" src={item.certImg || item.image} alt={item.title} />
      <div className="card-content">
        {item.implantBadge && <div className="badge-implant">{item.implantBadge}</div>}
        <div className="card-header">
          <h3>💼 {item.title}</h3>
        </div>
        <p><i className="fas fa-microchip"></i> {item.tech}</p>
        <p>{item.desc || item.description}</p>
        <div className="action-buttons">
          {item.driveLink && (
            <i className="fas fa-external-link-alt icon-action open-icon-card" onClick={(e) => { e.stopPropagation(); window.open(item.driveLink, '_blank'); }}></i>
          )}
          {item.linkedinLink && (
            <i className="fab fa-linkedin linkedin-icon" style={{ color: '#0a66c2', fontSize: '1.3rem' }} onClick={(e) => { e.stopPropagation(); window.open(item.linkedinLink, '_blank'); }}></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
