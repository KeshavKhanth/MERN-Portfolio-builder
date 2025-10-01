const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a template name'],
    unique: true,
    trim: true,
    maxLength: 100
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    maxLength: 500
  },
  category: {
    type: String,
    required: true,
    enum: ['minimalist', 'creative', 'professional', 'developer', 'artist', 'business', 'personal'],
    default: 'personal'
  },
  preview: {
    thumbnail: {
      type: String,
      required: true
    },
    screenshots: [{
      type: String
    }]
  },
  structure: {
    sections: [{
      id: String,
      type: {
        type: String,
        enum: ['hero', 'about', 'skills', 'portfolio', 'experience', 'education', 'services', 'testimonials', 'contact', 'footer', 'custom']
      },
      name: String,
      order: Number,
      isRequired: {
        type: Boolean,
        default: false
      },
      isRemovable: {
        type: Boolean,
        default: true
      },
      components: [{
        id: String,
        type: String,
        props: mongoose.Schema.Types.Mixed,
        children: [mongoose.Schema.Types.Mixed]
      }]
    }],
    layout: {
      type: {
        type: String,
        enum: ['single-page', 'multi-page'],
        default: 'single-page'
      },
      navigation: {
        type: String,
        enum: ['top', 'side', 'both'],
        default: 'top'
      }
    }
  },
  defaultContent: {
    hero: {
      title: String,
      subtitle: String,
      backgroundImage: String,
      ctaButtons: [{
        text: String,
        link: String,
        style: String
      }]
    },
    about: {
      bio: String,
      image: String,
      highlights: [String]
    },
    skills: [{
      name: String,
      level: Number,
      category: String
    }],
    portfolio: [{
      title: String,
      description: String,
      image: String,
      link: String,
      tags: [String]
    }],
    contact: {
      email: String,
      phone: String,
      address: String,
      socialLinks: [{
        platform: String,
        url: String,
        icon: String
      }]
    }
  },
  styles: {
    colorScheme: {
      primary: String,
      secondary: String,
      accent: String,
      background: String,
      text: String,
      muted: String
    },
    typography: {
      headingFont: String,
      bodyFont: String,
      baseFontSize: String,
      lineHeight: String
    },
    spacing: {
      containerPadding: String,
      sectionSpacing: String,
      elementSpacing: String
    },
    animations: {
      type: {
        type: String,
        enum: ['none', 'subtle', 'moderate', 'elaborate'],
        default: 'subtle'
      },
      onScroll: {
        type: Boolean,
        default: true
      }
    }
  },
  features: [{
    type: String,
    enum: ['responsive', 'dark-mode', 'animations', 'seo-optimized', 'fast-loading', 'accessible']
  }],
  popularity: {
    type: Number,
    default: 0
  },
  usageCount: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate slug from name
templateSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
templateSchema.index({ category: 1, isActive: 1 });
templateSchema.index({ slug: 1 });
templateSchema.index({ popularity: -1 });

module.exports = mongoose.model('Template', templateSchema);
