import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDrop } from 'react-dnd';

// Import all component types
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsBar from './SkillsBar';
import PortfolioGrid from './PortfolioGrid';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';
import TestimonialsSection from './TestimonialsSection';
import HeadingComponent from './HeadingComponent';
import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';
import ImageComponent from './ImageComponent';
import OneLineText from './OneLineText';
import BadgeComponent from './BadgeComponent';

// Component mapping
const componentMap = {
  hero: HeroSection,
  about: AboutSection,
  skills: SkillsBar,
  portfolio: PortfolioGrid,
  projects: PortfolioGrid,
  contact: ContactForm,
  contactForm: ContactForm,
  socialLinks: SocialLinks,
  'social-links': SocialLinks,
  testimonials: TestimonialsSection,
  heading: HeadingComponent,
  text: TextComponent,
  button: ButtonComponent,
  image: ImageComponent,
  onelinetext: OneLineText,
  'one-line-text': OneLineText,
  badge: BadgeComponent
};

const Container = ({ 
  content = [],
  isEditing, 
  onContentChange,
  customizations 
}) => {
  // Ensure content is always an array
  const initialContent = Array.isArray(content) ? content : [];
  const [components, setComponents] = useState(initialContent);

  // Update local state when content prop changes
  useEffect(() => {
    const newContent = Array.isArray(content) ? content : [];
    setComponents(newContent);
  }, [content]);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'component',
    drop: (item) => {
      const newComponent = {
        id: `comp-${Date.now()}`,
        type: item.type,
        props: item.defaultProps || {},
        content: item.defaultContent || ''
      };
      const updated = [...components, newComponent];
      setComponents(updated);
      if (onContentChange) {
        onContentChange(updated);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const removeComponent = (index) => {
    const updated = components.filter((_, i) => i !== index);
    setComponents(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const updateComponent = (index, updates) => {
    const updated = components.map((comp, i) => 
      i === index ? { ...comp, ...updates } : comp
    );
    setComponents(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const renderComponent = (comp, index) => {
    const Component = componentMap[comp.type];
    
    if (!Component) {
      return (
        <div className="bg-yellow-50 p-4 rounded border border-yellow-300 text-sm text-yellow-800">
          Unknown component type: {comp.type}
        </div>
      );
    }

    return (
      <Component
        {...comp.props}
        content={comp.content}
        isEditing={isEditing}
        onContentChange={isEditing ? (newContent) => updateComponent(index, { content: newContent }) : undefined}
        onPropsChange={isEditing ? (newProps) => updateComponent(index, { props: { ...comp.props, ...newProps } }) : undefined}
        customizations={customizations}
      />
    );
  };

  return (
    <div className="py-12 px-6" style={{ backgroundColor: '#E8E4DC' }}>
      <motion.div
        ref={isEditing ? drop : null}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`
          max-w-7xl mx-auto
          ${isEditing ? 'min-h-[300px] border-2 border-dashed rounded-lg p-4' : ''}
          ${isOver && canDrop ? 'border-blue-500 bg-blue-50' : 'border-blue-300'}
        `}
        style={{ backgroundColor: isEditing ? 'transparent' : '#E8E4DC' }}
      >
        {isEditing && components.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="font-medium mb-1">Single Container</p>
              <p className="text-sm">Drag components here</p>
            </div>
          </div>
        )}
        {components.map((comp, index) => (
          <div key={comp.id || index} className="mb-4 relative group">
            {renderComponent(comp, index)}
            {isEditing && (
              <button
                onClick={() => removeComponent(index)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Container;
