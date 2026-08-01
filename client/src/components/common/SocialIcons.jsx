import React from 'react';

const SocialIcons = ({ links = {}, size = 'md', className = '' }) => {
  const icons = [
    { key: 'github', icon: 'fab fa-github', label: 'GitHub' },
    { key: 'linkedin', icon: 'fab fa-linkedin', label: 'LinkedIn' },
    { key: 'email', icon: 'fas fa-envelope', label: 'Email' },
    { key: 'instagram', icon: 'fab fa-instagram', label: 'Instagram' },
  ];

  return (
    <div className={`social-icons social-icons-${size} ${className}`}>
      {icons.map(({ key, icon, label }) => {
        const url = links[key];
        if (!url) return null;
        return (
          <a
            key={key}
            href={url}
            target={key === 'email' ? '_self' : '_blank'}
            rel="noreferrer"
            className="social-icon-link"
            aria-label={label}
          >
            <i className={icon}></i>
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
