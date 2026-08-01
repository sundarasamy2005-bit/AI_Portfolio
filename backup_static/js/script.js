// Initialize AOS
AOS.init({ duration: 800, once: true, offset: 50 });

// Scroll-driven navigation hide/show (Android only)
if (/android/i.test(navigator.userAgent)) {
  let lastScrollY = window.scrollY;
  const nav = document.getElementById('mainNav');
  let ticking = false;
  
  function updateNavVisibility() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavVisibility);
      ticking = true;
    }
  });
  updateNavVisibility();
} else {
  // Ensure nav is always visible on non-Android devices
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.remove('nav-hidden');
}

// Glow Icons
const glowIcons = document.querySelectorAll('.glow-icon');
glowIcons.forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.style.textShadow = '0 0 15px #ff7eb3';
    icon.style.transform = 'scale(1.1)';
  });
  icon.addEventListener('mouseleave', () => {
    icon.style.textShadow = 'none';
    icon.style.transform = 'scale(1)';
  });
});

// Skills Data
const skillsList = [
  { name: "HTML5", icon: "fab fa-html5", percent: 92, color: "#e34c26" },
  { name: "CSS3", icon: "fab fa-css3-alt", percent: 88, color: "#264de4" },
  { name: "JavaScript", icon: "fab fa-js", percent: 90, color: "#f7df1e" },
  { name: "React", icon: "fab fa-react", percent: 87, color: "#61dafb" },
  { name: "Node.js", icon: "fab fa-node-js", percent: 85, color: "#68a063" },
  { name: "Python", icon: "fab fa-python", percent: 82, color: "#3776ab" },
  { name: "MongoDB", icon: "fas fa-database", percent: 80, color: "#4db33d" },
  { name: "Three.js", icon: "fas fa-cube", percent: 75, color: "#00c6ff" },
  { name: "Git", icon: "fab fa-git-alt", percent: 88, color: "#f34f29" },
  { name: "Docker", icon: "fab fa-docker", percent: 78, color: "#2496ed" },
  { name: "Figma", icon: "fab fa-figma", percent: 85, color: "#f24e1e" },
  { name: "Render", icon: "fas fa-cloud-upload-alt", percent: 79, color: "#46e3b7" }
];

const skillsGrid = document.getElementById('skillsGrid');
function renderSkills() {
  skillsGrid.innerHTML = '';
  skillsList.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `<div class="skill-header"><i class="${skill.icon}" style="color:${skill.color};"></i><span class="skill-name">${skill.name}</span></div><div class="skill-level-bar"><div class="skill-fill" data-percent="${skill.percent}"></div></div><div class="percentage-text">${skill.percent}% Mastery</div>`;
    skillsGrid.appendChild(card);
  });
  setTimeout(() => {
    document.querySelectorAll('.skill-fill').forEach(fill => {
      fill.style.width = fill.getAttribute('data-percent') + '%';
    });
  }, 200);
}
renderSkills();

// Projects Data
const projectsData = [
  { name: "3D EcoMart", languages: "React, Three.js", details: "Eco-friendly e-commerce with 3D product viewer.", img: "https://picsum.photos/id/20/400/250", github: "#", liveDemo: "#", linkedin: "https://linkedin.com" },
  { name: "Portfolio XR", languages: "Three.js, GSAP", details: "Immersive 3D portfolio with particles.", img: "https://picsum.photos/id/26/400/250", github: "#", liveDemo: "#", linkedin: "https://linkedin.com" },
  { name: "FlowBoard AI", languages: "React, Tailwind", details: "AI-powered task management.", img: "https://picsum.photos/id/1/400/250", github: "#", liveDemo: "#", linkedin: "https://linkedin.com" },
  { name: "WeatherVue", languages: "JS, API", details: "Real-time weather with 3D maps.", img: "https://picsum.photos/id/29/400/250", github: "#", liveDemo: "#", linkedin: "https://linkedin.com" },
  { name: "SocialPulse", languages: "React, Express", details: "Analytics dashboard.", img: "https://picsum.photos/id/91/400/250", github: "#", liveDemo: "#", linkedin: "https://linkedin.com" },
  { name: "ArtGenius", languages: "Python, Flask", details: "AI image generator.", img: "https://picsum.photos/id/42/400/250", github: "#", liveDemo: "#", linkedin: "https://linkedin.com" }
];

const modal = document.getElementById('universalModal');
const modalContent = document.getElementById('modalContent');
function showModal(html) {
  modalContent.innerHTML = html;
  modal.classList.add('active');
}
document.getElementById('closeModalBtn').onclick = () => modal.classList.remove('active');
modal.onclick = (e) => {
  if (e.target === modal) modal.classList.remove('active');
};

