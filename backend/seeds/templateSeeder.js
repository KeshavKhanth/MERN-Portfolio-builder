const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Template = require('../models/Template');

dotenv.config({ path: '../.env' });

const templates = [
  {
    name: 'Modern Minimalist',
    slug: 'modern-minimalist',
    description: 'Clean white background with sans-serif fonts and subtle animations. Perfect for professionals who prefer simplicity.',
    category: 'minimalist',
    preview: {
      thumbnail: 'https://via.placeholder.com/600x400/ffffff/333333?text=Modern+Minimalist',
      screenshots: [
        'https://via.placeholder.com/1200x800/ffffff/333333?text=Screenshot+1',
        'https://via.placeholder.com/1200x800/ffffff/333333?text=Screenshot+2'
      ]
    },
    structure: {
      sections: [
        {
          id: 'hero-1',
          type: 'hero',
          name: 'Hero Section',
          order: 1,
          isRequired: true,
          isRemovable: false,
          components: []
        },
        {
          id: 'about-1',
          type: 'about',
          name: 'About Me',
          order: 2,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'skills-1',
          type: 'skills',
          name: 'Skills',
          order: 3,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'portfolio-1',
          type: 'portfolio',
          name: 'Portfolio',
          order: 4,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'contact-1',
          type: 'contact',
          name: 'Contact',
          order: 5,
          isRequired: false,
          isRemovable: true,
          components: []
        }
      ],
      layout: {
        type: 'single-page',
        navigation: 'top'
      }
    },
    defaultContent: {
      hero: {
        title: 'John Doe',
        subtitle: 'Full Stack Developer',
        backgroundImage: 'https://via.placeholder.com/1920x1080/f3f4f6/333333',
        ctaButtons: [
          { text: 'View Portfolio', link: '#portfolio', style: 'primary' },
          { text: 'Contact Me', link: '#contact', style: 'outline' }
        ]
      },
      about: {
        bio: 'Passionate developer with expertise in modern web technologies.',
        image: 'https://via.placeholder.com/400x400/e5e7eb/333333',
        highlights: ['5+ Years Experience', 'Full Stack Developer', 'UI/UX Enthusiast']
      }
    },
    styles: {
      colorScheme: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: '#10b981',
        background: '#ffffff',
        text: '#111827',
        muted: '#9ca3af'
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Open Sans',
        baseFontSize: '16px',
        lineHeight: '1.6'
      },
      spacing: {
        containerPadding: '2rem',
        sectionSpacing: '4rem',
        elementSpacing: '1rem'
      },
      animations: {
        type: 'subtle',
        onScroll: true
      }
    },
    features: ['responsive', 'animations', 'seo-optimized', 'fast-loading', 'accessible'],
    popularity: 95,
    usageCount: 0,
    rating: { average: 4.8, count: 120 },
    isPremium: false,
    isActive: true
  },
  {
    name: 'Creative Dark',
    slug: 'creative-dark',
    description: 'Dark theme with colorful accents and bold typography. Great for designers and creative professionals.',
    category: 'creative',
    preview: {
      thumbnail: 'https://via.placeholder.com/600x400/1f2937/f59e0b?text=Creative+Dark',
      screenshots: []
    },
    structure: {
      sections: [
        {
          id: 'hero-2',
          type: 'hero',
          name: 'Hero Section',
          order: 1,
          isRequired: true,
          isRemovable: false,
          components: []
        },
        {
          id: 'about-2',
          type: 'about',
          name: 'About',
          order: 2,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'services-2',
          type: 'services',
          name: 'Services',
          order: 3,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'portfolio-2',
          type: 'portfolio',
          name: 'Works',
          order: 4,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'testimonials-2',
          type: 'testimonials',
          name: 'Testimonials',
          order: 5,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'contact-2',
          type: 'contact',
          name: 'Get in Touch',
          order: 6,
          isRequired: false,
          isRemovable: true,
          components: []
        }
      ],
      layout: {
        type: 'single-page',
        navigation: 'side'
      }
    },
    defaultContent: {
      hero: {
        title: 'Creative Designer',
        subtitle: 'Bringing Ideas to Life',
        backgroundImage: 'https://via.placeholder.com/1920x1080/111827/f59e0b',
        ctaButtons: [
          { text: 'See My Work', link: '#portfolio', style: 'primary' }
        ]
      }
    },
    styles: {
      colorScheme: {
        primary: '#f59e0b',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        background: '#111827',
        text: '#f3f4f6',
        muted: '#6b7280'
      },
      typography: {
        headingFont: 'Poppins',
        bodyFont: 'Inter',
        baseFontSize: '16px',
        lineHeight: '1.7'
      },
      spacing: {
        containerPadding: '2rem',
        sectionSpacing: '5rem',
        elementSpacing: '1.5rem'
      },
      animations: {
        type: 'elaborate',
        onScroll: true
      }
    },
    features: ['responsive', 'dark-mode', 'animations', 'seo-optimized'],
    popularity: 88,
    usageCount: 0,
    rating: { average: 4.7, count: 95 },
    isPremium: false,
    isActive: true
  },
  {
    name: 'Professional Corporate',
    slug: 'professional-corporate',
    description: 'Business-friendly layout with blue color scheme and structured sections. Ideal for consultants and business professionals.',
    category: 'professional',
    preview: {
      thumbnail: 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Professional+Corporate',
      screenshots: []
    },
    structure: {
      sections: [
        {
          id: 'hero-3',
          type: 'hero',
          name: 'Hero',
          order: 1,
          isRequired: true,
          isRemovable: false,
          components: []
        },
        {
          id: 'about-3',
          type: 'about',
          name: 'About',
          order: 2,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'experience-3',
          type: 'experience',
          name: 'Experience',
          order: 3,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'education-3',
          type: 'education',
          name: 'Education',
          order: 4,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'skills-3',
          type: 'skills',
          name: 'Expertise',
          order: 5,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'contact-3',
          type: 'contact',
          name: 'Contact',
          order: 6,
          isRequired: false,
          isRemovable: true,
          components: []
        }
      ],
      layout: {
        type: 'single-page',
        navigation: 'top'
      }
    },
    defaultContent: {
      hero: {
        title: 'Business Professional',
        subtitle: 'Strategy • Leadership • Innovation',
        backgroundImage: 'https://via.placeholder.com/1920x1080/1e40af/ffffff'
      }
    },
    styles: {
      colorScheme: {
        primary: '#1e40af',
        secondary: '#64748b',
        accent: '#0891b2',
        background: '#f8fafc',
        text: '#1e293b',
        muted: '#94a3b8'
      },
      typography: {
        headingFont: 'Montserrat',
        bodyFont: 'Roboto',
        baseFontSize: '16px',
        lineHeight: '1.6'
      },
      spacing: {
        containerPadding: '2rem',
        sectionSpacing: '3rem',
        elementSpacing: '1rem'
      },
      animations: {
        type: 'moderate',
        onScroll: true
      }
    },
    features: ['responsive', 'seo-optimized', 'fast-loading', 'accessible'],
    popularity: 82,
    usageCount: 0,
    rating: { average: 4.6, count: 78 },
    isPremium: false,
    isActive: true
  },
  {
    name: 'Developer Focused',
    slug: 'developer-focused',
    description: 'Code-themed design with terminal-style elements and tech stack showcase. Perfect for developers and engineers.',
    category: 'developer',
    preview: {
      thumbnail: 'https://via.placeholder.com/600x400/0f172a/10b981?text=Developer+Focused',
      screenshots: []
    },
    structure: {
      sections: [
        {
          id: 'hero-4',
          type: 'hero',
          name: 'Terminal Hero',
          order: 1,
          isRequired: true,
          isRemovable: false,
          components: []
        },
        {
          id: 'about-4',
          type: 'about',
          name: 'About Me',
          order: 2,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'skills-4',
          type: 'skills',
          name: 'Tech Stack',
          order: 3,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'projects-4',
          type: 'portfolio',
          name: 'Projects',
          order: 4,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'github-4',
          type: 'custom',
          name: 'GitHub Stats',
          order: 5,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'contact-4',
          type: 'contact',
          name: 'Contact',
          order: 6,
          isRequired: false,
          isRemovable: true,
          components: []
        }
      ],
      layout: {
        type: 'single-page',
        navigation: 'top'
      }
    },
    defaultContent: {
      hero: {
        title: '> Hello, World!',
        subtitle: 'Full Stack Developer & Open Source Contributor',
        backgroundImage: 'https://via.placeholder.com/1920x1080/0f172a/10b981'
      }
    },
    styles: {
      colorScheme: {
        primary: '#10b981',
        secondary: '#6366f1',
        accent: '#f59e0b',
        background: '#0f172a',
        text: '#e2e8f0',
        muted: '#64748b'
      },
      typography: {
        headingFont: 'JetBrains Mono',
        bodyFont: 'Fira Code',
        baseFontSize: '15px',
        lineHeight: '1.8'
      },
      spacing: {
        containerPadding: '2rem',
        sectionSpacing: '4rem',
        elementSpacing: '1.25rem'
      },
      animations: {
        type: 'moderate',
        onScroll: true
      }
    },
    features: ['responsive', 'dark-mode', 'animations', 'seo-optimized', 'fast-loading'],
    popularity: 92,
    usageCount: 0,
    rating: { average: 4.9, count: 143 },
    isPremium: true,
    isActive: true
  },
  {
    name: 'Artist Portfolio',
    slug: 'artist-portfolio',
    description: 'Gallery-focused layout with image-heavy design and creative typography. Best for artists and photographers.',
    category: 'artist',
    preview: {
      thumbnail: 'https://via.placeholder.com/600x400/fef3c7/92400e?text=Artist+Portfolio',
      screenshots: []
    },
    structure: {
      sections: [
        {
          id: 'hero-5',
          type: 'hero',
          name: 'Welcome',
          order: 1,
          isRequired: true,
          isRemovable: false,
          components: []
        },
        {
          id: 'gallery-5',
          type: 'portfolio',
          name: 'Gallery',
          order: 2,
          isRequired: true,
          isRemovable: false,
          components: []
        },
        {
          id: 'about-5',
          type: 'about',
          name: 'About the Artist',
          order: 3,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'exhibitions-5',
          type: 'custom',
          name: 'Exhibitions',
          order: 4,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'testimonials-5',
          type: 'testimonials',
          name: 'Reviews',
          order: 5,
          isRequired: false,
          isRemovable: true,
          components: []
        },
        {
          id: 'contact-5',
          type: 'contact',
          name: 'Commission Work',
          order: 6,
          isRequired: false,
          isRemovable: true,
          components: []
        }
      ],
      layout: {
        type: 'single-page',
        navigation: 'top'
      }
    },
    defaultContent: {
      hero: {
        title: 'Visual Artist',
        subtitle: 'Exploring Life Through Art',
        backgroundImage: 'https://via.placeholder.com/1920x1080/fef3c7/92400e'
      }
    },
    styles: {
      colorScheme: {
        primary: '#dc2626',
        secondary: '#7c3aed',
        accent: '#ea580c',
        background: '#fffbeb',
        text: '#451a03',
        muted: '#92400e'
      },
      typography: {
        headingFont: 'Playfair Display',
        bodyFont: 'Lora',
        baseFontSize: '17px',
        lineHeight: '1.8'
      },
      spacing: {
        containerPadding: '1.5rem',
        sectionSpacing: '3rem',
        elementSpacing: '1rem'
      },
      animations: {
        type: 'subtle',
        onScroll: true
      }
    },
    features: ['responsive', 'animations', 'seo-optimized'],
    popularity: 78,
    usageCount: 0,
    rating: { average: 4.5, count: 62 },
    isPremium: true,
    isActive: true
  }
];

const seedTemplates = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-builder', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing templates
    await Template.deleteMany({});
    console.log('Cleared existing templates');

    // Insert new templates
    const createdTemplates = await Template.insertMany(templates);
    console.log(`Inserted ${createdTemplates.length} templates`);

    // Display created templates
    createdTemplates.forEach(template => {
      console.log(`- ${template.name} (${template.category})`);
    });

    console.log('\nTemplate seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding templates:', error);
    process.exit(1);
  }
};

// Run the seeder
seedTemplates();
