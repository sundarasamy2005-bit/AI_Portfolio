import React from 'react';

const Button = ({ children, onClick, variant = 'primary', icon, className = '', ...props }) => {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <i className={icon}></i>}
      {children}
    </button>
  );
};

export default Button;