const projectsGridDiv = document.getElementById('projectsGrid');
function renderProjects() {
  projectsGridDiv.innerHTML = '';
  projectsData.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `<img class="card-media" src="${p.img}"><div class="card-content"><div class="card-header"><h3>🚀 ${p.name}</h3></div><div class="tech-badge"><i class="fas fa-code"></i> ${p.languages}</div><div class="action-buttons"><button class="btn-small github-action"><i class="fab fa-github"></i> GitHub</button><button class="btn-small live-action"><i class="fas fa-external-link-alt"></i> Live Demo</button><i class="fab fa-linkedin linkedin-icon" style="color:#0a66c2; font-size:1.2rem; cursor:pointer;"></i></div></div>`;
    const githubBtn = card.querySelector('.github-action');
    const liveBtn = card.querySelector('.live-action');
    const linkedinIcon = card.querySelector('.linkedin-icon');
    githubBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(p.github, '_blank');
    });
    liveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(p.liveDemo, '_blank');
    });
    linkedinIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(p.linkedin, '_blank');
    });
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-small') || e.target.closest('.linkedin-icon')) return;
      showModal(`<h2 style="color:#f9d423;">${p.name}</h2><img src="${p.img}" class="modal-img"><p>${p.details}</p><p><strong>Tech:</strong> ${p.languages}</p><div style="display:flex; gap:1rem; justify-content:center;"><a href="#" class="btn-primary">GitHub</a><a href="#" class="btn-secondary">Live Demo</a></div>`);
    });
    projectsGridDiv.appendChild(card);
  });
}
renderProjects();

// Internships Data
const internshipsData = [
  { title: "Full Stack Developer", tech: "MERN, Socket.io", desc: "Built microservices & real-time dashboard.", certImg: "https://picsum.photos/id/101/400/250", certName: "Full Stack Certificate", linkedinLink: "https://linkedin.com", implantBadge: "Implant Training", driveLink: "https://drive.google.com" },
  { title: "Frontend Architect", tech: "React, Three.js", desc: "Developed component library with Storybook.", certImg: "https://picsum.photos/id/102/400/250", certName: "Frontend Certificate", linkedinLink: "https://linkedin.com", implantBadge: "Implant Training", driveLink: "https://drive.google.com" }
];

const internshipsGrid = document.getElementById('internshipsGrid');
function renderInternships() {
  internshipsGrid.innerHTML = '';
  internshipsData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'intern-card';
    card.innerHTML = `<img class="card-media" src="${item.certImg}"><div class="card-content"><div class="badge-implant">${item.implantBadge}</div><div class="card-header"><h3>💼 ${item.title}</h3></div><p><i class="fas fa-microchip"></i> ${item.tech}</p><p>${item.desc}</p><div class="action-buttons"><i class="fas fa-external-link-alt icon-action open-icon-card"></i><i class="fab fa-linkedin linkedin-icon" style="color:#0a66c2; font-size:1.3rem;"></i></div></div>`;
    const openIcon = card.querySelector('.open-icon-card');
    const linkedinIcon = card.querySelector('.linkedin-icon');
    const openModalFunc = () => {
      showModal(`<h2 style="color:#f9d423;">${item.certName}</h2><img src="${item.certImg}" class="modal-img"><p><strong>Internship:</strong> ${item.title}</p><p><strong>Technologies:</strong> ${item.tech}</p><p>${item.desc}</p><div style="display:flex; justify-content:center; gap:1rem; margin-top:1rem;"><button id="modalViewCertBtn" class="btn-primary" style="background:#00c6ff;"><i class="fas fa-cloud-upload-alt"></i> View Certificate</button><button id="modalLinkedInBtn" class="btn-secondary" style="background:#0a66c2;"><i class="fab fa-linkedin"></i> LinkedIn</button></div>`);
      setTimeout(() => {
        const certBtn = document.getElementById('modalViewCertBtn');
        if (certBtn) certBtn.onclick = () => window.open(item.driveLink, '_blank');
        const linkedinBtn = document.getElementById('modalLinkedInBtn');
        if (linkedinBtn) linkedinBtn.onclick = () => window.open(item.linkedinLink, '_blank');
      }, 50);
    };
    openIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      openModalFunc();
    });
    linkedinIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(item.linkedinLink, '_blank');
    });
    card.addEventListener('click', (e) => {
      if (e.target.closest('.icon-action') || e.target.closest('.linkedin-icon')) return;
      openModalFunc();
    });
    internshipsGrid.appendChild(card);
  });
}
renderInternships();

// Achievements Data
const achievementsData = [
  { name: "🏆 Hackathon Winner", desc: "Smart India Hackathon 2024 – 1st place", certImg: "https://picsum.photos/id/103/300/200", certName: "Hackathon Certificate", workingDetails: "Developed AI education platform, won ₹1,00,000.", linkedinPost: "https://linkedin.com", driveLink: "https://drive.google.com" },
  { name: "🌟 Meta Full Stack Certified", desc: "Advanced MERN Specialization", certImg: "https://picsum.photos/id/104/300/200", certName: "Meta Certificate", workingDetails: "Completed 10+ projects, scored 95%.", linkedinPost: "https://linkedin.com", driveLink: "https://drive.google.com" }
];

