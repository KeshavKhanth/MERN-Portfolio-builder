export const modernMinimalistTemplate = {
  name: 'Modern Minimalist',
  slug: 'modern-minimalist',
  preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600',
  sections: [
    {
      id: 'hero-section',
      type: 'hero',
      order: 1,
      props: {
        backgroundImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&h=1080',
        overlay: true,
        height: 'screen',
        content: {
          title: 'John Anderson',
          subtitle: 'Full Stack Developer',
          description: 'Building digital experiences with modern technologies. Passionate about creating scalable, user-friendly applications.',
          ctaButton: { 
            text: 'View My Work', 
            link: '#portfolio' 
          },
          secondaryButton: {
            text: 'Contact Me',
            link: '#contact'
          }
        }
      }
    },
    {
      id: 'about-section',
      type: 'about',
      order: 2,
      props: {
        layout: 'side-by-side',
        imagePosition: 'left',
        content: {
          title: 'About Me',
          bio: `I'm a passionate full-stack developer with over 5 years of experience in building web applications. 
                I specialize in React, Node.js, and cloud technologies. My approach combines technical excellence 
                with creative problem-solving to deliver exceptional digital solutions.`,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600',
          highlights: [
            'Key highlight 1',
            'Key highlight 2',
            'Key highlight 3'
          ],
          stats: [
            { label: 'Projects Completed', value: '50+' },
            { label: 'Happy Clients', value: '30+' },
            { label: 'Awards Won', value: '5' }
          ]
        }
      }
    },
    {
      id: 'skills-section',
      type: 'skills',
      order: 3,
      props: {
        displayStyle: 'bar',
        animated: true,
        content: [
          { name: 'Skill 1', level: 80, category: 'Category', color: '#3b82f6' },
          { name: 'Skill 2', level: 75, category: 'Category', color: '#10b981' },
          { name: 'Skill 3', level: 70, category: 'Category', color: '#f59e0b' },
          { name: 'Skill 4', level: 85, category: 'Category', color: '#8b5cf6' }
        ]
      }
    },
    {
      id: 'portfolio-section',
      type: 'portfolio',
      order: 4,
      props: {
        columns: 3,
        gap: 'medium',
        hover: 'zoom',
        content: [
          {
            title: 'Project 1',
            description: 'A brief description',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400',
            link: '#',
            tags: ['Tool 1', 'Tool 2'],
            category: 'Category'
          },
          {
            title: 'Project 2',
            description: 'A brief description',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400',
            link: '#',
            tags: ['Tool 1', 'Tool 2'],
            category: 'Category'
          },
          {
            title: 'Project 3',
            description: 'A brief description',
            image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400',
            link: '#',
            tags: ['Tool 1', 'Tool 2', 'Tool 3'],
            category: 'Category'
          }
        ]
      }
    },
    {
      id: 'testimonials-section',
      type: 'testimonials',
      order: 5,
      props: {
        content: [
          {
            name: 'Sarah Johnson',
            role: 'CEO at TechStart',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150',
            text: 'John is an exceptional developer who delivered our project on time and exceeded expectations. His attention to detail and problem-solving skills are outstanding.',
            rating: 5
          },
          {
            name: 'Michael Chen',
            role: 'CTO at Innovation Labs',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150',
            text: 'Working with John was a great experience. He brought innovative solutions to complex problems and maintained excellent communication throughout the project.',
            rating: 5
          },
          {
            name: 'Emily Davis',
            role: 'Product Manager at DesignCo',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150',
            text: 'John\'s technical expertise and creative approach made him an invaluable asset to our team. Highly recommend!',
            rating: 5
          }
        ]
      }
    },
    {
      id: 'contact-section',
      type: 'contact',
      order: 6,
      props: {
        fields: ['name', 'email', 'subject', 'message'],
        formStyle: 'modern',
        showLabels: true,
        socialLinks: [
          { platform: 'linkedin', url: '' },
          { platform: 'github', url: '' },
          { platform: 'email', url: '' }
        ],
        contactInfo: {
          email: 'john@example.com',
          phone: '+1 234 567 8900',
          location: 'San Francisco, CA'
        }
      }
    }
  ],
  customizations: {
    colors: {
      primary: '#1e3a8a',
      secondary: '#6b7280',
      accent: '#10b981',
      background: '#E8E4DC',
      text: '#111827',
      muted: '#9ca3af'
    },
    fonts: {
      heading: 'Inter',
      body: 'Open Sans'
    },
    spacing: {
      section: '5rem',
      container: '1.5rem'
    }
  }
};
