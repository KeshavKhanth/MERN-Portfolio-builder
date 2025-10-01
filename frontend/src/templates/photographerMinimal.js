// Photographer Minimal Portfolio Template - Clean & Elegant
const photographerMinimalTemplate = {
  slug: 'photographer-minimal',
  name: 'Visual Stories',
  description: 'Minimalist portfolio for photographers who let their work speak',
  thumbnail: 'https://images.unsplash.com/photo-1606933248051-b  ce88e88b08d9?w=800&h=600',
  customizations: {
    colors: {
      primary: '#000000',      // Pure black
      secondary: '#FFFFFF',    // Pure white
      accent: '#F97316',      // Warm orange accent
      background: '#FAFAFA',   // Off-white
      text: '#1F2937',        // Dark gray text
      muted: '#9CA3AF',       // Light gray
      border: '#E5E7EB',      // Very light gray
      cardBg: '#FFFFFF'       // White cards
    },
    fonts: {
      heading: "'Playfair Display', 'Georgia', serif",
      subHeading: "'Montserrat', sans-serif",
      body: "'Lato', 'Helvetica Neue', sans-serif",
      accent: "'Courier New', monospace"
    },
    spacing: {
      section: 'py-32',
      container: 'max-w-7xl mx-auto px-8',
      grid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'
    },
    effects: {
      parallax: true,
      smoothScroll: true,
      fadeIn: true,
      minimal: true
    }
  },
  sections: [
    {
      id: 'hero-photo',
      type: 'hero',
      order: 0,
      props: {
        layout: 'fullscreen',
        height: 'screen',
        overlay: false,
        animation: 'parallax'
      },
      content: {
        title: 'VISUAL STORYTELLER',
        subtitle: 'Photography by Alex Morgan',
        description: 'Capturing moments that matter',
        backgroundImage: 'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=1920',
        ctaButton: {
          text: 'View Portfolio',
          link: '#work',
          style: 'bg-white text-black px-10 py-4 font-light tracking-widest hover:bg-black hover:text-white transition-all duration-500'
        }
      },
      style: {
        position: 'relative'
      }
    },
    {
      id: 'intro-photo',
      type: 'text',
      order: 1,
      props: {
        alignment: 'center',
        maxWidth: '800px',
        style: {
          background: '#FAFAFA',
          padding: '120px 20px',
          textAlign: 'center'
        }
      },
      content: {
        heading: '"Light makes photography. Embrace it. Admire it. Love it."',
        subheading: '— Matt Hardy',
        body: `Specializing in portrait, landscape, and documentary photography. 
        Each frame tells a story, each moment captures an emotion.`
      }
    },
    {
      id: 'portfolio-photo',
      type: 'portfolio',
      order: 2,
      props: {
        layout: 'grid-minimal',
        columns: 3,
        showFilter: false,
        hoverEffect: 'fade',
        gapless: true,
        style: {
          background: '#FFFFFF',
          padding: '0'
        }
      },
      content: {
        title: '',
        subtitle: '',
        items: [
          {
            id: 1,
            title: 'Morning Light',
            category: 'Landscape',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            description: 'Swiss Alps at dawn'
          },
          {
            id: 2,
            title: 'Urban Stories',
            category: 'Street',
            image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
            description: 'City life captured'
          },
          {
            id: 3,
            title: 'Portrait Series',
            category: 'Portrait',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
            description: 'Human emotions'
          },
          {
            id: 4,
            title: 'Nature\'s Palette',
            category: 'Nature',
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
            description: 'Forest in autumn'
          },
          {
            id: 5,
            title: 'Minimalist Architecture',
            category: 'Architecture',
            image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800',
            description: 'Lines and forms'
          },
          {
            id: 6,
            title: 'Ocean Moods',
            category: 'Seascape',
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
            description: 'Waves and tranquility'
          },
          {
            id: 7,
            title: 'Desert Dreams',
            category: 'Landscape',
            image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
            description: 'Sahara expedition'
          },
          {
            id: 8,
            title: 'Street Portraits',
            category: 'Portrait',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
            description: 'Faces of the city'
          },
          {
            id: 9,
            title: 'Abstract Nature',
            category: 'Abstract',
            image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
            description: 'Patterns in nature'
          }
        ]
      }
    },
    {
      id: 'about-photo',
      type: 'about',
      order: 3,
      props: {
        layout: 'centered',
        showImage: true,
        showSkills: false,
        style: {
          background: '#FAFAFA',
          padding: '120px 20px'
        }
      },
      content: {
        title: 'ABOUT',
        subtitle: 'The Photographer',
        bio: `Based in New York City, I've been capturing life's moments for over a decade. 
        My work has been featured in National Geographic, Vogue, and numerous galleries worldwide. 
        I believe in the power of visual storytelling and the beauty found in everyday moments.`,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
        achievements: [
          '2023 - International Photography Awards Winner',
          '2022 - Featured in National Geographic',
          '2021 - Solo Exhibition at MoMA',
          '2020 - Photographer of the Year'
        ]
      }
    },
    {
      id: 'services-photo',
      type: 'services',
      order: 4,
      props: {
        layout: 'minimal-list',
        showPricing: true,
        style: {
          background: '#FFFFFF',
          padding: '100px 0',
          borderTop: '1px solid #E5E7EB',
          borderBottom: '1px solid #E5E7EB'
        }
      },
      content: {
        title: 'SERVICES',
        subtitle: 'How I Can Help',
        services: [
          {
            number: '01',
            title: 'Portrait Sessions',
            description: 'Professional portraits that capture your essence',
            price: '$500',
            duration: '2 hours',
            deliverables: '30+ edited images'
          },
          {
            number: '02',
            title: 'Event Photography',
            description: 'Documenting your special moments',
            price: '$1500',
            duration: 'Full day',
            deliverables: '200+ edited images'
          },
          {
            number: '03',
            title: 'Commercial Shoots',
            description: 'Product and brand photography',
            price: 'Custom quote',
            duration: 'Project based',
            deliverables: 'As per requirement'
          },
          {
            number: '04',
            title: 'Fine Art Prints',
            description: 'Gallery quality prints of my work',
            price: 'From $200',
            duration: 'Ready to ship',
            deliverables: 'Museum quality prints'
          }
        ]
      }
    },
    {
      id: 'testimonials-photo',
      type: 'testimonials',
      order: 5,
      props: {
        layout: 'quote-minimal',
        autoplay: false,
        style: {
          background: '#FAFAFA',
          padding: '100px 0'
        }
      },
      content: {
        title: 'KIND WORDS',
        subtitle: '',
        testimonials: [
          {
            name: 'Emma Watson',
            role: 'Actor',
            text: 'Alex has an incredible eye for capturing authentic moments. The portrait session was relaxed yet professional.',
            image: 'https://i.pravatar.cc/150?img=5'
          },
          {
            name: 'David Chen',
            role: 'Art Director',
            text: 'Working with Alex elevated our brand imagery to a whole new level. Highly recommended for commercial work.',
            image: 'https://i.pravatar.cc/150?img=8'
          },
          {
            name: 'Sophie Turner',
            role: 'Bride',
            text: 'Our wedding photos are absolutely stunning. Alex captured every emotion perfectly.',
            image: 'https://i.pravatar.cc/150?img=9'
          }
        ]
      }
    },
    {
      id: 'cta-photo',
      type: 'cta',
      order: 6,
      props: {
        layout: 'centered',
        style: {
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
          padding: '120px 20px',
          textAlign: 'center'
        }
      },
      content: {
        heading: 'Let\'s Create Together',
        subheading: 'Ready to capture your story?',
        button: {
          text: 'GET IN TOUCH',
          link: '#contact',
          style: 'border border-black px-12 py-4 hover:bg-black hover:text-white transition-all duration-300 tracking-widest'
        }
      }
    },
    {
      id: 'contact-photo',
      type: 'contact',
      order: 7,
      props: {
        layout: 'minimal',
        showMap: false,
        showSocial: false,
        formStyle: 'minimal',
        style: {
          background: '#FFFFFF',
          padding: '100px 0',
          borderTop: '1px solid #E5E7EB'
        }
      },
      content: {
        title: 'CONTACT',
        subtitle: '',
        info: {
          email: 'hello@alexmorgan.com',
          phone: '+1 (555) 123-4567',
          location: 'New York, NY'
        },
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'subject', label: 'Subject', type: 'text', required: true },
          { name: 'message', label: 'Message', type: 'textarea', required: true, rows: 5 }
        ]
      }
    },
    {
      id: 'footer-photo',
      type: 'footer',
      order: 8,
      props: {
        layout: 'minimal',
        style: {
          background: '#000000',
          color: '#FFFFFF',
          padding: '40px 0',
          textAlign: 'center',
          fontSize: '14px'
        }
      },
      content: {
        text: '© 2025 Alex Morgan Photography. All rights reserved.',
        links: [
          { text: 'Instagram', url: 'https://instagram.com' },
          { text: 'Behance', url: 'https://behance.net' },
          { text: 'Pinterest', url: 'https://pinterest.com' }
        ]
      }
    }
  ]
};

export default photographerMinimalTemplate;
