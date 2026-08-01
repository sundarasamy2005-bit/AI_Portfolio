import { useState, useEffect, useMemo } from 'react';
import { getProjects } from '../services/projectService';

export const DEFAULT_PROJECTS = [
  {
    id: 'connecthub',
    title: 'ConnectHub Social Platform',
    name: 'ConnectHub Social Platform',
    category: 'Web',
    description: 'Modern full-stack social networking platform featuring real-time messaging, post feeds, user profiles, and interactive notifications.',
    details: 'Modern full-stack social networking platform featuring real-time messaging, post feeds, user profiles, and interactive notifications.',
    image: 'https://picsum.photos/id/20/600/400',
    img: 'https://picsum.photos/id/20/600/400',
    github: 'https://github.com/yourusername/connecthub',
    liveDemo: 'https://connecthub-demo.web.app',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'Node.js'],
    languages: 'React, Firebase, Tailwind CSS',
    featured: true,
    status: 'Completed',
    year: '2026',
    screenshots: [
      'https://picsum.photos/id/20/600/400',
      'https://picsum.photos/id/26/600/400',
      'https://picsum.photos/id/1/600/400'
    ],
    features: [
      'Firebase Authentication & Security Rules',
      'Real-time Firestore Database sync',
      'Responsive Glassmorphism Dashboard UI',
      'Media uploads via Firebase Storage'
    ]
  },
  {
    id: 'portfolio-xr',
    title: '3D Portfolio XR',
    name: '3D Portfolio XR',
    category: 'UI/UX',
    description: 'Immersive 3D interactive web portfolio built with Three.js, React, and Framer Motion featuring dynamic orb particle physics.',
    details: 'Immersive 3D interactive web portfolio built with Three.js, React, and Framer Motion featuring dynamic orb particle physics.',
    image: 'https://picsum.photos/id/26/600/400',
    img: 'https://picsum.photos/id/26/600/400',
    github: 'https://github.com/yourusername/portfolio-xr',
    liveDemo: 'https://portfolio-xr-demo.web.app',
    technologies: ['React', 'Three.js', 'Framer Motion', 'WebGL'],
    languages: 'React, Three.js, GSAP',
    featured: true,
    status: 'Completed',
    year: '2026',
    screenshots: [
      'https://picsum.photos/id/26/600/400',
      'https://picsum.photos/id/29/600/400'
    ],
    features: [
      'Interactive 3D WebGL Scene & Lighting',
      'Particle system animations',
      'Smooth scroll-triggered camera control',
      'Accessibility Fallbacks & High Contrast Mode'
    ]
  },
  {
    id: 'flowboard-ai',
    title: 'FlowBoard AI Task Manager',
    name: 'FlowBoard AI Task Manager',
    category: 'AI',
    description: 'Smart AI-assisted productivity taskboard that auto-prioritizes tickets using OpenAI APIs and smart Kanban workflows.',
    details: 'Smart AI-assisted productivity taskboard that auto-prioritizes tickets using OpenAI APIs and smart Kanban workflows.',
    image: 'https://picsum.photos/id/1/600/400',
    img: 'https://picsum.photos/id/1/600/400',
    github: 'https://github.com/yourusername/flowboard-ai',
    liveDemo: 'https://flowboard-ai.web.app',
    technologies: ['React', 'Python', 'OpenAI API', 'FastAPI'],
    languages: 'React, Python, OpenAI API',
    featured: true,
    status: 'Completed',
    year: '2025',
    screenshots: [
      'https://picsum.photos/id/1/600/400',
      'https://picsum.photos/id/91/600/400'
    ],
    features: [
      'Automated Task Summarization & Estimates',
      'Kanban Drag-and-Drop Interface',
      'Team Collaboration & Role-Based Access'
    ]
  },
  {
    id: 'weathervue-3d',
    title: 'WeatherVue 3D',
    name: 'WeatherVue 3D',
    category: 'Web',
    description: 'Real-time weather analytics application featuring interactive 3D globe visualizations and hyper-local forecasting APIs.',
    details: 'Real-time weather analytics application featuring interactive 3D globe visualizations and hyper-local forecasting APIs.',
    image: 'https://picsum.photos/id/29/600/400',
    img: 'https://picsum.photos/id/29/600/400',
    github: 'https://github.com/yourusername/weathervue',
    liveDemo: 'https://weathervue.web.app',
    technologies: ['JavaScript', 'Three.js', 'OpenWeather API', 'CSS3'],
    languages: 'JavaScript, OpenWeather API',
    featured: false,
    status: 'Completed',
    year: '2025',
    screenshots: ['https://picsum.photos/id/29/600/400'],
    features: [
      '3D Globe Geo-location search',
      'Live weather radar & 7-day forecasts',
      'Offline Caching & PWA support'
    ]
  },
  {
    id: 'socialpulse-analytics',
    title: 'SocialPulse Dashboard',
    name: 'SocialPulse Dashboard',
    category: 'Web',
    description: 'Real-time social media metrics dashboard tracking engagement analytics, sentiment scores, and campaign ROI.',
    details: 'Real-time social media metrics dashboard tracking engagement analytics, sentiment scores, and campaign ROI.',
    image: 'https://picsum.photos/id/91/600/400',
    img: 'https://picsum.photos/id/91/600/400',
    github: 'https://github.com/yourusername/socialpulse',
    liveDemo: 'https://socialpulse-analytics.web.app',
    technologies: ['React', 'Express.js', 'Chart.js', 'MongoDB'],
    languages: 'React, Express, Chart.js',
    featured: false,
    status: 'In Progress',
    year: '2026',
    screenshots: ['https://picsum.photos/id/91/600/400'],
    features: [
      'Interactive Chart.js visualizations',
      'Real-time WebSocket data updates',
      'Exportable CSV and PDF reports'
    ]
  },
  {
    id: 'artgenius-ai',
    title: 'ArtGenius Image Generator',
    name: 'ArtGenius Image Generator',
    category: 'AI',
    description: 'Generative AI web application transforming text prompts into high-resolution digital artwork with style controls.',
    details: 'Generative AI web application transforming text prompts into high-resolution digital artwork with style controls.',
    image: 'https://picsum.photos/id/42/600/400',
    img: 'https://picsum.photos/id/42/600/400',
    github: 'https://github.com/yourusername/artgenius',
    liveDemo: 'https://artgenius.web.app',
    technologies: ['Python', 'Flask', 'React', 'Stable Diffusion'],
    languages: 'Python, Flask, React',
    featured: false,
    status: 'Completed',
    year: '2025',
    screenshots: ['https://picsum.photos/id/42/600/400'],
    features: [
      'Prompt Optimization & Negative Prompting',
      'Image gallery with download presets',
      'Fast AI inference pipeline'
    ]
  }
];

export const useProjects = () => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProjectsData = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        if (isMounted) {
          if (data && data.length > 0) {
            setProjects(data);
          } else {
            setProjects(DEFAULT_PROJECTS);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.info('Notice: Serving default project showcase until Firestore collection is populated.');
          setProjects(DEFAULT_PROJECTS);
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjectsData();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProjects = useMemo(() => {
    return projects.filter((p) => p.featured);
  }, [projects]);

  return { projects, featuredProjects, loading, error };
};
