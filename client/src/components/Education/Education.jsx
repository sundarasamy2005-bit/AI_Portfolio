import './Education.css';
import React, { useEffect, useState } from 'react';
import { getEducation } from '../../services/educationService';
import { education as staticEducation } from '../../data/education';

const Education = () => {
  const [education, setEducation] = useState(staticEducation);

  useEffect(() => {
    getEducation()
      .then(data => {
        if (data && data.length > 0) setEducation(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="education">
      <h2 className="section-title">Education path</h2>
      <div className="edu-simple">
        {education.map((edu, idx) => (
          <React.Fragment key={idx}>
            <div className="edu-block">
              <i className={`${edu.icon} fa-3x`} style={{ color: edu.color }}></i>
              <h2>{edu.level}</h2>
              <p>{edu.institution} | {edu.duration}<br />{edu.score}</p>
            </div>
            {idx < education.length - 1 && <div className="wire-glow"></div>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Education;

