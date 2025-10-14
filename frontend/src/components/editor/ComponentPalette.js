import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { 
  FaHeading, 
  FaAlignLeft, 
  FaImage, 
  FaSquare,
  FaMousePointer,
  FaColumns,
  FaVideo,
  FaEnvelope,
  FaShareAlt,
  FaTh,
  FaChartBar,
  FaUser,
  FaSearch,
  FaComments,
  FaRocket,
  FaCogs,
  FaLayerGroup,
  FaGripVertical,
  FaMinus,
  FaTag
} from 'react-icons/fa';
import { motion } from 'framer-motion';

// Draggable Component Item
const DraggableComponent = ({ component }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { ...component, isNew: true },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  })

  return (
    <motion.div
      ref={drag}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-3 rounded-lg border bg-white hover:border-blue-400 hover:shadow-md transition-all duration-200 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-3xl text-blue-600 mb-2">{component.icon}</div>
        <span className="text-sm font-medium text-gray-700">{component.name}</span>
      </div>
    </motion.div>
  )
}

const ComponentPalette = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('sections');

  // Component sections for building portfolio
  const components = {
    sections: [
      {
        type: 'hero',
        name: 'Hero Section',
        icon: <FaRocket />,
        category: 'sections',
        defaultProps: {
          height: 'screen',
          overlay: true,
          layout: 'center'
        },
        defaultContent: {
          title: 'Your Name Here',
          subtitle: 'Your Profession',
          description: 'A brief introduction about yourself',
          backgroundImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920',
          ctaButton: {
            text: 'View My Work',
            link: '#portfolio'
          }
        }
      },
      {
        type: 'about',
        name: 'About Section',
        icon: <FaUser />,
        category: 'sections',
        defaultProps: {
          layout: 'side-by-side',
          imagePosition: 'left'
        },
        defaultContent: {
          title: 'About Me',
          bio: 'Tell your story here. Share your journey, passion, and what drives you.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
          highlights: [
            'Key highlight 1',
            'Key highlight 2',
            'Key highlight 3'
          ]
        }
      },
      {
        type: 'skills',
        name: 'Skills Section',
        icon: <FaChartBar />,
        category: 'sections',
        defaultProps: {
          displayStyle: 'bar',
          animated: true
        },
        defaultContent: [
          { name: 'Skill 1', level: 80, category: 'Category' },
          { name: 'Skill 2', level: 75, category: 'Category' },
          { name: 'Skill 3', level: 70, category: 'Category' },
          { name: 'Skill 4', level: 85, category: 'Category' }
        ]
      },
      {
        type: 'projects',
        name: 'Project Grid 1',
        icon: <FaTh />,
        category: 'sections',
        defaultProps: {
          columns: 3,
          gap: 'medium',
          hover: 'zoom'
        },
        defaultContent: [
          {
            title: 'Project 1',
            description: 'A brief description',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
            link: '#',
            tags: ['Tool 1', 'Tool 2']
          },
          {
            title: 'Project 2',
            description: 'A brief description',
            image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600',
            link: '#',
            tags: ['Tool 1', 'Tool 2']
          },
          {
            title: 'Project 3',
            description: 'A brief description',
            image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600',
            link: '#',
            tags: ['Tool 1', 'Tool 2', 'Tool 3']
          }
        ]
      },
      {
        type: 'testimonials',
        name: 'Testimonials',
        icon: <FaComments />,
        category: 'sections',
        defaultProps: {
          layout: 'carousel'
        },
        defaultContent: [
          {
            name: 'Client Name',
            role: 'CEO at Company',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
            text: 'Amazing work! Highly recommended.',
            rating: 5
          }
        ]
      },
      {
        type: 'contact',
        name: 'Contact Form & Social Links',
        icon: <FaEnvelope />,
        category: 'sections',
        defaultProps: {
          fields: ['name', 'email', 'subject', 'message'],
          formStyle: 'modern',  // Renamed from 'style' to avoid conflict
          showLabels: true,
          socialLinks: [
            { platform: 'linkedin', url: '' },
            { platform: 'github', url: '' },
            { platform: 'email', url: '' }
          ]
        }
      },
      {
        type: 'socialLinks',
        name: 'Social Links',
        icon: <FaShareAlt />,
        category: 'sections',
        defaultProps: {
          displayStyle: 'icons',  // Renamed from 'style' to avoid conflict
          size: 'large',
          color: 'brand'
        },
        defaultContent: [
          { platform: 'github', url: 'https://github.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'twitter', url: 'https://twitter.com' }
        ]
      }
    ],
    basic: [
      {
        type: 'heading',
        name: 'Heading',
        icon: <FaHeading />,
        category: 'basic',
        defaultProps: {
          level: 'h2',
          align: 'left'
        },
        defaultContent: 'Your Heading Here'
      },
      {
        type: 'text',
        name: 'Text Box',
        icon: <FaAlignLeft />,
        category: 'basic',
        defaultProps: {
          align: 'left',
          fontSize: 'base'
        },
        defaultContent: 'Add your text content here. You can edit this text by clicking on it.'
      },
      {
        type: 'onelinetext',
        name: 'Single Line Text',
        icon: <FaMinus />,
        category: 'basic',
        defaultProps: {
          align: 'left',
          fontSize: 'base'
        },
        defaultContent: 'Single line text here'
      },
      {
        type: 'badge',
        name: 'Badge',
        icon: <FaTag />,
        category: 'basic',
        defaultProps: {
          variant: 'primary',
          size: 'medium',
          rounded: 'full'
        },
        defaultContent: 'Badge'
      },
      // image component removed from basic palette as requested
      {
        type: 'button',
        name: 'Button',
        icon: <FaMousePointer />,
        category: 'basic',
        defaultProps: {
          variant: 'primary',
          size: 'medium',
          rounded: true
        },
        defaultContent: 'Click Me'
      }
    ],
    layout: [
      {
        type: 'columns',
        name: 'Columns',
        icon: <FaColumns />,
        category: 'layout',
        defaultProps: {
          columns: 2,
          gap: 'medium'
        }
      },
      {
        type: 'container',
        name: 'Container',
        icon: <FaSquare />,
        category: 'layout',
        defaultProps: {
          columns: 2
        }
      }
    ],
    media: [
      {
        type: 'image',
        name: 'Image',
        icon: <FaImage />,
        category: 'media',
        defaultProps: {
          objectFit: 'cover',
          rounded: true,
          width: '100%',
          height: 'auto',
          alt: 'Portfolio Image'
        },
        defaultContent: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'
      },
      {
        type: 'video',
        name: 'Video',
        icon: <FaVideo />,
        category: 'media',
        defaultProps: {
          autoplay: false,
          controls: true
        },
        defaultContent: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      }
    ]
  };

  const categories = [
    { id: 'sections', name: 'Sections', icon: <FaLayerGroup /> },
    { id: 'basic', name: 'Basic', icon: <FaCogs /> },
    { id: 'layout', name: 'Layout', icon: <FaTh /> },
    { id: 'media', name: 'Media', icon: <FaVideo /> }
  ];

  // Filter components based on search and category
  const filteredComponents = () => {
    let filtered = components[selectedCategory] || [];
    
    if (searchTerm) {
      filtered = filtered.filter(comp => 
        comp.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Components
        </h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search components..."
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`
                flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                ${selectedCategory === cat.id 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <span className="text-xs">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Components Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedCategory === 'sections' && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Drag these complete sections to quickly build your portfolio
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {filteredComponents().map((component) => (
            <DraggableComponent
              key={`${component.type}-${component.name}`}
              component={component}
            />
          ))}
        </div>

        {filteredComponents().length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No components found</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600 flex items-center gap-2">
          <FaGripVertical className="text-gray-400" />
          Drag components to add them to your page
        </p>
      </div>
    </div>
  );
};

export default ComponentPalette;
