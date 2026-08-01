import { useState, useEffect, useMemo } from 'react';
import { getSkills } from '../services/skillService';

export const DEFAULT_SKILL_CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React.js', icon: 'react', level: 88, experience: '2+ Yrs', status: 'Advanced', rating: 5, color: '#61DAFB' },
      { name: 'JavaScript (ES6+)', icon: 'javascript', level: 90, experience: '3+ Yrs', status: 'Advanced', rating: 5, color: '#F7DF1E' },
      { name: 'HTML5', icon: 'html5', level: 95, experience: '3+ Yrs', status: 'Expert', rating: 5, color: '#E34F26' },
      { name: 'CSS3', icon: 'css3', level: 90, experience: '3+ Yrs', status: 'Advanced', rating: 5, color: '#1572B6' },
      { name: 'Tailwind CSS', icon: 'tailwind', level: 85, experience: '2+ Yrs', status: 'Intermediate', rating: 4, color: '#06B6D4' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'nodejs', level: 85, experience: '2+ Yrs', status: 'Advanced', rating: 4, color: '#339933' },
      { name: 'Express.js', icon: 'express', level: 82, experience: '2+ Yrs', status: 'Intermediate', rating: 4, color: '#38BDF8' },
      { name: 'Python', icon: 'python', level: 80, experience: '2+ Yrs', status: 'Intermediate', rating: 4, color: '#3776AB' },
      { name: 'Java', icon: 'java', level: 78, experience: '2+ Yrs', status: 'Intermediate', rating: 4, color: '#5382A1' }
    ]
  },
  {
    id: 'database',
    title: 'Database',
    skills: [
      { name: 'MongoDB', icon: 'mongodb', level: 82, experience: '2+ Yrs', status: 'Intermediate', rating: 4, color: '#47A248' },
      { name: 'Firebase Firestore', icon: 'firebase', level: 85, experience: '2+ Yrs', status: 'Advanced', rating: 4, color: '#FFCA28' },
      { name: 'MySQL', icon: 'mysql', level: 78, experience: '2+ Yrs', status: 'Intermediate', rating: 4, color: '#4479A1' }
    ]
  },
  {
    id: 'languages',
    title: 'Languages',
    skills: [
      { name: 'JavaScript', icon: 'javascript', level: 90, experience: '3+ Yrs', status: 'Advanced', rating: 5, color: '#F7DF1E' },
      { name: 'Python', icon: 'python', level: 82, experience: '2+ Yrs', status: 'Intermediate', rating: 4, color: '#3776AB' },
      { name: 'Java', icon: 'java', level: 78, experience: '2+ Yrs', status: 'Intermediate', rating: 4, color: '#5382A1' },
      { name: 'C++', icon: 'cplusplus', level: 75, experience: '1+ Yr', status: 'Intermediate', rating: 3, color: '#00599C' }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: 'git', level: 88, experience: '3+ Yrs', status: 'Advanced', rating: 5, color: '#F05032' },
      { name: 'GitHub', icon: 'github', level: 90, experience: '3+ Yrs', status: 'Advanced', rating: 5, color: '#F8FAFC' },
      { name: 'VS Code', icon: 'vscode', level: 95, experience: '3+ Yrs', status: 'Expert', rating: 5, color: '#007ACC' },
      { name: 'Postman', icon: 'postman', level: 85, experience: '2+ Yrs', status: 'Advanced', rating: 4, color: '#FF6C37' },
      { name: 'Docker', icon: 'docker', level: 75, experience: '1+ Yr', status: 'Intermediate', rating: 3, color: '#2496ED' },
      { name: 'Figma', icon: 'figma', level: 85, experience: '2+ Yrs', status: 'Advanced', rating: 4, color: '#F24E1E' },
      { name: 'Vercel / Netlify', icon: 'vercel', level: 88, experience: '2+ Yrs', status: 'Advanced', rating: 4, color: '#38BDF8' }
    ]
  }
];

export const useSkills = () => {
  const [skills, setSkills] = useState(DEFAULT_SKILL_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSkillsData = async () => {
      try {
        setLoading(true);
        const data = await getSkills();
        if (isMounted) {
          if (data && data.length > 0) {
            setSkills(data);
          } else {
            setSkills(DEFAULT_SKILL_CATEGORIES);
          }
        }
      } catch (err) {
        if (isMounted) {
          // Log warning for debug, but serve default categories smoothly
          console.info('Notice: Using default skills data until Firestore collection is populated.');
          setSkills(DEFAULT_SKILL_CATEGORIES);
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSkillsData();

    return () => {
      isMounted = false;
    };
  }, []);

  const memoizedSkills = useMemo(() => skills, [skills]);

  return { skills: memoizedSkills, loading, error };
};
