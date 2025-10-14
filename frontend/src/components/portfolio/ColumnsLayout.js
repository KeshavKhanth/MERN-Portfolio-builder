import React, { useState } from 'react';
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

const ColumnsLayout = ({ 
  content = { leftColumn: [], rightColumn: [] }, 
  gap = 'medium',
  leftWidth = 50,
  isEditing, 
  onContentChange,
  customizations 
}) => {
  const [leftComponents, setLeftComponents] = useState(content.leftColumn || []);
  const [rightComponents, setRightComponents] = useState(content.rightColumn || []);

  const gapClasses = { 
    small: 'gap-4', 
    medium: 'gap-6', 
    large: 'gap-8' 
  };

  // Handle drop in left column
  const [{ isOverLeft, canDropLeft }, dropLeft] = useDrop({
    accept: 'component',
    drop: (item) => {
      const newComponent = {
        id: `comp-${Date.now()}`,
        type: item.type,
        props: item.defaultProps || {},
        content: item.defaultContent || ''
      };
      const updated = [...leftComponents, newComponent];
      setLeftComponents(updated);
      if (onContentChange) {
        onContentChange({ leftColumn: updated, rightColumn: rightComponents });
      }
    },
    collect: (monitor) => ({
      isOverLeft: monitor.isOver(),
      canDropLeft: monitor.canDrop()
    })
  });

  // Handle drop in right column
  const [{ isOverRight, canDropRight }, dropRight] = useDrop({
    accept: 'component',
    drop: (item) => {
      const newComponent = {
        id: `comp-${Date.now()}`,
        type: item.type,
        props: item.defaultProps || {},
        content: item.defaultContent || ''
      };
      const updated = [...rightComponents, newComponent];
      setRightComponents(updated);
      if (onContentChange) {
        onContentChange({ leftColumn: leftComponents, rightColumn: updated });
      }
    },
    collect: (monitor) => ({
      isOverRight: monitor.isOver(),
      canDropRight: monitor.canDrop()
    })
  });

  const removeFromLeft = (index) => {
    const updated = leftComponents.filter((_, i) => i !== index);
    setLeftComponents(updated);
    if (onContentChange) {
      onContentChange({ leftColumn: updated, rightColumn: rightComponents });
    }
  };

  const removeFromRight = (index) => {
    const updated = rightComponents.filter((_, i) => i !== index);
    setRightComponents(updated);
    if (onContentChange) {
      onContentChange({ leftColumn: leftComponents, rightColumn: updated });
    }
  };

  const updateLeftComponent = (index, updates) => {
    const updated = leftComponents.map((comp, i) => 
      i === index ? { ...comp, ...updates } : comp
    );
    setLeftComponents(updated);
    if (onContentChange) {
      onContentChange({ leftColumn: updated, rightColumn: rightComponents });
    }
  };

  const updateRightComponent = (index, updates) => {
    const updated = rightComponents.map((comp, i) => 
      i === index ? { ...comp, ...updates } : comp
    );
    setRightComponents(updated);
    if (onContentChange) {
      onContentChange({ leftColumn: leftComponents, rightColumn: updated });
    }
  };

  // Render a component with proper mapping
  const renderComponent = (comp, index, isLeft) => {
    const Component = componentMap[comp.type];
    
    if (!Component) {
      return (
        <div className="bg-yellow-50 p-4 rounded border border-yellow-300 text-sm text-yellow-800">
          Unknown component type: {comp.type}
        </div>
      );
    }

    const updateHandler = isLeft ? updateLeftComponent : updateRightComponent;

    return (
      <Component
        {...comp.props}
        content={comp.content}
        isEditing={isEditing}
        onContentChange={isEditing ? (newContent) => updateHandler(index, { content: newContent }) : undefined}
        onPropsChange={isEditing ? (newProps) => updateHandler(index, { props: { ...comp.props, ...newProps } }) : undefined}
        customizations={customizations}
      />
    );
  };

  return (
    <div className="py-12 px-6" style={{ backgroundColor: customizations?.colors?.background || 'transparent' }}>
      <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 ${gapClasses[gap]}`}>
        {/* Left Column */}
        <motion.div
          ref={isEditing ? dropLeft : null}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={`
            ${isEditing ? 'min-h-[300px] border-2 border-dashed rounded-lg p-4' : ''}
            ${isOverLeft && canDropLeft ? 'border-blue-500 bg-blue-50' : 'border-blue-300'}
          `}
        >
          {isEditing && leftComponents.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="font-medium mb-1">Left Column</p>
                <p className="text-sm">Drag components here</p>
              </div>
            </div>
          )}
          {leftComponents.map((comp, index) => (
            <div key={comp.id || index} className="mb-4 relative group">
              {renderComponent(comp, index, true)}
              {isEditing && (
                <button
                  onClick={() => removeFromLeft(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </motion.div>

        {/* Right Column */}
        <motion.div
          ref={isEditing ? dropRight : null}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`
            ${isEditing ? 'min-h-[300px] border-2 border-dashed rounded-lg p-4' : ''}
            ${isOverRight && canDropRight ? 'border-blue-500 bg-blue-50' : 'border-blue-300'}
          `}
        >
          {isEditing && rightComponents.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="font-medium mb-1">Right Column</p>
                <p className="text-sm">Drag components here</p>
              </div>
            </div>
          )}
          {rightComponents.map((comp, index) => (
            <div key={comp.id || index} className="mb-4 relative group">
              {renderComponent(comp, index, false)}
              {isEditing && (
                <button
                  onClick={() => removeFromRight(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ColumnsLayout;
