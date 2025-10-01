import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../portfolio/HeroSection';
import AboutSection from '../portfolio/AboutSection';
import SkillsBar from '../portfolio/SkillsBar';
import PortfolioGrid from '../portfolio/PortfolioGrid';
import ContactForm from '../portfolio/ContactForm';
import SocialLinks from '../portfolio/SocialLinks';
import TestimonialsSection from '../portfolio/TestimonialsSection';
import TextComponent from '../portfolio/TextComponent';
import HeadingComponent from '../portfolio/HeadingComponent';
import ImageComponent from '../portfolio/ImageComponent';
import ButtonComponent from '../portfolio/ButtonComponent';

const SectionRenderer = ({ section, isSelected, isEditable, onUpdate, customizations }) => {
  const { type, props = {}, content = {} } = section;

  // Map section types to components
  const componentMap = {
    hero: HeroSection,
    about: AboutSection,
    skills: SkillsBar,
    portfolio: PortfolioGrid,
    projects: PortfolioGrid, // Alias for portfolio
    contact: ContactForm,
    contactForm: ContactForm, // Alias for contact
    socialLinks: SocialLinks,
    social: SocialLinks, // Alias for socialLinks
    testimonials: TestimonialsSection,
    text: TextComponent,
    heading: HeadingComponent,
    image: ImageComponent,
    button: ButtonComponent,
    custom: null, // Will be handled as empty section with customizations
    empty: null // Explicitly empty section
  };

  const Component = componentMap[type];

  // Default empty section or custom section
  if (!Component || type === 'empty' || type === 'custom') {
    return (
      <div
        className={`
          relative w-full transition-all duration-200
          ${isEditable ? 'min-h-[200px]' : 'min-h-[100px]'}
        `}
        style={{
          backgroundColor: props.backgroundColor || '#f9fafb',
          padding: props.padding || '40px 20px',
          minHeight: props.minHeight || '200px',
          ...props.style
        }}
      >
        {isEditable ? (
          <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center p-8">
              <p className="text-gray-600 font-medium mb-2">
                {type === 'custom' ? 'Custom Section' : 'Empty Section'}
              </p>
              <p className="text-sm text-gray-400">
                Click to select • Use properties panel to customize
              </p>
            </div>
          </div>
        ) : (
          // In preview mode, show custom content if available
          content.html ? (
            <div dangerouslySetInnerHTML={{ __html: content.html }} />
          ) : (
            <div className="text-center text-gray-400 py-8">
              Section content will appear here
            </div>
          )
        )}
      </div>
    );
  }

  // Render section with animation
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative w-full
        ${isSelected && isEditable ? 'z-10' : ''}
      `}
      style={{
        backgroundColor: props.backgroundColor || 'transparent',
        ...props.style
      }}
    >
      <Component
        {...props}
        content={content}
        isEditing={isEditable}
        onContentChange={isEditable ? (newContent) => onUpdate({ content: newContent }) : undefined}
        onPropsChange={isEditable ? (newProps) => onUpdate({ props: { ...props, ...newProps } }) : undefined}
        customizations={customizations}
      />
    </motion.div>
  );
};

export default SectionRenderer;
