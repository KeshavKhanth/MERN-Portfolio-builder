// Tattoo Artist Portfolio Template - Dark & Edgy Design
const tattooArtistTemplate = {
  slug: 'tattoo-artist',
  name: 'Ink Master',
  description: 'Dark, edgy portfolio perfect for tattoo artists and alternative creatives',
  thumbnail: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&h=600',
  customizations: {
    colors: {
      primary: '#DC2626',      // Deep red
      secondary: '#000000',     // Pure black
      accent: '#F59E0B',       // Gold accent
      background: '#0A0A0A',    // Near black
      text: '#FFFFFF',          // White text
      muted: '#525252',         // Gray for secondary text
      border: '#262626',        // Dark border
      cardBg: '#171717'         // Card background
    },
    fonts: {
      heading: "'Bebas Neue', 'Impact', sans-serif",
      subHeading: "'Oswald', sans-serif",
      body: "'Roboto', sans-serif",
      accent: "'Rock Salt', cursive"
    },
    spacing: {
      section: 'py-20',
      container: 'max-w-7xl mx-auto px-4',
      grid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
    },
    effects: {
      headerBlur: true,
      darkOverlays: true,
      neonGlow: true,
      grunge: true
    }
  },
  sections: [
    {
      id: 'hero-tattoo',
      type: 'hero',
      order: 0,
      props: {
        layout: 'split',
        height: 'screen',
        overlay: true,
        overlayOpacity: 0.7,
        animation: 'fade'
      },
      content: {
        title: 'INK MASTER',
        subtitle: 'Tattoo Artist & Designer',
        description: 'Creating living art that tells your story',
        backgroundImage: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1920',
        ctaButton: {
          text: 'VIEW MY WORK',
          link: '#gallery',
          style: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300'
        }
      },
      style: {
        background: 'linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(0,0,0,0.9) 100%)',
        position: 'relative'
      }
    },
    {
      id: 'about-tattoo',
      type: 'about',
      order: 1,
      props: {
        layout: 'split-reverse',
        showImage: true,
        showSkills: true,
        style: {
          background: '#0A0A0A',
          borderTop: '1px solid #262626',
          borderBottom: '1px solid #262626'
        }
      },
      content: {
        title: 'THE ARTIST',
        subtitle: 'Behind Every Needle',
        bio: `15+ years of experience in custom tattoo design. Specializing in blackwork, 
        neo-traditional, and photorealistic styles. Every piece is a collaboration 
        between your vision and my artistry.`,
        image: 'https://images.unsplash.com/photo-1580946542941-8cc5b89aed8b?w=800',
        skills: [
          { name: 'Blackwork', level: 95 },
          { name: 'Neo-Traditional', level: 90 },
          { name: 'Realism', level: 85 },
          { name: 'Geometric', level: 88 },
          { name: 'Custom Design', level: 92 },
          { name: 'Cover-ups', level: 87 }
        ],
        experience: [
          { year: '2008', title: 'Started Apprenticeship', description: 'Under Master Artist John Doe' },
          { year: '2012', title: 'Opened First Studio', description: 'Ink Rebellion Studio' },
          { year: '2018', title: 'Award Winner', description: 'Best Black & Gray - Tattoo Convention' },
          { year: '2023', title: 'Featured Artist', description: 'International Tattoo Magazine' }
        ]
      }
    },
    {
      id: 'portfolio-tattoo',
      type: 'portfolio',
      order: 2,
      props: {
        layout: 'masonry',
        columns: 3,
        showFilter: true,
        hoverEffect: 'zoom-dark',
        style: {
          background: '#000000',
          padding: '100px 0'
        }
      },
      content: {
        title: 'PORTFOLIO',
        subtitle: 'Living Art Gallery',
        categories: ['All', 'Blackwork', 'Color', 'Realism', 'Neo-Traditional', 'Geometric'],
        items: [
          {
            id: 1,
            title: 'Dragon Sleeve',
            category: 'Blackwork',
            image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600',
            description: 'Full sleeve Japanese dragon design'
          },
          {
            id: 2,
            title: 'Rose & Skull',
            category: 'Neo-Traditional',
            image: 'https://images.unsplash.com/photo-1567706695654-586b67e9bb7b?w=600',
            description: 'Classic neo-traditional piece'
          },
          {
            id: 3,
            title: 'Geometric Wolf',
            category: 'Geometric',
            image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600',
            description: 'Modern geometric animal design'
          },
          {
            id: 4,
            title: 'Portrait Realism',
            category: 'Realism',
            image: 'https://images.unsplash.com/photo-1598371839347-085ca29888f2?w=600',
            description: 'Photorealistic portrait work'
          },
          {
            id: 5,
            title: 'Mandala Back Piece',
            category: 'Geometric',
            image: 'https://images.unsplash.com/photo-1611501346262-5886f2b5e9c5?w=600',
            description: 'Large scale mandala design'
          },
          {
            id: 6,
            title: 'Watercolor Phoenix',
            category: 'Color',
            image: 'https://images.unsplash.com/photo-1590736969863-d08fd8fa6ee5?w=600',
            description: 'Vibrant watercolor style piece'
          }
        ]
      }
    },
    {
      id: 'services-tattoo',
      type: 'services',
      order: 3,
      props: {
        layout: 'cards-dark',
        showPricing: true,
        style: {
          background: 'linear-gradient(180deg, #000000 0%, #0A0A0A 100%)',
          padding: '80px 0'
        }
      },
      content: {
        title: 'SERVICES',
        subtitle: 'What I Offer',
        services: [
          {
            icon: '🔥',
            title: 'Custom Design',
            description: 'Unique designs tailored to your vision',
            price: 'From $300/hour',
            features: ['Consultation', 'Digital Mockup', 'Unlimited Revisions', 'Original Artwork']
          },
          {
            icon: '💀',
            title: 'Black & Gray',
            description: 'Mastery in monochrome artistry',
            price: 'From $250/hour',
            features: ['Shading Expertise', 'Fine Line Work', 'Realistic Depth', 'Timeless Style']
          },
          {
            icon: '🎨',
            title: 'Color Work',
            description: 'Vibrant, lasting color tattoos',
            price: 'From $350/hour',
            features: ['Color Theory', 'Watercolor Style', 'Neo-Traditional', 'Long-lasting Vibrancy']
          },
          {
            icon: '✨',
            title: 'Cover-ups',
            description: 'Transform old ink into new art',
            price: 'Quote on consultation',
            features: ['Free Assessment', 'Creative Solutions', 'Laser Prep Available', 'Guaranteed Coverage']
          }
        ]
      }
    },
    {
      id: 'testimonials-tattoo',
      type: 'testimonials',
      order: 4,
      props: {
        layout: 'carousel-dark',
        autoplay: true,
        style: {
          background: '#0A0A0A',
          borderTop: '1px solid #262626',
          padding: '60px 0'
        }
      },
      content: {
        title: 'CLIENT STORIES',
        subtitle: 'Inked Testimonials',
        testimonials: [
          {
            name: 'Sarah Johnson',
            role: 'Sleeve Client',
            image: 'https://i.pravatar.cc/150?img=1',
            text: 'Absolutely incredible work! The attention to detail and artistry is unmatched. My sleeve tells my story perfectly.',
            rating: 5
          },
          {
            name: 'Mike Chen',
            role: 'Cover-up Client',
            image: 'https://i.pravatar.cc/150?img=3',
            text: 'Turned my tattoo regret into a masterpiece. The creativity and skill shown was beyond expectations.',
            rating: 5
          },
          {
            name: 'Emily Rodriguez',
            role: 'First Timer',
            image: 'https://i.pravatar.cc/150?img=5',
            text: 'Made my first tattoo experience amazing. Professional, clean, and the result is stunning!',
            rating: 5
          }
        ]
      }
    },
    {
      id: 'contact-tattoo',
      type: 'contact',
      order: 5,
      props: {
        layout: 'split-dark',
        showMap: false,
        showSocial: true,
        formStyle: 'dark',
        style: {
          background: 'linear-gradient(135deg, #0A0A0A 0%, #171717 100%)',
          borderTop: '2px solid #DC2626',
          padding: '80px 0'
        }
      },
      content: {
        title: 'BOOK A SESSION',
        subtitle: 'Let\'s Create Your Next Piece',
        info: {
          address: 'Ink Rebellion Studio, 123 Art Street, Creative District',
          email: 'book@inkmaster.com',
          phone: '+1 (555) 123-4567',
          hours: 'Tue-Sat: 12PM - 8PM'
        },
        fields: [
          { name: 'name', label: 'Your Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: false },
          { name: 'idea', label: 'Tattoo Idea', type: 'textarea', required: true, placeholder: 'Describe your tattoo idea...' },
          { name: 'placement', label: 'Placement', type: 'select', options: ['Arm', 'Back', 'Chest', 'Leg', 'Other'] },
          { name: 'budget', label: 'Budget Range', type: 'select', options: ['$500-1000', '$1000-2500', '$2500+', 'Need Quote'] }
        ]
      }
    },
    {
      id: 'social-tattoo',
      type: 'socialLinks',
      order: 6,
      props: {
        displayStyle: 'floating',
        size: 'large',
        color: 'custom',
        position: 'fixed-left',
        style: {
          background: 'transparent'
        }
      },
      content: [
        { platform: 'Instagram', url: 'https://instagram.com' },
        { platform: 'Facebook', url: 'https://facebook.com' },
        { platform: 'TikTok', url: 'https://tiktok.com' },
        { platform: 'Pinterest', url: 'https://pinterest.com' }
      ]
    }
  ]
};

export default tattooArtistTemplate;
