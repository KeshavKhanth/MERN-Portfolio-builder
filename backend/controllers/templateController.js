const Template = require('../models/Template');
const { validationResult } = require('express-validator');

// @desc    Get all templates
// @route   GET /api/templates
// @access  Public
const getTemplates = async (req, res) => {
  try {
    const { category, isPremium, search, sort = '-popularity' } = req.query;
    
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (isPremium !== undefined) {
      query.isPremium = isPremium === 'true';
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const templates = await Template.find(query)
      .sort(sort)
      .select('-structure.sections.components');
    
    res.json({
      success: true,
      count: templates.length,
      data: templates
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching templates',
      error: error.message
    });
  }
};

// @desc    Get single template
// @route   GET /api/templates/:id
// @access  Public
const getTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    
    if (!template.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Template is not available'
      });
    }
    
    // Increment popularity view
    template.popularity += 0.1;
    await template.save();
    
    res.json({
      success: true,
      data: template
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching template',
      error: error.message
    });
  }
};

// @desc    Create template (Admin only)
// @route   POST /api/templates
// @access  Private/Admin
const createTemplate = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const templateData = {
      ...req.body,
      createdBy: req.user.id
    };
    
    const template = await Template.create(templateData);
    
    res.status(201).json({
      success: true,
      data: template
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error creating template',
      error: error.message
    });
  }
};

// @desc    Update template (Admin only)
// @route   PUT /api/templates/:id
// @access  Private/Admin
const updateTemplate = async (req, res) => {
  try {
    let template = await Template.findById(req.params.id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    
    template = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.json({
      success: true,
      data: template
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error updating template',
      error: error.message
    });
  }
};

// @desc    Delete template (Admin only)
// @route   DELETE /api/templates/:id
// @access  Private/Admin
const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    
    // Soft delete - just mark as inactive
    template.isActive = false;
    await template.save();
    
    res.json({
      success: true,
      message: 'Template deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting template',
      error: error.message
    });
  }
};

// @desc    Get template categories
// @route   GET /api/templates/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = [
      { id: 'minimalist', name: 'Minimalist', description: 'Clean and simple designs' },
      { id: 'creative', name: 'Creative', description: 'Bold and artistic layouts' },
      { id: 'professional', name: 'Professional', description: 'Business-oriented templates' },
      { id: 'developer', name: 'Developer', description: 'Tech-focused portfolios' },
      { id: 'artist', name: 'Artist', description: 'Gallery and visual portfolios' },
      { id: 'business', name: 'Business', description: 'Corporate presentations' },
      { id: 'personal', name: 'Personal', description: 'Personal brand portfolios' }
    ];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching categories',
      error: error.message
    });
  }
};

// @desc    Rate template
// @route   POST /api/templates/:id/rate
// @access  Private
const rateTemplate = async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }
    
    const template = await Template.findById(req.params.id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    
    // Update rating
    const newCount = template.rating.count + 1;
    const newAverage = ((template.rating.average * template.rating.count) + rating) / newCount;
    
    template.rating.average = newAverage;
    template.rating.count = newCount;
    
    // Update popularity based on rating
    template.popularity = (template.popularity + (rating * 0.2));
    
    await template.save();
    
    res.json({
      success: true,
      data: {
        average: template.rating.average,
        count: template.rating.count
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error rating template',
      error: error.message
    });
  }
};

module.exports = {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getCategories,
  rateTemplate
};
