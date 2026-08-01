import React, { useEffect, useState } from 'react';
import { getAchievements } from '../../services/achievementService';
import { achievements as staticAchievements } from '../../data/achievements';

const Achievements = () => {
  const [achievements, setAchievements] = useState(staticAchievements);

  useEffect(() => {
    getAchievements()
      .then(data => {
        if (data && data.length > 0) setAchievements(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="achievements">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Achievements</h2>
        <button id="viewExtraCertsBtn" className="btn-primary glow-btn" style={{ background: 'linear-gradient(95deg,#00c6ff,#6a11cb)' }} onClick={() => window.open('https://drive.google.com/drive/folders/extra_certificates', '_blank')}>
          <i className="fas fa-cloud-upload-alt"></i> View Certificates (More)
        </button>
      </div>
      <div className="achievements-grid" id="achievementsGrid">
        {achievements.map((ach, idx) => (
          <div className="achievement-card" key={idx}>
            <img className="card-media" src={ach.certImg} alt={ach.name} />
            <div className="card-content">
              <div className="card-header">
                <h3 style={{ color: '#38BDF8' }}>{ach.name}</h3>
              </div>
              <p>{ach.desc}</p>
              <div className="action-buttons">
                <i className="fas fa-external-link-alt icon-action open-icon-card" onClick={(e) => { e.stopPropagation(); window.open(ach.driveLink, '_blank'); }}></i>
                <i className="fab fa-linkedin linkedin-icon" style={{ color: '#0a66c2', fontSize: '1.3rem' }} onClick={(e) => { e.stopPropagation(); window.open(ach.linkedinPost, '_blank'); }}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
