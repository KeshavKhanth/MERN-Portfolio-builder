export const blankTemplate = {
  name: 'Blank Template',
  slug: 'blank-template',
  description: 'Start from scratch with a completely blank canvas',
  preview: null, // No preview image
  isBlank: true, // Special flag to identify blank template
  sections: [], // No default sections
  customizations: {
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      accent: '#10b981',
      background: '#ffffff',
      text: '#111827',
      muted: '#9ca3af'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      section: '4rem',
      container: '1.5rem'
    }
  }
};
