import React from 'react';
import { NAV_LINKS } from '../../utils/constants';

const Sidebar = ({ isOpen, onClose, activeSection }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col p-6 text-white md:hidden">
      <div className="flex justify-between items-center mb-8">
        <span className="text-xl font-bold text-sky-400">✨ Portfolio</span>
        <button onClick={onClose} className="text-2xl font-bold">&times;</button>
      </div>
      <nav className="flex flex-col gap-4">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={onClose}
            className={`py-2 px-4 rounded-lg font-medium transition-colors ${
              activeSection === link.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