const achievementsGrid = document.getElementById('achievementsGrid');
function renderAchievements() {
  achievementsGrid.innerHTML = '';
  achievementsData.forEach(ach => {
    const card = document.createElement('div');
    card.className = 'achievement-card';
    card.innerHTML = `<img class="card-media" src="${ach.certImg}"><div class="card-content"><div class="card-header"><h3 style="color:#f9d423;">${ach.name}</h3></div><p>${ach.desc}</p><div class="action-buttons"><i class="fas fa-external-link-alt icon-action open-icon-card"></i><i class="fab fa-linkedin linkedin-icon" style="color:#0a66c2; font-size:1.3rem;"></i></div></div>`;
    const openIcon = card.querySelector('.open-icon-card');
    const linkedinIcon = card.querySelector('.linkedin-icon');
    const openModalFunc = () => {
      showModal(`<h2 style="color:#f9d423;">${ach.certName}</h2><img src="${ach.certImg}" class="modal-img"><p><strong>Achievement:</strong> ${ach.name}</p><p>${ach.desc}</p><p><strong>Working Details:</strong> ${ach.workingDetails}</p><div style="display:flex; gap:1rem; justify-content:center; margin-top:1rem;"><button id="modalViewCertBtn" class="btn-primary" style="background:#00c6ff;"><i class="fas fa-cloud-upload-alt"></i> View Certificate</button><button id="modalLinkedInBtn" class="btn-secondary" style="background:#0a66c2;"><i class="fab fa-linkedin"></i> LinkedIn</button></div>`);
      setTimeout(() => {
        const certBtn = document.getElementById('modalViewCertBtn');
        if (certBtn) certBtn.onclick = () => window.open(ach.driveLink, '_blank');
        const linkedinBtn = document.getElementById('modalLinkedInBtn');
        if (linkedinBtn) linkedinBtn.onclick = () => window.open(ach.linkedinPost, '_blank');
      }, 50);
    };
    openIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      openModalFunc();
    });
    linkedinIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(ach.linkedinPost, '_blank');
    });
    card.addEventListener('click', (e) => {
      if (e.target.closest('.icon-action') || e.target.closest('.linkedin-icon')) return;
      openModalFunc();
    });
    achievementsGrid.appendChild(card);
  });
}
renderAchievements();

// Extra Certificates Button
const extraDriveLink = "https://drive.google.com/drive/folders/extra_certificates";
document.getElementById('viewExtraCertsBtn').addEventListener('click', () => {
  window.open(extraDriveLink, '_blank');
});

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!name || !email) {
    alert('Name & Email required');
    return;
  }
  const data = {
    id: Date.now(),
    name,
    email,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
    date: new Date().toISOString()
  };
  let db = JSON.parse(localStorage.getItem('contactDB') || '[]');
  db.push(data);
  localStorage.setItem('contactDB', JSON.stringify(db));
  document.getElementById('formFeedback').innerHTML = '<span style="color:#4ade80;">✓ Message saved to secure database!</span>';
  contactForm.reset();
  setTimeout(() => document.getElementById('formFeedback').innerHTML = '', 2500);
});

// Typewriter Animation
const phrases = ["✨ UI/UX Designer & Full Stack Developer", "3D Animations & Smart Backend", "Let's build the future"];
let pIdx = 0, cIdx = 0, del = false;
const typeEl = document.getElementById('typewriter-text');
function typeEffect() {
  let current = phrases[pIdx];
  if (!del && cIdx <= current.length) {
    typeEl.textContent = current.substring(0, cIdx) + '|';
    cIdx++;
    if (cIdx > current.length) {
      del = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else if (del && cIdx >= 0) {
    typeEl.textContent = current.substring(0, cIdx) + '|';
    cIdx--;
    if (cIdx === -1) {
      del = false;
      pIdx = (pIdx + 1) % phrases.length;
      cIdx = 0;
      setTimeout(typeEffect, 200);
      return;
    }
  }
  setTimeout(typeEffect, del ? 50 : 100);
}
typeEffect();

// Button Listeners
document.getElementById('viewProjectsBtn').addEventListener('click', () => {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('refreshPageBtn').addEventListener('click', () => {
  location.reload();
});
const downloadResume = (e) => {
  e.preventDefault();
  alert("📄 Resume simulation - PDF ready");
};
document.getElementById('downloadResumeBtn').addEventListener('click', downloadResume);
document.getElementById('footerDownloadBtn').addEventListener('click', downloadResume);
document.getElementById('backToTopBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.querySelectorAll('[data-nav]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-nav');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Dark Mode Toggle with localStorage
const darkToggle = document.getElementById('darkModeToggle');
let isDark = true;
if (localStorage.getItem('theme') === 'light-mode') {
  document.body.classList.add('light-mode');
  darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
  isDark = false;
}
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  isDark = !document.body.classList.contains('light-mode');
  darkToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', isDark ? 'dark-mode' : 'light-mode');
});