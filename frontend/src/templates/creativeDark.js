export const creativeDarkTemplate = {
  name: 'Creative Dark',
  slug: 'creative-dark',
  preview: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600',
  sections: [
    {
      id: 'hero-section',
      type: 'hero',
      order: 1,
      props: {
        backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080',
        overlay: true,
        height: 'screen',
        layout: 'center',
        content: {
          title: 'Creative Designer',
          subtitle: 'UI/UX & Brand Identity',
          description: 'Transforming ideas into stunning visual experiences. Specializing in modern design systems and brand development.',
          ctaButton: { 
            text: 'Explore Portfolio', 
            link: '#portfolio',
            style: 'gradient'
          },
          animationType: 'typewriter'
        }
      }
    },
    {
      id: 'services-section',
      type: 'services',
      order: 2,
      props: {
        title: 'What I Do',
        subtitle: 'Specialized creative services',
        services: [
          {
            icon: '🎨',
            title: 'Brand Identity',
            description: 'Creating unique brand identities that resonate with your target audience',
            features: ['Logo Design', 'Brand Guidelines', 'Color Systems']
          },
          {
            icon: '💻',
            title: 'Web Design',
            description: 'Modern, responsive websites that deliver exceptional user experiences',
            features: ['UI Design', 'Prototyping', 'Design Systems']
          },
          {
            icon: '📱',
            title: 'Mobile Design',
            description: 'Intuitive mobile app designs optimized for iOS and Android',
            features: ['App Design', 'User Flow', 'Interactive Prototypes']
          },
          {
            icon: '🚀',
            title: 'Motion Design',
            description: 'Engaging animations and micro-interactions that bring designs to life',
            features: ['Animation', 'Transitions', 'Loading States']
          }
        ]
      }
    },
    {
      id: 'portfolio-section',
      type: 'portfolio',
      order: 3,
      props: {
        columns: 2,
        gap: 'large',
        hover: 'glow',
        layout: 'masonry',
        content: [
          {
            title: 'Neon Dreams',
            description: 'Cyberpunk-inspired brand identity for gaming startup',
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600',
            link: 'https://behance.net',
            tags: ['Branding', 'Visual Design', 'Gaming'],
            category: 'Brand Design',
            featured: true
          },
          {
            title: 'Cosmic UI Kit',
            description: 'Dark mode UI component library for modern applications',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500',
            link: 'https://dribbble.com',
            tags: ['UI Design', 'Component Library', 'Dark Theme'],
            category: 'UI/UX'
          },
          {
            title: 'Aurora Dashboard',
            description: 'Analytics dashboard with stunning data visualizations',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600',
            link: 'https://behance.net',
            tags: ['Dashboard', 'Data Viz', 'Analytics'],
            category: 'Web Design'
          },
          {
            title: 'Midnight Mobile',
            description: 'Dark-themed mobile banking app with intuitive UX',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=900',
            link: 'https://dribbble.com',
            tags: ['Mobile', 'Banking', 'FinTech'],
            category: 'App Design'
          },
          {
            title: 'Neon Nights',
            description: 'Music festival branding with vibrant gradients',
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600',
            link: 'https://behance.net',
            tags: ['Event Design', 'Branding', 'Music'],
            category: 'Brand Design'
          }
        ]
      }
    },
    {
      id: 'process-section',
      type: 'process',
      order: 4,
      props: {
        title: 'Creative Process',
        steps: [
          {
            number: '01',
            title: 'Discovery',
            description: 'Understanding your vision, goals, and target audience',
            icon: '🔍'
          },
          {
            number: '02',
            title: 'Ideation',
            description: 'Brainstorming creative concepts and exploring possibilities',
            icon: '💡'
          },
          {
            number: '03',
            title: 'Design',
            description: 'Crafting beautiful, functional designs with attention to detail',
            icon: '🎨'
          },
          {
            number: '04',
            title: 'Refine',
            description: 'Iterating based on feedback to achieve perfection',
            icon: '✨'
          },
          {
            number: '05',
            title: 'Deliver',
            description: 'Providing final assets and ongoing support',
            icon: '🚀'
          }
        ]
      }
    },
    {
      id: 'skills-section',
      type: 'skills',
      order: 5,
      props: {
        displayStyle: 'circular',
        animated: true,
        title: 'Technical Expertise',
        content: [
          { name: 'Figma', level: 95, category: 'Design', color: '#F24E1E' },
          { name: 'Adobe Creative Suite', level: 90, category: 'Design', color: '#FF0000' },
          { name: 'Sketch', level: 85, category: 'Design', color: '#FDAD00' },
          { name: 'Framer', level: 80, category: 'Prototyping', color: '#0055FF' },
          { name: 'After Effects', level: 75, category: 'Motion', color: '#9999FF' },
          { name: 'Webflow', level: 85, category: 'Development', color: '#4353FF' }
        ]
      }
    },
    {
      id: 'contact-section',
      type: 'contact',
      order: 6,
      props: {
        fields: ['name', 'email', 'project_type', 'budget', 'message'],
        formStyle: 'gradient',
        title: 'Let\'s Create Something Amazing',
        subtitle: 'Ready to bring your vision to life?'
      }
    },
    {
      id: 'footer-section',
      type: 'socialLinks',
      order: 7,
      props: {
        displayStyle: 'buttons',
        size: 'medium',
        color: 'gradient',
        content: [
          { platform: 'dribbble', url: 'https://dribbble.com' },
          { platform: 'behance', url: 'https://behance.net' },
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' }
        ]
      }
    }
  ],
  customizations: {
    colors: {
      primary: '#f59e0b',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: '#0f0f0f',
      text: '#f3f4f6',
      muted: '#6b7280',
      card: '#1a1a1a'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    spacing: {
      section: '6rem',
      container: '2rem'
    },
    effects: {
      gradients: true,
      glassmorphism: true,
      animations: 'advanced'
    }
  }
};
