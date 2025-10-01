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
            '5+ Years of Experience',
            'Full Stack Development',
            'Cloud Architecture',
            'UI/UX Design'
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
          { name: 'React.js', level: 95, category: 'Frontend', color: '#61DAFB' },
          { name: 'Node.js', level: 90, category: 'Backend', color: '#339933' },
          { name: 'TypeScript', level: 85, category: 'Language', color: '#3178C6' },
          { name: 'MongoDB', level: 80, category: 'Database', color: '#47A248' },
          { name: 'AWS', level: 75, category: 'Cloud', color: '#FF9900' },
          { name: 'Docker', level: 85, category: 'DevOps', color: '#2496ED' }
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
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with React and Node.js',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400',
            link: 'https://github.com',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            category: 'Web App'
          },
          {
            title: 'Task Management App',
            description: 'Collaborative project management tool with real-time updates',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400',
            link: 'https://github.com',
            tags: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
            category: 'SaaS'
          },
          {
            title: 'Weather Dashboard',
            description: 'Beautiful weather app with forecasting and analytics',
            image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400',
            link: 'https://github.com',
            tags: ['Vue.js', 'Chart.js', 'OpenWeather API'],
            category: 'Dashboard'
          },
          {
            title: 'Social Media Analytics',
            description: 'Analytics dashboard for social media performance tracking',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400',
            link: 'https://github.com',
            tags: ['React', 'D3.js', 'Python', 'Flask'],
            category: 'Analytics'
          },
          {
            title: 'Blog Platform',
            description: 'Modern blogging platform with markdown support',
            image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400',
            link: 'https://github.com',
            tags: ['Next.js', 'MDX', 'Tailwind CSS'],
            category: 'CMS'
          },
          {
            title: 'Video Streaming App',
            description: 'Netflix-like streaming platform with adaptive bitrate',
            image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400',
            link: 'https://github.com',
            tags: ['React', 'HLS.js', 'AWS S3', 'CloudFront'],
            category: 'Media'
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
        contactInfo: {
          email: 'john@example.com',
          phone: '+1 234 567 8900',
          location: 'San Francisco, CA'
        }
      }
    },
    {
      id: 'footer-section',
      type: 'socialLinks',
      order: 7,
      props: {
        displayStyle: 'icons',
        size: 'large',
        color: 'brand',
        content: [
          { platform: 'github', url: 'https://github.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'twitter', url: 'https://twitter.com' },
          { platform: 'dribbble', url: 'https://dribbble.com' }
        ]
      }
    }
  ],
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
      body: 'Open Sans'
    },
    spacing: {
      section: '5rem',
      container: '1.5rem'
    }
  }
};
