const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for local uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Basic Route
app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/internships', require('./routes/internshipRoutes'));
app.use('/api/achievements', require('./routes/achievementRoutes'));
app.use('/api/education', require('./routes/educationRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);
