import React from 'react';

const AboutCard = ({ title, content, icon }) => {
  return (
    <div className="bg-slate-800/70 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-md hover:border-sky-400 transition-all">
      {icon && <i className={`${icon} text-2xl text-blue-500 mb-3 block`}></i>}
      <h4 className="text-lg font-bold text-slate-100 mb-2">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{content}</p>
    </div>
  );
};

export default AboutCard;
