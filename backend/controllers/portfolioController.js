const Portfolio = require('../models/Portfolio');
const Template = require('../models/Template');
const { validationResult } = require('express-validator');

// @desc    Create new portfolio
// @route   POST /api/portfolios
// @access  Private
const createPortfolio = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { title, templateId, content, customizations, templateInfo } = req.body;
    
    let portfolioData = {
      userId: req.user.id,
      title
    };

    // If template is provided, copy its structure
    if (templateId) {
      const template = await Template.findById(templateId);
      if (!template) {
        return res.status(404).json({
          success: false,
          message: 'Template not found'
        });
      }

      portfolioData.templateId = templateId;
      portfolioData.content = {
        sections: template.structure.sections,
        metadata: template.defaultContent
      };
      portfolioData.customizations = template.styles;
      
      // Increment template usage
      template.usageCount += 1;
      await template.save();
    } else if (content || customizations) {
      // Handle local templates or direct content creation
      portfolioData.content = content || { sections: [], metadata: {} };
      portfolioData.customizations = customizations || {};
      
      // Store template info for reference if provided
      if (templateInfo) {
        portfolioData.templateInfo = templateInfo;
      }
    }

    const portfolio = await Portfolio.create(portfolioData);

    res.status(201).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error creating portfolio',
      error: error.message
    });
  }
};

// @desc    Get all portfolios for user
// @route   GET /api/portfolios
// @access  Private
const getUserPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.user.id })
      .populate('templateId', 'name category')
      .sort('-createdAt');

    res.json({
      success: true,
      count: portfolios.length,
      data: portfolios
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching portfolios',
      error: error.message
    });
  }
};

// @desc    Get single portfolio
// @route   GET /api/portfolios/:id
// @access  Private/Public
const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id)
      .populate('templateId', 'name category')
      .populate('userId', 'firstName lastName email');

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Check if portfolio is published or belongs to current user
    if (!portfolio.isPublished && 
        (!req.user || portfolio.userId._id.toString() !== req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this portfolio'
      });
    }

    // Increment views if not owner
    if (!req.user || portfolio.userId._id.toString() !== req.user.id) {
      portfolio.views += 1;
      await portfolio.save();
    }

    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching portfolio',
      error: error.message
    });
  }
};

// @desc    Update portfolio
// @route   PUT /api/portfolios/:id
// @access  Private
const updatePortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Check ownership
    if (portfolio.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this portfolio'
      });
    }

    const updates = req.body;
    
    // Save to history if content is being updated
    if (updates.content) {
      portfolio.content = updates.content;
    }
    
    if (updates.customizations) {
      portfolio.customizations = {
        ...portfolio.customizations,
        ...updates.customizations
      };
    }

    if (updates.title) portfolio.title = updates.title;
    if (updates.seoSettings) portfolio.seoSettings = updates.seoSettings;

    portfolio = await portfolio.save();

    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error updating portfolio',
      error: error.message
    });
  }
};

// @desc    Publish/Unpublish portfolio
// @route   PUT /api/portfolios/:id/publish
// @access  Private
const togglePublish = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Check ownership
    if (portfolio.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to publish this portfolio'
      });
    }

    portfolio.isPublished = !portfolio.isPublished;
    portfolio.publishedAt = portfolio.isPublished ? Date.now() : null;
    await portfolio.save();

    res.json({
      success: true,
      message: portfolio.isPublished ? 'Portfolio published successfully' : 'Portfolio unpublished',
      data: {
        isPublished: portfolio.isPublished,
        publishedAt: portfolio.publishedAt,
        url: portfolio.isPublished ? portfolio.url : null
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error toggling publish status',
      error: error.message
    });
  }
};

// @desc    Delete portfolio
// @route   DELETE /api/portfolios/:id
// @access  Private
const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Check ownership
    if (portfolio.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this portfolio'
      });
    }

    await portfolio.deleteOne();

    res.json({
      success: true,
      message: 'Portfolio deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting portfolio',
      error: error.message
    });
  }
};

// @desc    Get portfolio by slug
// @route   GET /api/portfolios/public/:slug
// @access  Public
const getPortfolioBySlug = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    })
      .populate('userId', 'firstName lastName')
      .populate('templateId', 'name category');

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Increment views
    portfolio.views += 1;
    await portfolio.save();

    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching portfolio',
      error: error.message
    });
  }
};

// @desc    Duplicate portfolio
// @route   POST /api/portfolios/:id/duplicate
// @access  Private
const duplicatePortfolio = async (req, res) => {
  try {
    const originalPortfolio = await Portfolio.findById(req.params.id);

    if (!originalPortfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Check ownership
    if (originalPortfolio.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to duplicate this portfolio'
      });
    }

    const duplicateData = {
      userId: req.user.id,
      templateId: originalPortfolio.templateId,
      title: `${originalPortfolio.title} (Copy)`,
      content: originalPortfolio.content,
      customizations: originalPortfolio.customizations,
      seoSettings: originalPortfolio.seoSettings,
      isPublished: false
    };

    const duplicatedPortfolio = await Portfolio.create(duplicateData);

    res.status(201).json({
      success: true,
      message: 'Portfolio duplicated successfully',
      data: duplicatedPortfolio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error duplicating portfolio',
      error: error.message
    });
  }
};

// @desc    Restore portfolio to previous version
// @route   PUT /api/portfolios/:id/restore/:version
// @access  Private
const restoreVersion = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Check ownership
    if (portfolio.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to restore this portfolio'
      });
    }

    const versionToRestore = portfolio.history.find(
      h => h.version === parseInt(req.params.version)
    );

    if (!versionToRestore) {
      return res.status(404).json({
        success: false,
        message: 'Version not found'
      });
    }

    portfolio.content = versionToRestore.content;
    portfolio.customizations = versionToRestore.customizations;
    await portfolio.save();

    res.json({
      success: true,
      message: `Portfolio restored to version ${req.params.version}`,
      data: portfolio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error restoring version',
      error: error.message
    });
  }
};

module.exports = {
  createPortfolio,
  getUserPortfolios,
  getPortfolio,
  updatePortfolio,
  togglePublish,
  deletePortfolio,
  getPortfolioBySlug,
  duplicatePortfolio,
  restoreVersion
};
