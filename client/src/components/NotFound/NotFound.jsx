import React from 'react';

const NotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 800, background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', color: 'transparent' }}>404</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>Page not found</p>
      <a href="/" style={{ padding: '0.8rem 2rem', background: 'var(--primary)', color: '#fff', borderRadius: '40px', textDecoration: 'none', fontWeight: 600 }}>Go Home</a>
    </div>
  );
};

export default NotFound;
