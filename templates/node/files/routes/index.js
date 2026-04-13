import { Router } from 'express';

export const router = Router();

// Example routes
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to {{projectName}} API' });
});

router.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});
