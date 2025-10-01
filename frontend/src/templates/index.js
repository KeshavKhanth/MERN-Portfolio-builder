import { modernMinimalistTemplate } from './modernMinimalist';
import { creativeDarkTemplate } from './creativeDark';
import { professionalCorporateTemplate } from './professionalCorporate';
import { developerFocusedTemplate } from './developerFocused';
import { modernCreativeTemplate } from './modernCreative';
import tattooArtist from './tattooArtist';
import photographerMinimal from './photographerMinimal';
import designerBio from './designerBio';

export const templates = {
  'modern-minimalist': modernMinimalistTemplate,
  'creative-dark': creativeDarkTemplate,
  // 'professional-corporate': professionalCorporateTemplate,
  'developer-focused': developerFocusedTemplate,
  // 'modern-creative': modernCreativeTemplate,
  // 'tattoo-artist': tattooArtist,
  // 'photographer-minimal': photographerMinimal,
  'designer-bio': designerBio
};

export const getTemplate = (templateId) => {
  return templates[templateId] || templates['modern-minimalist'];
};

// Fixed rating values for consistent sorting
const templateRatings = {
  'modern-minimalist': 4.8,
  'creative-dark': 4.9,
  'professional-corporate': 4.7,
  'modern-creative': 5.0,
  'tattoo-artist': 4.8,
  'photographer-minimal': 4.9,
  'designer-bio': 5.0,
  'developer-focused': 4.6,
  'default': 4.5
};

// Define a fixed order for consistent "no sort" display
const templateOrder = [
  'modern-minimalist',
  'creative-dark', 
  'developer-focused',
  'designer-bio'
];

export const getAllTemplates = () => {
  return templateOrder.map((id) => {
    const template = templates[id];
    if (!template) return null;
    
    return {
      id,
      _id: id, // For compatibility with backend templates
      slug: id,
      ...template,
      // Add metadata for filtering
      price: template.price || 0, // All local templates are free
      isFree: true,
      rating: template.rating || templateRatings[id] || 4.5,
      createdAt: template.createdAt || '2024-01-01T00:00:00.000Z', // Fixed date instead of random
      features: {
        responsive: true, // All modern templates are responsive
        darkMode: template.features?.darkMode || id.includes('dark') || id.includes('creative'),
        ...template.features
      },
      category: template.category || getTemplateCategory(id)
    };
  }).filter(Boolean); // Remove any null entries
};

// Helper function to determine template category based on ID
const getTemplateCategory = (templateId) => {
  if (templateId.includes('developer') || templateId.includes('tech')) return 'developer';
  if (templateId.includes('creative') || templateId.includes('artist') || templateId.includes('designer')) return 'creative';
  if (templateId.includes('photographer') || templateId.includes('portfolio')) return 'photography';
  if (templateId.includes('business') || templateId.includes('corporate') || templateId.includes('professional')) return 'business';
  return 'portfolio'; // Default category
};
