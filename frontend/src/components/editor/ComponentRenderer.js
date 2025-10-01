import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { Rnd } from 'react-rnd';
import {
  FaTrash,
  FaCopy,
  FaLayerGroup,
  FaEdit,
  FaGripVertical
} from 'react-icons/fa';

// Individual component renderers
import TextComponent from '../portfolio/TextComponent';
import TextSection from '../portfolio/TextSection';
import HeadingComponent from '../portfolio/HeadingComponent';
import ImageComponent from '../portfolio/ImageComponent';
import ButtonComponent from '../portfolio/ButtonComponent';
import HeroSection from '../portfolio/HeroSection';
import AboutSection from '../portfolio/AboutSection';
import SkillsBar from '../portfolio/SkillsBar';
import PortfolioGrid from '../portfolio/PortfolioGrid';
import ContactForm from '../portfolio/ContactForm';
import SocialLinks from '../portfolio/SocialLinks';
import CTASection from '../portfolio/CTASection';
import ProcessSection from '../portfolio/ProcessSection';
import FooterSection from '../portfolio/FooterSection';
import ServicesSection from '../portfolio/ServicesSection';

const componentMap = {
  text: (props) => {
    // Check if content is an object with heading/body structure
    if (typeof props.content === 'object' && props.content !== null && 
        (props.content.heading || props.content.body || props.content.subheading)) {
      return <TextSection {...props} />;
    }
    return <TextComponent {...props} />;
  },
  heading: HeadingComponent,
  image: ImageComponent,
  button: ButtonComponent,
  hero: HeroSection,
  about: AboutSection,
  skills: SkillsBar,
  portfolio: PortfolioGrid,
  'portfolio-grid': PortfolioGrid,
  contact: ContactForm,
  'contact-form': ContactForm,
  contactForm: ContactForm,
  socialLinks: SocialLinks,
  'social-links': SocialLinks,
  testimonials: null, // Will be rendered through sections
  services: ServicesSection,
  process: ProcessSection,
  cta: CTASection,
  footer: FooterSection,
  custom: null, // Custom sections
  empty: null, // Empty sections
  // Add more component mappings as needed
};

