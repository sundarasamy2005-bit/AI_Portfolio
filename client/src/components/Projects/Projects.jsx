import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import ProjectFilter from './ProjectFilter';
import ProjectStats from './ProjectStats';
import Loader from '../common/Loader';
import SectionTitle from '../common/SectionTitle';
import { FaFolderOpen } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const { projects, loading } = useProjects();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Extract unique technology list for dropdown
  const techList = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      const list = p.technologies || (p.languages ? p.languages.split(',').map((s) => s.trim()) : []);
      list.forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [projects]);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((p) => {
      // Category check
      if (activeCategory === 'Featured' && !p.featured) return false;
      if (
        activeCategory !== 'All' &&
        activeCategory !== 'Featured' &&
        (p.category || '').toLowerCase() !== activeCategory.toLowerCase()
      ) {
        return false;
      }

      // Tech filter check
      if (selectedTech) {
        const pTechs = p.technologies || (p.languages ? p.languages.split(',').map((s) => s.trim()) : []);
        if (!pTechs.includes(selectedTech)) return false;
      }

      // Search query check
      if (query) {
        const titleMatch = (p.title || p.name || '').toLowerCase().includes(query);
        const descMatch = (p.description || p.details || '').toLowerCase().includes(query);
        const pTechs = p.technologies || (p.languages ? p.languages.split(',').map((s) => s.trim()) : []);
        const techMatch = pTechs.some((t) => t.toLowerCase().includes(query));
        return titleMatch || descMatch || techMatch;
      }

      return true;
    });
  }, [projects, activeCategory, searchQuery, selectedTech]);

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSelectedTech('');
  };

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <SectionTitle
        id="projects-heading"
        title="My Projects"
        subtitle="A collection of projects showcasing my skills in full-stack development, AI, and modern web technologies."
      />

      {/* Project Statistics Banner */}
      <ProjectStats projects={projects} />

      {/* Project Filters & Search Bar */}
      <ProjectFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTech={selectedTech}
        onTechChange={setSelectedTech}
        techList={techList}
      />

      {loading && (
        <div className="projects-loader-container" aria-live="polite">
          <Loader text="Loading project portfolio..." />
        </div>
      )}

      {!loading && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${searchQuery}-${selectedTech}`}
            className="projects-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id || project.title}
                  project={project}
                  onOpenModal={setSelectedProject}
                />
              ))
            ) : (
              <div className="projects-empty-state">
                <FaFolderOpen className="empty-icon" />
                <p>No projects match your selected filters or search query.</p>
                <button className="projects-reset-btn" onClick={handleResetFilters}>
                  Reset All Filters
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default React.memo(Projects);
