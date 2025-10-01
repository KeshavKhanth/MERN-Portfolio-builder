export const professionalCorporateTemplate = {
  name: 'Professional Corporate',
  slug: 'professional-corporate',
  preview: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600',
  sections: [
    {
      id: 'hero-corp',
      type: 'hero',
      order: 1,
      props: {
        backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080',
        overlay: true,
        height: 'large',
        layout: 'left',
        content: {
          title: 'Michael Thompson',
          subtitle: 'Senior Business Consultant',
          description: 'Strategic advisor helping Fortune 500 companies transform their digital operations and achieve sustainable growth.',
          ctaButton: { 
            text: 'Schedule Consultation', 
            link: '#contact',
            style: 'professional'
          },
          secondaryButton: {
            text: 'Download CV',
            link: '#',
            style: 'outline'
          }
        }
      }
    },
    {
      id: 'about-corp',
      type: 'about',
      order: 2,
      props: {
        layout: 'side-by-side',
        imagePosition: 'right',
        content: {
          title: 'Professional Background',
          bio: `With over 15 years of experience in business consulting, I specialize in helping organizations 
                navigate complex challenges and implement strategic solutions. My approach combines analytical 
                rigor with creative problem-solving to deliver measurable results.
                
                I hold an MBA from Harvard Business School and have worked with leading companies across 
                technology, finance, and healthcare sectors. My expertise includes digital transformation, 
                operational excellence, and strategic planning.`,
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600',
          highlights: [
            '15+ Years Experience',
            'MBA Harvard Business School',
            '100+ Successful Projects',
            'Fortune 500 Advisor'
          ],
          certifications: [
            'PMP Certified',
            'Six Sigma Black Belt',
            'Agile Certified Practitioner'
          ]
        }
      }
    },
    {
      id: 'experience-corp',
      type: 'experience',
      order: 3,
      props: {
        title: 'Professional Experience',
        content: [
          {
            position: 'Senior Partner',
            company: 'Global Strategy Consultants',
            period: '2018 - Present',
            location: 'New York, NY',
            description: 'Leading strategic initiatives for Fortune 500 clients, managing teams of 20+ consultants, and driving $50M+ in revenue.',
            achievements: [
              'Led digital transformation for 10+ major corporations',
              'Generated $200M+ in cost savings for clients',
              'Developed proprietary consulting framework'
            ]
          },
          {
            position: 'Principal Consultant',
            company: 'McKenzie & Associates',
            period: '2014 - 2018',
            location: 'Boston, MA',
            description: 'Managed key client relationships and delivered strategic solutions across multiple industries.',
            achievements: [
              'Grew client portfolio by 150%',
              'Published 5 industry whitepapers',
              'Speaker at 20+ industry conferences'
            ]
          },
          {
            position: 'Senior Business Analyst',
            company: 'Tech Innovations Inc.',
            period: '2009 - 2014',
            location: 'San Francisco, CA',
            description: 'Analyzed business processes and implemented optimization strategies for technology companies.',
            achievements: [
              'Improved operational efficiency by 40%',
              'Led cross-functional teams of 15+ members',
              'Implemented ERP systems for 5 companies'
            ]
          }
        ]
      }
    },
    {
      id: 'services-corp',
      type: 'services',
      order: 4,
      props: {
        title: 'Consulting Services',
        subtitle: 'Comprehensive solutions for your business challenges',
        layout: 'cards',
        content: [
          {
            icon: '📊',
            title: 'Strategic Planning',
            description: 'Develop comprehensive strategies aligned with your business goals',
            features: [
              'Market Analysis',
              'Competitive Positioning',
              'Growth Strategies',
              'Risk Management'
            ],
            price: 'From $5,000'
          },
          {
            icon: '🚀',
            title: 'Digital Transformation',
            description: 'Navigate the digital landscape and modernize your operations',
            features: [
              'Technology Assessment',
              'Process Automation',
              'Cloud Migration',
              'Data Analytics'
            ],
            price: 'From $10,000'
          },
          {
            icon: '📈',
            title: 'Operational Excellence',
            description: 'Optimize processes and improve organizational efficiency',
            features: [
              'Process Optimization',
              'Cost Reduction',
              'Quality Improvement',
              'Performance Metrics'
            ],
            price: 'From $7,500'
          },
          {
            icon: '👥',
            title: 'Leadership Development',
            description: 'Build strong leadership capabilities within your organization',
            features: [
              'Executive Coaching',
              'Team Building',
              'Change Management',
              'Succession Planning'
            ],
            price: 'From $3,000'
          }
        ]
      }
    },
    {
      id: 'achievements-corp',
      type: 'achievements',
      order: 5,
      props: {
        title: 'Key Achievements',
        content: [
          {
            icon: '🏆',
            metric: '150+',
            label: 'Projects Completed',
            description: 'Successfully delivered complex consulting projects'
          },
          {
            icon: '💼',
            metric: '50+',
            label: 'Fortune 500 Clients',
            description: 'Trusted advisor to industry leaders'
          },
          {
            icon: '💰',
            metric: '$500M+',
            label: 'Value Generated',
            description: 'Combined savings and revenue growth for clients'
          },
          {
            icon: '⭐',
            metric: '98%',
            label: 'Client Satisfaction',
            description: 'Consistently exceeding client expectations'
          }
        ]
      }
    },
    {
      id: 'testimonials-corp',
      type: 'testimonials',
      order: 6,
      props: {
        title: 'Client Testimonials',
        layout: 'grid',
        content: [
          {
            name: 'Jennifer Roberts',
            role: 'CEO, TechCorp Industries',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150',
            text: 'Michael\'s strategic insights transformed our business. His ability to identify opportunities and implement solutions is unparalleled. We achieved a 40% increase in operational efficiency within six months.',
            rating: 5,
            company: 'TechCorp Industries'
          },
          {
            name: 'David Chen',
            role: 'CFO, Global Finance Group',
            image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150',
            text: 'Working with Michael was a game-changer for our organization. His expertise in digital transformation helped us modernize our operations and stay ahead of the competition.',
            rating: 5,
            company: 'Global Finance Group'
          },
          {
            name: 'Sarah Williams',
            role: 'VP Operations, Healthcare Plus',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150',
            text: 'Michael\'s consultancy services exceeded our expectations. His strategic approach and attention to detail resulted in significant cost savings and improved processes.',
            rating: 5,
            company: 'Healthcare Plus'
          }
        ]
      }
    },
    {
      id: 'education-corp',
      type: 'education',
      order: 7,
      props: {
        title: 'Education & Certifications',
        content: [
          {
            degree: 'Master of Business Administration (MBA)',
            institution: 'Harvard Business School',
            year: '2008',
            location: 'Boston, MA',
            honors: 'Magna Cum Laude'
          },
          {
            degree: 'Bachelor of Science in Economics',
            institution: 'Stanford University',
            year: '2004',
            location: 'Stanford, CA',
            honors: 'Summa Cum Laude'
          }
        ],
        certifications: [
          {
            name: 'Project Management Professional (PMP)',
            issuer: 'Project Management Institute',
            year: '2015'
          },
          {
            name: 'Six Sigma Black Belt',
            issuer: 'ASQ',
            year: '2016'
          },
          {
            name: 'Certified Management Consultant (CMC)',
            issuer: 'IMC USA',
            year: '2017'
          }
        ]
      }
    },
    {
      id: 'publications-corp',
      type: 'publications',
      order: 8,
      props: {
        title: 'Publications & Speaking',
        content: {
          publications: [
            {
              title: 'Digital Transformation in the Modern Enterprise',
              publisher: 'Harvard Business Review',
              year: '2023',
              link: '#'
            },
            {
              title: 'The Future of Business Consulting',
              publisher: 'McKinsey Quarterly',
              year: '2022',
              link: '#'
            },
            {
              title: 'Strategic Leadership in Times of Change',
              publisher: 'MIT Sloan Management Review',
              year: '2021',
              link: '#'
            }
          ],
          speaking: [
            {
              event: 'Global Business Summit 2023',
              topic: 'Leading Digital Transformation',
              location: 'New York, NY'
            },
            {
              event: 'Tech Innovation Conference 2023',
              topic: 'Future of Work',
              location: 'San Francisco, CA'
            },
            {
              event: 'Executive Leadership Forum 2022',
              topic: 'Strategic Decision Making',
              location: 'Boston, MA'
            }
          ]
        }
      }
    },
    {
      id: 'contact-corp',
      type: 'contact',
      order: 9,
      props: {
        title: 'Schedule a Consultation',
        subtitle: 'Let\'s discuss how I can help transform your business',
        fields: ['name', 'email', 'company', 'phone', 'subject', 'message'],
        formStyle: 'professional',
        showLabels: true,
        contactInfo: {
          email: 'michael.thompson@consulting.com',
          phone: '+1 (555) 123-4567',
          location: 'New York, NY',
          availability: 'Monday - Friday, 9:00 AM - 6:00 PM EST'
        }
      }
    },
    {
      id: 'footer-corp',
      type: 'socialLinks',
      order: 10,
      props: {
        displayStyle: 'buttons',
        size: 'medium',
        color: 'professional',
        content: [
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'twitter', url: 'https://twitter.com' },
          { platform: 'medium', url: 'https://medium.com' }
        ]
      }
    }
  ],
  customizations: {
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#0891b2',
      background: '#f8fafc',
      text: '#1e293b',
      muted: '#94a3b8',
      card: '#ffffff'
    },
    fonts: {
      heading: 'Montserrat',
      body: 'Roboto'
    },
    spacing: {
      section: '5rem',
      container: '1.5rem'
    },
    style: {
      professional: true,
      animations: 'subtle',
      borderRadius: 'minimal'
    }
  }
};
