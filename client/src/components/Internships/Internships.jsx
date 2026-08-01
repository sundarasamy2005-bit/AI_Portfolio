import React, { useEffect, useState } from 'react';
import { getInternships } from '../../services/internshipService';
import { internships as staticInternships } from '../../data/internships';

const Internships = () => {
  const [internships, setInternships] = useState(staticInternships);

  useEffect(() => {
    getInternships()
      .then(data => {
        if (data && data.length > 0) setInternships(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="internships">
      <h2 className="section-title">Internships</h2>
      <div className="internships-grid" id="internshipsGrid">
        {internships.map((item, idx) => (
          <div className="intern-card" key={idx}>
            <img className="card-media" src={item.certImg} alt={item.title} />
            <div className="card-content">
              <div className="badge-implant">{item.implantBadge}</div>
              <div className="card-header">
                <h3>💼 {item.title}</h3>
              </div>
              <p><i className="fas fa-microchip"></i> {item.tech}</p>
              <p>{item.desc}</p>
              <div className="action-buttons">
                <i className="fas fa-external-link-alt icon-action open-icon-card" onClick={(e) => { e.stopPropagation(); window.open(item.driveLink, '_blank'); }}></i>
                <i className="fab fa-linkedin linkedin-icon" style={{ color: '#0a66c2', fontSize: '1.3rem' }} onClick={(e) => { e.stopPropagation(); window.open(item.linkedinLink, '_blank'); }}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Internships;
