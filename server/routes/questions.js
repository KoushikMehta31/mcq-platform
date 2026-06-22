const express = require('express');
const fs = require('fs');
const path = require('path');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
const QUESTIONS_FILE = path.join(__dirname, '..', 'data', 'questions.json');
const CAREERS_FILE = path.join(__dirname, '..', 'data', 'careers.json');

function readJSON(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function getSubCategories(careerData) {
  // New format: careerData.subCategories
  if (careerData.subCategories) {
    return careerData.subCategories;
  }
  // Legacy format: careerData.languages (backend)
  if (careerData.languages) {
    return careerData.languages;
  }
  return null;
}

router.get('/careers', (req, res) => {
  const careers = readJSON(CAREERS_FILE);
  if (!careers) return res.status(500).json({ error: 'Failed to load careers' });
  res.json(careers);
});

router.get('/subcategories', (req, res) => {
  const { career } = req.query;
  if (!career) return res.status(400).json({ error: 'career is required' });

  const questions = readJSON(QUESTIONS_FILE);
  if (!questions) return res.status(500).json({ error: 'Failed to load data' });

  const careerData = questions[career];
  if (!careerData) return res.status(404).json({ error: 'Career not found' });

  const cats = getSubCategories(careerData);
  if (!cats) return res.status(404).json({ error: 'No subcategories found for this career' });

  const careers = readJSON(CAREERS_FILE) || [];
  const careerMeta = careers.find(c => c.id === career);
  const subCategoryType = careerMeta ? careerMeta.subCategoryType : null;

  const acronyms = ['html', 'css', 'js', 'sql', 'dsa', 'mern', 'mean', 'mevn'];

  const subCategories = Object.entries(cats).map(([id, data]) => ({
    id,
    name: id.split('-').map(w => acronyms.includes(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    levels: Object.keys(data),
    subCategoryType,
  }));

  res.json(subCategories);
});

router.get('/', authMiddleware, (req, res) => {
  const { career, level, subcategory } = req.query;
  if (!career || !level) {
    return res.status(400).json({ error: 'career and level are required' });
  }

  const questions = readJSON(QUESTIONS_FILE);
  if (!questions) return res.status(500).json({ error: 'Failed to load questions' });

  let careerData = questions[career];
  if (!careerData) return res.status(404).json({ error: 'Career not found' });

  let questionSet;
  const cats = getSubCategories(careerData);
  if (cats && subcategory) {
    const subCat = cats[subcategory];
    if (!subCat) return res.status(404).json({ error: 'Subcategory not found' });
    questionSet = subCat[level];
  } else if (cats) {
    return res.status(400).json({ error: 'subcategory is required for this career' });
  } else {
    questionSet = careerData[level];
  }

  if (!questionSet) return res.status(404).json({ error: 'Level not found' });

  const shuffled = [...questionSet].sort(() => Math.random() - 0.5);
  res.json(shuffled);
});

module.exports = router;
