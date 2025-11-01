const mongoose = require('mongoose');

// Constants for slug generation
const USER_ID_SUFFIX_LENGTH = 6; // Number of characters from userId to use in slug

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    default: null
  },
  templateInfo: {
    name: { type: String },
    slug: { type: String },
    category: { type: String }
  },
  title: {
    type: String,
    required: [true, 'Please provide a portfolio title'],
    trim: true,
    maxLength: 100
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      sections: [],
      metadata: {}
    }
  },
  customizations: {
    colors: {
      primary: { type: String, default: '#007bff' },
      secondary: { type: String, default: '#6c757d' },
      background: { type: String, default: '#ffffff' },
      text: { type: String, default: '#333333' },
      accent: { type: String, default: '#ffc107' }
    },
    fonts: {
      heading: { type: String, default: 'Inter' },
      body: { type: String, default: 'Open Sans' }
    },
    layout: {
      containerWidth: { type: String, default: '1200px' },
      spacing: { type: String, default: 'normal' }
    },
    animations: {
      enabled: { type: Boolean, default: true },
      duration: { type: String, default: 'normal' }
    }
  },
  seoSettings: {
    metaTitle: { type: String, maxLength: 60 },
    metaDescription: { type: String, maxLength: 160 },
    keywords: [{ type: String }],
    ogImage: { type: String }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: null
  },
  views: {
    type: Number,
    default: 0
  },
  lastEditedAt: {
    type: Date,
    default: Date.now
  },
  version: {
    type: Number,
    default: 1
  },
  history: [{
    version: Number,
    content: mongoose.Schema.Types.Mixed,
    customizations: mongoose.Schema.Types.Mixed,
    savedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Optimized slug generation - includes userId from start to reduce collisions
portfolioSchema.pre('save', async function(next) {
  try {
    if (this.isNew || this.isModified('title')) {
      let baseSlug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      // Ensure baseSlug is not empty
      if (!baseSlug) {
        baseSlug = 'portfolio';
      }
      
      // Add userId suffix to make slug more unique from the start and reduce DB queries
      const userId = this.userId.toString().slice(-USER_ID_SUFFIX_LENGTH);
      let slug = `${baseSlug}-${userId}`;
      let counter = 1;
      
      // Use lean() for faster query (returns plain JS objects instead of Mongoose documents)
      while (await mongoose.model('Portfolio').findOne({ slug, _id: { $ne: this._id } }).lean().select('_id')) {
        slug = `${baseSlug}-${userId}-${counter}`;
        counter++;
      }
      
      this.slug = slug;
    }
    
    this.updatedAt = Date.now();
    this.lastEditedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Save to history before updating
portfolioSchema.pre('save', function(next) {
  if (!this.isNew && this.isModified('content')) {
    if (!this.history) {
      this.history = [];
    }
    
    // Keep only last 10 versions
    if (this.history.length >= 10) {
      this.history.shift();
    }
    
    this.history.push({
      version: this.version,
      content: this.content,
      customizations: this.customizations,
      savedAt: new Date()
    });
    
    this.version += 1;
  }
  next();
});

// Virtual for portfolio URL
portfolioSchema.virtual('url').get(function() {
  return `/portfolio/${this.slug}`;
});

// Indexes for faster queries
portfolioSchema.index({ userId: 1, isPublished: 1 });
portfolioSchema.index({ slug: 1 });
portfolioSchema.index({ userId: 1, createdAt: -1 }); // For sorting user portfolios
portfolioSchema.index({ isPublished: 1, views: -1 }); // For popular published portfolios
portfolioSchema.index({ templateId: 1 }); // For template-based queries

module.exports = mongoose.model('Portfolio', portfolioSchema);