const ComponentRenderer = ({
  component,
  isSelected,
  isEditable,
  onClick,
  onUpdate,
  customizations
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const componentRef = useRef(null);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'component',
    item: {
      id: component.id,
      type: component.type,
      isNew: false
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  // Get the component - handle function components
  const ComponentType = componentMap[component.type];
  const Component = typeof ComponentType === 'function' && !ComponentType.prototype?.isReactComponent 
    ? ComponentType 
    : ComponentType;

  if (!Component) {
    // Handle empty and custom sections
    if (component.type === 'empty' || component.type === 'custom') {
      return (
        <div 
          className="relative w-full min-h-[100px] p-4"
          style={{
            backgroundColor: component.props?.backgroundColor || '#f9fafb',
            ...(component.props?.style && typeof component.props.style === 'object' && !Array.isArray(component.props.style) 
              ? Object.fromEntries(
                  Object.entries(component.props.style).filter(([key]) => 
                    !key.startsWith('&') && !key.includes('::') && !key.includes(':')
                  )
                )
              : {})
          }}
          onClick={onClick}
        >
          {isEditable ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-600 font-medium">
                {component.type === 'custom' ? 'Custom Section' : 'Empty Section'}
              </p>
              <p className="text-sm text-gray-400">
                Use properties panel to customize
              </p>
            </div>
          ) : (
            component.content?.html ? (
              <div dangerouslySetInnerHTML={{ __html: component.content.html }} />
            ) : null
          )}
        </div>
      );
    }
    
    // Return null for unknown types in preview mode, error in edit mode
    if (!isEditable) {
      return null;
    }
    
    return (
      <div className="p-4 bg-red-50 border border-red-300 rounded">
        <p className="text-red-600">Unknown component type: {component.type}</p>
      </div>
    );
  }

  const handleResize = (e, direction, ref, delta, position) => {
    onUpdate({
      size: {
        width: ref.style.width,
        height: ref.style.height
      },
      position
    });
  };

  const handleDragStop = (e, d) => {
    onUpdate({
      position: { x: d.x, y: d.y }
    });
  };

  const renderComponent = () => {
    // Sanitize style prop if it exists in component.props
    const sanitizedProps = { ...component.props };
    if (sanitizedProps.style && typeof sanitizedProps.style === 'object') {
      // Remove invalid CSS properties like pseudo-selectors
      const cleanStyle = {};
      for (const [key, value] of Object.entries(sanitizedProps.style)) {
        // Skip pseudo-selectors and invalid keys
        if (!key.startsWith('&') && !key.includes('::') && !key.includes(':')) {
          cleanStyle[key] = value;
        }
      }
      sanitizedProps.style = cleanStyle;
    }
    
    // Ensure content is properly passed based on component type
    const componentProps = {
      ...sanitizedProps,
      customizations,
      isEditing,
      onContentChange: (newContent) => onUpdate({ content: newContent }),
      onPropsChange: (newProps) => onUpdate({ props: { ...component.props, ...newProps } })
    };
    
    // Pass content appropriately based on component type
    if (component.type === 'socialLinks' || Array.isArray(component.content)) {
      componentProps.content = component.content || [];
    } else if (typeof component.content === 'object') {
      componentProps.content = component.content;
    } else {
      componentProps.content = component.content;
    }
    
    // Handle function components that return components
    if (typeof Component === 'function' && !Component.prototype?.isReactComponent) {
      return Component(componentProps);
    }
    
    return <Component {...componentProps} />;
  };

  if (!isEditable) {
    return (
      <div
        style={{
          position: component.position ? 'absolute' : 'relative',
          left: component.position?.x || 0,
          top: component.position?.y || 0,
          width: component.size?.width || 'auto',
          height: component.size?.height || 'auto',
          // Ensure we don't pass arrays or invalid values to style
          ...(typeof component.style === 'object' && !Array.isArray(component.style) ? component.style : {})
        }}
      >
        {renderComponent()}
      </div>
    );
  }

  return (
    <Rnd
      default={{
        x: component.position?.x || 0,
        y: component.position?.y || 0,
        width: component.size?.width || 'auto',
        height: component.size?.height || 'auto'
      }}
      minWidth={100}
      minHeight={50}
      bounds="parent"
      onDragStop={handleDragStop}
      onResize={handleResize}
      disableDragging={!isEditable || isEditing}
      enableResizing={isEditable && isSelected && !isEditing}
      className={`
        component-wrapper
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${isDragging ? 'opacity-50' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        ref={(node) => {
          componentRef.current = node;
          if (isEditable && !isEditing) {
            drag(node);
            dragPreview(node);
          }
        }}
        className="relative h-full"
      >
        {/* Component Toolbar */}
        {isEditable && (isSelected || isHovered) && !isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-10 left-0 flex items-center space-x-1 bg-gray-800 rounded-lg p-1 z-50"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="p-1.5 text-white hover:bg-gray-700 rounded transition-colors"
              title="Edit Content"
            >
              <FaEdit size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle duplicate
              }}
              className="p-1.5 text-white hover:bg-gray-700 rounded transition-colors"
              title="Duplicate"
            >
              <FaCopy size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle layer
              }}
              className="p-1.5 text-white hover:bg-gray-700 rounded transition-colors"
              title="Layers"
            >
              <FaLayerGroup size={14} />
            </button>
            <div className="w-px h-4 bg-gray-600 mx-1" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle delete through parent
              }}
              className="p-1.5 text-red-400 hover:bg-gray-700 rounded transition-colors"
              title="Delete"
            >
              <FaTrash size={14} />
            </button>
            <div className="px-2 text-white cursor-move" title="Drag to move">
              <FaGripVertical size={14} />
            </div>
          </motion.div>
        )}

        {/* Component Content */}
        <div className={isEditing ? 'pointer-events-auto' : 'pointer-events-none'}>
          {renderComponent()}
        </div>

        {/* Selection Outline */}
        {isSelected && isEditable && !isEditing && (
          <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none rounded">
            {/* Resize Handles */}
            <div className="absolute -right-2 -bottom-2 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize" />
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-e-resize" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-s-resize" />
          </div>
        )}

        {/* Edit Mode Overlay */}
        {isEditing && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-10 border-2 border-blue-500 rounded pointer-events-none">
            <div className="absolute top-2 right-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-600 pointer-events-auto"
              >
                Done Editing
              </button>
            </div>
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default ComponentRenderer;
