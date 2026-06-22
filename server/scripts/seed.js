require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Progress = require('../models/Progress');

async function seed() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mcq-platform';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  const usersPath = path.join(__dirname, '..', 'data', 'users.json');
  const progressPath = path.join(__dirname, '..', 'data', 'progress.json');

  if (fs.existsSync(usersPath)) {
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    for (const u of users) {
      const existing = await User.findOne({ email: u.email });
      if (!existing) {
        await User.create({
          _id: u.id,
          name: u.name,
          email: u.email,
          password: u.password,
          createdAt: new Date(u.createdAt),
        });
        console.log(`Imported user: ${u.email}`);
      } else {
        console.log(`Skipped existing user: ${u.email}`);
      }
    }
  }

  if (fs.existsSync(progressPath)) {
    const progress = JSON.parse(fs.readFileSync(progressPath, 'utf-8'));
    for (const p of progress) {
      const user = await User.findById(p.userId);
      if (user) {
        await Progress.create({
          userId: user._id,
          career: p.career,
          language: p.language,
          level: p.level,
          score: p.score,
          total: p.total,
          percentage: p.percentage,
          date: new Date(p.date),
        });
        console.log(`Imported progress entry: ${p.id}`);
      }
    }
  }

  console.log('Seed complete');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
