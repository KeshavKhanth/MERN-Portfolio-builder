export const modernCreativeTemplate = {
  name: 'Modern Creative',
  slug: 'modern-creative',
  preview: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600',
  customizations: {
    colors: {
      primary: '#6366f1', // Indigo
      secondary: '#ec4899', // Pink
      accent: '#f59e0b', // Amber
      background: '#ffffff',
      text: '#1f2937',
      lightText: '#6b7280',
      cardBg: '#f9fafb'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter',
      accent: 'Playfair Display'
    },
    spacing: {
      section: '80px',
      element: '40px'
    },
    effects: {
      borderRadius: '12px',
      shadow: '0 10px 30px rgba(0,0,0,0.1)',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'
    }
  },
  sections: [
    {
      id: 'hero-creative',
      type: 'hero',
      order: 1,
      props: {
        backgroundImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=1080',
        overlay: true,
        overlayGradient: 'linear-gradient(135deg, rgba(99,102,241,0.9) 0%, rgba(236,72,153,0.9) 100%)',
        height: 'screen',
        layout: 'center',
        animation: 'fadeInUp',
        style: {
          fontFamily: 'Poppins'
        }
      },
      content: {
        title: 'Creative Developer & Designer',
        subtitle: 'Bringing Ideas to Life',
        description: 'I craft beautiful digital experiences that combine stunning design with powerful functionality. Let\'s create something amazing together.',
        ctaButton: {
          text: 'View My Work',
          link: '#portfolio',
          style: 'gradient',
          icon: '🚀'
        },
        secondaryButton: {
          text: 'Get In Touch',
          link: '#contact',
          style: 'glass'
        },
        socialLinks: [
          { platform: 'github', url: 'https://github.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'dribbble', url: 'https://dribbble.com' }
        ]
      }
    },
    {
      id: 'about-creative',
      type: 'about',
      order: 2,
      props: {
        layout: 'modern-card',
        backgroundColor: '#f9fafb',
        style: {
          padding: '80px 0',
          fontFamily: 'Inter'
        }
      },
      content: {
        title: '👋 Hello, I\'m Alex',
        subtitle: 'A Passionate Creator',
        bio: `I'm a creative professional who loves turning complex problems into simple, beautiful designs. 
              With a keen eye for detail and a passion for innovation, I bring ideas to life through 
              code and creativity.
              
              My journey started with a curiosity about how things work, and evolved into a career 
              dedicated to creating exceptional digital experiences. I believe in the power of design 
              to solve problems and make the world a better place.`,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600',
        highlights: [
          '🎨 UI/UX Design',
          '💻 Full-Stack Development',
          '🚀 Product Strategy',
          '✨ Creative Direction'
        ],
        stats: [
          { label: 'Projects Completed', value: '50+', icon: '🏆' },
          { label: 'Happy Clients', value: '30+', icon: '😊' },
          { label: 'Awards Won', value: '10+', icon: '🌟' },
          { label: 'Years Experience', value: '5+', icon: '📈' }
        ]
      }
    },
    {
      id: 'skills-creative',
      type: 'skills',
      order: 3,
      props: {
        displayStyle: 'modern-cards',
        animated: true,
        columns: 3,
        backgroundColor: '#ffffff'
      },
      content: [
        {
          category: 'Frontend Development',
          icon: '💻',
          skills: [
            { name: 'React/Next.js', level: 95, color: '#61dafb' },
            { name: 'TypeScript', level: 90, color: '#3178c6' },
            { name: 'Tailwind CSS', level: 95, color: '#06b6d4' },
            { name: 'Vue.js', level: 85, color: '#4fc08d' }
          ]
        },
        {
          category: 'Design & Creative',
          icon: '🎨',
          skills: [
            { name: 'Figma', level: 90, color: '#f24e1e' },
            { name: 'Adobe Creative Suite', level: 85, color: '#ff0000' },
            { name: 'UI/UX Design', level: 92, color: '#9333ea' },
            { name: 'Motion Graphics', level: 80, color: '#ec4899' }
          ]
        },
        {
          category: 'Backend & Tools',
          icon: '⚙️',
          skills: [
            { name: 'Node.js', level: 88, color: '#339933' },
            { name: 'Python', level: 85, color: '#3776ab' },
            { name: 'MongoDB', level: 82, color: '#47a248' },
            { name: 'Docker', level: 78, color: '#2496ed' }
          ]
        }
      ]
    },
    {
      id: 'portfolio-creative',
      type: 'portfolio',
      order: 4,
      props: {
        columns: 3,
        displayStyle: 'masonry',
        hover: 'modern',
        filter: true,
        backgroundColor: '#f9fafb'
      },
      content: [
        {
          title: 'E-Commerce Platform',
          category: 'Web Development',
          description: 'Modern shopping experience with AI recommendations',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400',
          link: '#',
          tags: ['React', 'Node.js', 'MongoDB'],
          featured: true,
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
          title: 'Mobile Banking App',
          category: 'UI/UX Design',
          description: 'Seamless financial management on the go',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400',
          link: '#',
          tags: ['Figma', 'React Native', 'Firebase'],
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
          title: 'SaaS Dashboard',
          category: 'Product Design',
          description: 'Analytics platform for data-driven decisions',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400',
          link: '#',
          tags: ['Vue.js', 'D3.js', 'Python'],
          featured: true,
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
          title: 'Social Media Campaign',
          category: 'Creative Design',
          description: 'Viral marketing campaign with 2M+ reach',
          image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400',
          link: '#',
          tags: ['Photoshop', 'After Effects'],
          gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        {
          title: 'AI-Powered Chatbot',
          category: 'AI/ML',
          description: 'Intelligent customer service solution',
          image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400',
          link: '#',
          tags: ['Python', 'TensorFlow', 'NLP'],
          gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        },
        {
          title: 'Brand Identity Design',
          category: 'Branding',
          description: 'Complete visual identity for startup',
          image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=600&h=400',
          link: '#',
          tags: ['Illustrator', 'Brand Strategy'],
          featured: true,
          gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        }
      ]
    },
    {
      id: 'testimonials-creative',
      type: 'testimonials',
      order: 5,
      props: {
        layout: 'modern-carousel',
        autoplay: true,
        backgroundColor: '#ffffff'
      },
      content: [
        {
          name: 'Sarah Johnson',
          role: 'CEO at TechStart',
          company: 'TechStart Inc.',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150',
          text: 'Working with Alex was an absolute pleasure. The attention to detail and creative solutions exceeded our expectations. Our platform has never looked better!',
          rating: 5,
          featured: true
        },
        {
          name: 'Michael Chen',
          role: 'Product Manager',
          company: 'Innovation Labs',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150',
          text: 'The perfect blend of creativity and technical expertise. Alex transformed our vision into reality with stunning results.',
          rating: 5
        },
        {
          name: 'Emma Williams',
          role: 'Marketing Director',
          company: 'Creative Agency',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150',
          text: 'Exceptional work! The designs are not only beautiful but also highly functional. Our conversion rates increased by 40%!',
          rating: 5,
          featured: true
        }
      ]
    },
    {
      id: 'services-creative',
      type: 'services',
      order: 6,
      props: {
        layout: 'modern-grid',
        columns: 3,
        backgroundColor: '#f9fafb'
      },
      content: [
        {
          title: 'Web Development',
          icon: '💻',
          description: 'Custom websites and web applications built with modern technologies',
          features: [
            'Responsive Design',
            'Performance Optimization',
            'SEO-Friendly',
            'CMS Integration'
          ],
          color: '#6366f1'
        },
        {
          title: 'UI/UX Design',
          icon: '🎨',
          description: 'User-centered design that creates meaningful experiences',
          features: [
            'User Research',
            'Wireframing',
            'Prototyping',
            'Usability Testing'
          ],
          color: '#ec4899'
        },
        {
          title: 'Brand Strategy',
          icon: '🚀',
          description: 'Building strong brands that connect with your audience',
          features: [
            'Brand Identity',
            'Visual Design',
            'Brand Guidelines',
            'Marketing Materials'
          ],
          color: '#f59e0b'
        }
      ]
    },
    {
      id: 'contact-creative',
      type: 'contact',
      order: 7,
      props: {
        layout: 'modern-split',
        showMap: false,
        backgroundColor: '#ffffff',
        style: {
          padding: '80px 0'
        }
      },
      content: {
        title: 'Let\'s Create Something Amazing',
        subtitle: 'I\'m always excited to work on new projects',
        email: 'hello@alexcreative.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        availability: 'Available for freelance',
        socialLinks: [
          { platform: 'github', url: 'https://github.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'dribbble', url: 'https://dribbble.com' },
          { platform: 'twitter', url: 'https://twitter.com' }
        ],
        form: {
          fields: ['name', 'email', 'subject', 'message'],
          submitText: 'Send Message ✨',
          successMessage: 'Thanks for reaching out! I\'ll get back to you soon.'
        }
      }
    }
  ]
};
