const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createPortfolio,
  getUserPortfolios,
  getPortfolio,
  updatePortfolio,
  togglePublish,
  deletePortfolio,
  getPortfolioBySlug,
  duplicatePortfolio,
  restoreVersion
} = require('../controllers/portfolioController');
const { protect, optionalAuth } = require('../middleware/auth');

// Validation middleware
const validatePortfolio = [
  body('title').notEmpty().withMessage('Portfolio title is required')
];

// Public routes
router.get('/public/:slug', getPortfolioBySlug);

// Optional auth routes (public if published, private if not)
router.get('/:id', optionalAuth, getPortfolio);

// Protected routes
router.use(protect);
router.post('/', validatePortfolio, createPortfolio);
router.get('/', getUserPortfolios);
router.put('/:id', updatePortfolio);
router.put('/:id/publish', togglePublish);
router.delete('/:id', deletePortfolio);
router.post('/:id/duplicate', duplicatePortfolio);
router.put('/:id/restore/:version', restoreVersion);

module.exports = router;
