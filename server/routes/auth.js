const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { JWT_SECRET } = require('../middleware/auth');
const { sendPasswordResetEmail } = require('../config/email');

const router = express.Router();
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');
const RESET_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const users = readUsers();
  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  writeUsers(users);

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const users = readUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ error: 'No account found with this email address' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetTokenHash = resetTokenHash;
  user.resetTokenExpiry = Date.now() + RESET_TOKEN_EXPIRY;
  writeUsers(users);

  const baseUrl = process.env.CLIENT_URL || `${req.protocol}://${req.get('host')}`;
  const resetUrl = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

  try {
    await sendPasswordResetEmail(email, resetUrl);
    res.json({ message: 'Password reset link has been sent to your email' });
  } catch (err) {
    user.resetTokenHash = undefined;
    user.resetTokenExpiry = undefined;
    writeUsers(users);
    console.error('Failed to send email:', err);
    res.status(500).json({ error: 'Failed to send reset email. Please try again later.' });
  }
});

router.post('/reset-password', (req, res) => {
  const { token, email, password, confirmPassword } = req.body;

  if (!token || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Token, email, password, and confirm password are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const users = readUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ error: 'Invalid reset request' });
  }

  if (!user.resetTokenHash || !user.resetTokenExpiry) {
    return res.status(400).json({ error: 'No reset token found. Please request a new password reset.' });
  }

  if (Date.now() > user.resetTokenExpiry) {
    user.resetTokenHash = undefined;
    user.resetTokenExpiry = undefined;
    writeUsers(users);
    return res.status(400).json({ error: 'Reset token has expired. Please request a new password reset.' });
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  if (tokenHash !== user.resetTokenHash) {
    return res.status(400).json({ error: 'Invalid reset token. Please request a new password reset.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  user.password = hashedPassword;
  user.resetTokenHash = undefined;
  user.resetTokenExpiry = undefined;
  writeUsers(users);

  res.json({ message: 'Password has been reset successfully. You can now sign in with your new password.' });
});

module.exports = router;
