// Designer Bio Portfolio Template - Inspired by Alexandrina
const designerBioTemplate = {
  slug: 'designer-bio',
  name: 'Creative Designer',
  description: 'Elegant portfolio with sophisticated typography and layout for designers',
  thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600',
  customizations: {
    colors: {
      primary: '#E8B4B8',      // Soft pink
      secondary: '#67595E',    // Dark gray-brown
      accent: '#EED6D3',       // Light blush
      background: '#FFF8F3',   // Cream white
      text: '#49494B',         // Dark gray
      muted: '#A8A8A8',        // Medium gray
      border: '#F0E6E6',       // Light pink-gray
      cardBg: '#FFFFFF'        // Pure white
    },
    fonts: {
      heading: "'Cormorant Garamond', 'Playfair Display', serif",
      subHeading: "'Raleway', 'Montserrat', sans-serif",
      body: "'Open Sans', 'Lato', sans-serif",
      accent: "'Dancing Script', cursive"
    },
    spacing: {
      section: 'py-24',
      container: 'max-w-6xl mx-auto px-6',
      grid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'
    },
    effects: {
      elegantTransitions: true,
      softShadows: true,
      hoverLift: true,
      delicateAnimations: true
    }
  },
  sections: [
    {
      id: 'hero-designer',
      type: 'hero',
      order: 0,
      props: {
        layout: 'centered',
        height: 'tall',
        overlay: false,
        animation: 'fadeUp'
      },
      content: {
        title: 'Alexandrina Rose',
        subtitle: 'UI/UX Designer & Creative Director',
        description: 'Creating beautiful digital experiences with purpose and passion',
        backgroundImage: '',
        backgroundPattern: true,
        ctaButton: {
          text: 'Explore My Work',
          link: '#portfolio',
          style: 'bg-[#E8B4B8] text-white px-8 py-3 rounded-full hover:bg-[#67595E] transition-all duration-300 font-light tracking-wide'
        }
      },
      style: {
        background: 'linear-gradient(135deg, #FFF8F3 0%, #F5E6E8 100%)',
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    {
      id: 'intro-designer',
      type: 'text',
      order: 1,
      props: {
        alignment: 'center',
        maxWidth: '900px',
        style: {
          background: '#FFFFFF',
          padding: '100px 20px',
          position: 'relative'
        }
      },
      content: {
        heading: 'Hello, I\'m Alexandrina',
        body: `I'm a multidisciplinary designer with over 8 years of experience creating meaningful digital experiences. 
        My work combines aesthetics with functionality, always keeping the user at the heart of every design decision.
        
        I believe in the power of thoughtful design to solve complex problems and create lasting connections between brands and their audiences.`,
        signature: 'Alexandrina',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
      }
    },
    {
      id: 'services-designer',
      type: 'services',
      order: 2,
      props: {
        layout: 'elegant-cards',
        showPricing: false,
        style: {
          background: 'linear-gradient(180deg, #FFF8F3 0%, #FFFFFF 100%)',
          padding: '80px 0'
        }
      },
      content: {
        title: 'What I Do',
        subtitle: 'Services & Expertise',
        services: [
          {
            icon: '🎨',
            title: 'UI/UX Design',
            description: 'Creating intuitive and beautiful user interfaces that delight and engage',
            features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
          },
          {
            icon: '💼',
            title: 'Brand Identity',
            description: 'Developing cohesive brand identities that tell your unique story',
            features: ['Logo Design', 'Brand Guidelines', 'Color Systems', 'Typography']
          },
          {
            icon: '📱',
            title: 'Digital Products',
            description: 'Designing digital products from concept to launch',
            features: ['Mobile Apps', 'Web Applications', 'Design Systems', 'User Testing']
          },
          {
            icon: '✨',
            title: 'Creative Direction',
            description: 'Leading creative vision and strategy for brands',
            features: ['Art Direction', 'Creative Strategy', 'Team Leadership', 'Brand Campaigns']
          }
        ]
      }
    },
    {
      id: 'portfolio-designer',
      type: 'portfolio',
      order: 3,
      props: {
        layout: 'elegant-grid',
        columns: 2,
        showFilter: true,
        hoverEffect: 'elegant-zoom',
        style: {
          background: '#FFFFFF',
          padding: '100px 0'
        }
      },
      content: {
        title: 'Selected Works',
        subtitle: 'Recent Projects',
        categories: ['All', 'Branding', 'Web Design', 'Mobile', 'Print'],
        items: [
          {
            id: 1,
            title: 'Bloom Beauty Brand',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=800',
            description: 'Complete brand identity for luxury cosmetics',
            color: '#E8B4B8'
          },
          {
            id: 2,
            title: 'Mindful App',
            category: 'Mobile',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
            description: 'Meditation app UI/UX design',
            color: '#67595E'
          },
          {
            id: 3,
            title: 'Artisan Coffee Co.',
            category: 'Web Design',
            image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
            description: 'E-commerce website for specialty coffee',
            color: '#EED6D3'
          },
          {
            id: 4,
            title: 'Fashion Magazine',
            category: 'Print',
            image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800',
            description: 'Editorial design for fashion publication',
            color: '#F0E6E6'
          },
          {
            id: 5,
            title: 'Wellness Platform',
            category: 'Web Design',
            image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800',
            description: 'Health and wellness platform design',
            color: '#E8B4B8'
          },
          {
            id: 6,
            title: 'Boutique Hotel',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800',
            description: 'Luxury hotel brand identity',
            color: '#67595E'
          }
        ]
      }
    },
    {
      id: 'process-designer',
      type: 'process',
      order: 4,
      props: {
        layout: 'timeline-elegant',
        style: {
          background: 'linear-gradient(180deg, #FFF8F3 0%, #FFFFFF 100%)',
          padding: '100px 0'
        }
      },
      content: {
        title: 'My Process',
        subtitle: 'How I Work',
        steps: [
          {
            number: '01',
            title: 'Discovery',
            description: 'Understanding your needs, goals, and vision through research and consultation',
            icon: '🔍'
          },
          {
            number: '02',
            title: 'Strategy',
            description: 'Developing a clear strategy and roadmap for the project',
            icon: '📋'
          },
          {
            number: '03',
            title: 'Design',
            description: 'Creating beautiful, functional designs that align with your objectives',
            icon: '🎨'
          },
          {
            number: '04',
            title: 'Refine',
            description: 'Iterating based on feedback to perfect every detail',
            icon: '✨'
          },
          {
            number: '05',
            title: 'Deliver',
            description: 'Providing final designs and ongoing support for implementation',
            icon: '🚀'
          }
        ]
      }
    },
    {
      id: 'testimonials-designer',
      type: 'testimonials',
      order: 5,
      props: {
        layout: 'elegant-cards',
        autoplay: true,
        style: {
          background: '#FFFFFF',
          padding: '80px 0'
        }
      },
      content: {
        title: 'Client Love',
        subtitle: 'What People Say',
        testimonials: [
          {
            name: 'Isabella Martinez',
            role: 'CEO, Bloom Beauty',
            text: 'Alexandrina transformed our brand vision into something beyond our dreams. Her attention to detail and creative insight is exceptional.',
            image: 'https://i.pravatar.cc/150?img=20',
            rating: 5
          },
          {
            name: 'James Wilson',
            role: 'Founder, Mindful App',
            text: 'Working with Alexandrina was a game-changer. She understood our users deeply and created an experience that truly resonates.',
            image: 'https://i.pravatar.cc/150?img=11',
            rating: 5
          },
          {
            name: 'Sophie Chen',
            role: 'Marketing Director',
            text: 'Professional, creative, and incredibly talented. Alexandrina delivered a brand identity that perfectly captures our essence.',
            image: 'https://i.pravatar.cc/150?img=21',
            rating: 5
          }
        ]
      }
    },
    {
      id: 'cta-designer',
      type: 'cta',
      order: 6,
      props: {
        layout: 'elegant',
        style: {
          background: 'linear-gradient(135deg, #F5E6E8 0%, #FFF8F3 100%)',
          padding: '100px 20px',
          textAlign: 'center',
          position: 'relative'
        }
      },
      content: {
        heading: 'Let\'s Create Something Beautiful Together',
        subheading: 'Ready to bring your vision to life?',
        button: {
          text: 'Start a Project',
          link: '#contact',
          style: 'bg-[#67595E] text-white px-10 py-4 rounded-full hover:bg-[#E8B4B8] transition-all duration-300 font-light tracking-wide'
        }
      }
    },
    {
      id: 'contact-designer',
      type: 'contact',
      order: 7,
      props: {
        layout: 'elegant-split',
        showMap: false,
        showSocial: true,
        formStyle: 'elegant',
        style: {
          background: '#FFFFFF',
          padding: '100px 0'
        }
      },
      content: {
        title: 'Get In Touch',
        subtitle: 'I\'d love to hear from you',
        info: {
          email: 'hello@alexandrina.design',
          phone: '+1 (555) 234-5678',
          location: 'San Francisco, CA',
          availability: 'Currently accepting new projects'
        },
        fields: [
          { name: 'name', label: 'Your Name', type: 'text', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'company', label: 'Company', type: 'text', required: false },
          { name: 'project', label: 'Project Type', type: 'select', options: ['Branding', 'Web Design', 'Mobile App', 'Other'] },
          { name: 'budget', label: 'Budget Range', type: 'select', options: ['$5k-10k', '$10k-25k', '$25k-50k', '$50k+'] },
          { name: 'message', label: 'Tell me about your project', type: 'textarea', required: true, rows: 4 }
        ]
      }
    },
    {
      id: 'social-designer',
      type: 'socialLinks',
      order: 8,
      props: {
        displayStyle: 'elegant',
        size: 'medium',
        color: 'custom',
        style: {
          background: 'linear-gradient(180deg, #FFF8F3 0%, #F5E6E8 100%)',
          padding: '60px 0',
          textAlign: 'center'
        }
      },
      content: [
        { platform: 'Dribbble', url: 'https://dribbble.com' },
        { platform: 'Behance', url: 'https://behance.net' },
        { platform: 'Instagram', url: 'https://instagram.com' },
        { platform: 'LinkedIn', url: 'https://linkedin.com' }
      ]
    }
  ]
};

export default designerBioTemplate;
