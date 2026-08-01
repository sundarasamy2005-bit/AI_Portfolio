import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkills } from '../../hooks/useSkills';
import SkillCategory from './SkillCategory';
import Loader from '../common/Loader';
import SectionTitle from '../common/SectionTitle';
import { FaCode, FaFolderOpen, FaClock, FaSearch, FaFilter } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const { skills, loading } = useSkills();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract category tab names
  const categories = useMemo(() => {
    if (!skills || skills.length === 0) return [];
    return [
      { id: 'all', title: 'All Skills' },
      ...skills.map((c) => ({
        id: (c.id || c.title || '').toLowerCase().replace(/[^a-z0-9]/g, ''),
        title: c.title || c.name || 'Category',
        rawCategory: c,
      })),
    ];
  }, [skills]);

  // Calculate total stats
  const stats = useMemo(() => {
    let totalSkills = 0;
    skills.forEach((cat) => {
      totalSkills += cat.skills ? cat.skills.length : 0;
    });
    return {
      techCount: totalSkills || 18,
      projectsCount: '20+',
      yearsExp: '2+ Yrs',
    };
  }, [skills]);

  // Filter skills based on tab and search query
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return skills
      .map((cat) => {
        const catId = (cat.id || cat.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');

        // Tab match check
        const matchesTab = activeTab === 'all' || catId.includes(activeTab) || activeTab.includes(catId);
        if (!matchesTab) return null;

        // Search match check
        const matchingSkills = (cat.skills || []).filter((s) => {
          if (!query) return true;
          return (
            s.name.toLowerCase().includes(query) ||
            (s.status && s.status.toLowerCase().includes(query)) ||
            (s.icon && s.icon.toLowerCase().includes(query))
          );
        });

        if (matchingSkills.length === 0) return null;

        return {
          ...cat,
          skills: matchingSkills,
        };
      })
      .filter(Boolean);
  }, [skills, activeTab, searchQuery]);

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <SectionTitle
        id="skills-heading"
        title="Technical Proficiency & Skills"
        subtitle="Technologies, frameworks, databases, and tools I use to craft modern web applications."
      />

      {/* Skill Statistics Banner */}
      <motion.div
        className="skills-stats-banner"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="skills-stat-card">
          <FaCode className="skills-stat-icon" />
          <div className="skills-stat-info">
            <span className="skills-stat-num">{stats.techCount}+</span>
            <span className="skills-stat-label">Technologies</span>
          </div>
        </div>
        <div className="skills-stat-divider" />
        <div className="skills-stat-card">
          <FaFolderOpen className="skills-stat-icon" />
          <div className="skills-stat-info">
            <span className="skills-stat-num">{stats.projectsCount}</span>
            <span className="skills-stat-label">Projects Built</span>
          </div>
        </div>
        <div className="skills-stat-divider" />
        <div className="skills-stat-card">
          <FaClock className="skills-stat-icon" />
          <div className="skills-stat-info">
            <span className="skills-stat-num">{stats.yearsExp}</span>
            <span className="skills-stat-label">Learning & Building</span>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs & Search Bar Controls */}
      <div className="skills-controls-row">
        {/* Category Tabs */}
        <div className="skills-tabs" role="tablist" aria-label="Skill categories">
          {categories.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`skills-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Search Bar Input */}
        <div className="skills-search-box">
          <FaSearch className="skills-search-icon" />
          <input
            type="text"
            placeholder="Search skills (e.g. React, Python)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search skills by keyword"
          />
          {searchQuery && (
            <button className="skills-search-clear" onClick={() => setSearchQuery('')}>
              &times;
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="skills-loader-container" aria-live="polite">
          <Loader text="Loading tech stack..." />
        </div>
      )}

      {!loading && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${searchQuery}`}
            className="skills-categories-wrapper"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, idx) => (
                <SkillCategory
                  key={category.id || category.title || idx}
                  title={category.title || category.name || `Category ${idx + 1}`}
                  skills={category.skills || []}
                />
              ))
            ) : (
              <div className="skills-empty-state">
                <FaFilter className="empty-icon" />
                <p>No skills found matching "{searchQuery}". Try a different search term or category tab.</p>
                <button
                  className="skills-reset-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('all');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};

export default React.memo(Skills);
