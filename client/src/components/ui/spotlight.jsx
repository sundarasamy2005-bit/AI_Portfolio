import React, { useState, useEffect, useRef, useCallback } from 'react';

export const Spotlight = ({ className = '', size = 300 }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.parentElement?.getBoundingClientRect();
    if (rect) {
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ${className}`}
      style={{
        opacity,
        background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, rgba(56, 189, 248, 0.15), transparent 80%)`,
      }}
    />
  );
};

export default Spotlight;
