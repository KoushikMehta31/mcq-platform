const express = require('express');
const { body, validationResult } = require('express-validator');
const { authMiddleware } = require('../middleware/auth');
const Progress = require('../models/Progress');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userProgress = await Progress
      .find({ userId: req.userId })
      .sort({ date: -1 })
      .lean();
    res.json(userProgress);
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Failed to load progress' });
  }
});

router.post('/', authMiddleware, [
  body('career').trim().notEmpty().withMessage('Career is required'),
  body('level').trim().notEmpty().withMessage('Level is required'),
  body('score').isInt({ min: 0 }).withMessage('Score must be a non-negative integer'),
  body('total').isInt({ min: 1 }).withMessage('Total must be a positive integer'),
  body('language').optional({ values: 'null' }).trim(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { career, language, level, score, total } = req.body;

  try {
    const entry = await Progress.create({
      userId: req.userId,
      career,
      language: language || null,
      level,
      score,
      total,
      percentage: Math.round((score / total) * 100),
    });

    res.status(201).json(entry);
  } catch (err) {
    console.error('Error saving progress:', err);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

module.exports = router;
