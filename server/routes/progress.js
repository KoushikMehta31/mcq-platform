const express = require('express');
const fs = require('fs');
const path = require('path');
const { authMiddleware } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const PROGRESS_FILE = path.join(__dirname, '..', 'data', 'progress.json');

function readProgress() {
  try {
    const data = fs.readFileSync(PROGRESS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeProgress(data) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2));
}

router.get('/', authMiddleware, (req, res) => {
  const all = readProgress();
  const userProgress = all.filter(p => p.userId === req.userId).sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(userProgress);
});

router.post('/', authMiddleware, (req, res) => {
  const { career, language, level, score, total } = req.body;
  if (!career || !level || score === undefined || !total) {
    return res.status(400).json({ error: 'career, level, score, and total are required' });
  }

  const entry = {
    id: uuidv4(),
    userId: req.userId,
    career,
    language: language || null,
    level,
    score,
    total,
    percentage: Math.round((score / total) * 100),
    date: new Date().toISOString(),
  };

  const all = readProgress();
  all.push(entry);
  writeProgress(all);

  res.status(201).json(entry);
});

module.exports = router;
