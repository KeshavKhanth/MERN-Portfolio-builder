const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getCategories,
  rateTemplate
} = require('../controllers/templateController');
const { protect, authorize } = require('../middleware/auth');

// Validation middleware
const validateTemplate = [
  body('name').notEmpty().withMessage('Template name is required'),
  body('description').notEmpty().withMessage('Template description is required'),
  body('category').notEmpty().withMessage('Template category is required')
];

// Public routes
router.get('/categories', getCategories);
router.get('/', getTemplates);
router.get('/:id', getTemplate);

// Protected routes
router.use(protect);
router.post('/:id/rate', rateTemplate);

// Admin only routes
router.use(authorize('admin'));
router.post('/', validateTemplate, createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

module.exports = router;
