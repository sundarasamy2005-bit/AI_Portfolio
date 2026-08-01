import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const CATEGORY_OPTIONS = ['All', 'Featured', 'Web', 'AI', 'UI/UX'];

const ProjectFilter = ({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  selectedTech,
  onTechChange,
  techList = [],
}) => {
  return (
    <div className="project-controls-wrapper">
      {/* Category Pills */}
      <div className="project-filter-tabs" role="tablist" aria-label="Project category filters">
        {CATEGORY_OPTIONS.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={`project-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat === 'Featured' ? '⭐ Featured' : cat}
          </button>
        ))}
      </div>

      {/* Search Input and Tech Tag Filter */}
      <div className="project-search-filter-row">
        <div className="project-search-box">
          <FaSearch className="project-search-icon" />
          <input
            type="text"
            placeholder="Search by title, tech (e.g. React)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search projects by keyword"
          />
          {searchQuery && (
            <button className="project-search-clear" onClick={() => onSearchChange('')}>
              &times;
            </button>
          )}
        </div>

        {techList.length > 0 && (
          <div className="project-tech-select-wrapper">
            <FaFilter className="project-filter-icon" />
            <select
              value={selectedTech}
              onChange={(e) => onTechChange(e.target.value)}
              className="project-tech-select"
              aria-label="Filter by technology"
            >
              <option value="">All Technologies</option>
              {techList.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProjectFilter);
