const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import models
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Internship = require('./models/Internship');
const Achievement = require('./models/Achievement');
const Education = require('./models/Education');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio')
  .then(() => console.log('Connected to MongoDB for Seeding'))
  .catch(err => console.error(err));

const skillsList = [
  { name: "HTML5", icon: "fab fa-html5", percent: 92, color: "#e34c26" },
  { name: "CSS3", icon: "fab fa-css3-alt", percent: 88, color: "#264de4" },
  { name: "JavaScript", icon: "fab fa-js", percent: 90, color: "#f7df1e" },
  { name: "React", icon: "fab fa-react", percent: 87, color: "#61dafb" },
  { name: "Node.js", icon: "fab fa-node-js", percent: 85, color: "#68a063" },
  { name: "Python", icon: "fab fa-python", percent: 82, color: "#3776ab" },
  { name: "MongoDB", icon: "fas fa-database", percent: 80, color: "#4db33d" },
  { name: "Three.js", icon: "fas fa-cube", percent: 75, color: "#00c6ff" },
  { name: "Git", icon: "fab fa-git-alt", percent: 88, color: "#f34f29" }
];

const projectsData = [
  { title: "3D EcoMart", languages: "React, Three.js", details: "Eco-friendly e-commerce with 3D product viewer.", img: "https://picsum.photos/id/20/400/250", github: "#", liveDemo: "#", linkedin: "https://linkedin.com" },
  { title: "Portfolio XR", languages: "Three.js, GSAP", details: "Immersive 3D portfolio with particles.", img: "https://picsum.photos/id/26/400/250", github: "#", liveDemo: "#", linkedin: "https://linkedin.com" },
  { title: "FlowBoard AI", languages: "React, Tailwind", details: "AI-powered task management.", img: "https://picsum.photos/id/1/400/250", github: "#", liveDemo: "#", linkedin: "https://linkedin.com" }
];

const internshipsData = [
  { title: "Full Stack Developer", tech: "MERN, Socket.io", desc: "Built microservices & real-time dashboard.", certImg: "https://picsum.photos/id/101/400/250", certName: "Full Stack Certificate", linkedinLink: "https://linkedin.com", implantBadge: "Implant Training", driveLink: "https://drive.google.com" }
];

const achievementsData = [
  { name: "🏆 Hackathon Winner", desc: "Smart India Hackathon 2024 – 1st place", certImg: "https://picsum.photos/id/103/300/200", certName: "Hackathon Certificate", workingDetails: "Developed AI education platform, won ₹1,00,000.", linkedinPost: "https://linkedin.com", driveLink: "https://drive.google.com" }
];

const educationData = [
  { level: "High School", institution: "Velammal Matric", duration: "2017-2019", score: "Percentage: 94%", icon: "fas fa-school", color: "#f9d423" },
  { level: "College", institution: "Anna University", duration: "2019-2023", score: "CGPA: 8.9", icon: "fas fa-university", color: "#ff7eb3" }
];

const seedDB = async () => {
  try {
    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Internship.deleteMany({});
    await Achievement.deleteMany({});
    await Education.deleteMany({});

    // Insert new data
    await Project.insertMany(projectsData);
    await Skill.insertMany(skillsList);
    await Internship.insertMany(internshipsData);
    await Achievement.insertMany(achievementsData);
    await Education.insertMany(educationData);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
