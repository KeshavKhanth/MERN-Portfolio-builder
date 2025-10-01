import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProcessSection = ({ 
  content = {}, 
  layout = 'timeline',
  isEditing,
  onContentChange,
  customizations,
  style = {}
}) => {
  const [processData, setProcessData] = useState({
    title: content.title || 'My Process',
    subtitle: content.subtitle || 'How I Work',
    steps: content.steps || [
      { number: '01', title: 'Discovery', description: 'Understanding your needs', icon: '🔍' },
      { number: '02', title: 'Design', description: 'Creating the solution', icon: '🎨' },
      { number: '03', title: 'Develop', description: 'Building the product', icon: '⚡' },
      { number: '04', title: 'Deliver', description: 'Launching your project', icon: '🚀' }
    ]
  });

  const handleFieldChange = (field, value) => {
    const updated = { ...processData, [field]: value };
    setProcessData(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...processData.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    const updated = { ...processData, steps: updatedSteps };
    setProcessData(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const addStep = () => {
    const newStep = {
      number: `0${processData.steps.length + 1}`,
      title: 'New Step',
      description: 'Step description',
      icon: '✨'
    };
    handleFieldChange('steps', [...processData.steps, newStep]);
  };

  const removeStep = (index) => {
    const updatedSteps = processData.steps.filter((_, i) => i !== index);
    handleFieldChange('steps', updatedSteps);
  };

  // Sanitize style prop
  const sanitizedStyle = style && typeof style === 'object' && !Array.isArray(style)
    ? Object.fromEntries(
        Object.entries(style).filter(([key]) => 
          !key.startsWith('&') && !key.includes('::') && !key.includes(':')
        )
      )
    : {};

  if (isEditing) {
    return (
      <div className="py-16 px-6" style={sanitizedStyle}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <input
              type="text"
              value={processData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Section Title"
              className="text-3xl font-bold w-full text-center border-b-2 border-gray-300 pb-2 outline-none bg-transparent"
            />
            <input
              type="text"
              value={processData.subtitle}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              placeholder="Section Subtitle"
              className="text-xl text-gray-600 w-full text-center border-b border-gray-200 pb-1 outline-none bg-transparent"
            />
          </div>
          
          <div className="space-y-4">
            {processData.steps.map((step, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={step.number}
                    onChange={(e) => handleStepChange(index, 'number', e.target.value)}
                    placeholder="Number"
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={step.icon}
                    onChange={(e) => handleStepChange(index, 'icon', e.target.value)}
                    placeholder="Icon"
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                    placeholder="Step Title"
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => removeStep(index)}
                    className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  value={step.description}
                  onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                  placeholder="Step Description"
                  className="w-full mt-2 border border-gray-300 rounded px-2 py-1"
                  rows={2}
                />
              </div>
            ))}
            <button
              onClick={addStep}
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            >
              Add Step
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderTimeline = () => (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>
      {processData.steps.map((step, index) => (
        <motion.div
          key={index}
          className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="w-5/12"></div>
          <div className="w-2/12 flex justify-center">
            <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center text-2xl">
              {step.icon}
            </div>
          </div>
          <div className={`w-5/12 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <span 
                className="text-sm font-bold"
                style={{ color: customizations?.colors?.primary }}
              >
                {step.number}
              </span>
              <h3 className="text-xl font-bold mt-2" style={{ fontFamily: customizations?.fonts?.heading }}>
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2" style={{ fontFamily: customizations?.fonts?.body }}>
                {step.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {processData.steps.map((step, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="text-4xl mb-4">{step.icon}</div>
          <div 
            className="text-3xl font-bold mb-2"
            style={{ color: customizations?.colors?.primary }}
          >
            {step.number}
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: customizations?.fonts?.heading }}>
            {step.title}
          </h3>
          <p className="text-gray-600" style={{ fontFamily: customizations?.fonts?.body }}>
            {step.description}
          </p>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="py-16 px-6" style={sanitizedStyle}>
      <div className="max-w-6xl mx-auto">
        {processData.title && (
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: customizations?.fonts?.heading }}
            >
              {processData.title}
            </h2>
            {processData.subtitle && (
              <p 
                className="text-xl text-gray-600"
                style={{ fontFamily: customizations?.fonts?.body }}
              >
                {processData.subtitle}
              </p>
            )}
          </div>
        )}
        
        {layout === 'timeline' || layout === 'timeline-elegant' ? renderTimeline() : renderGrid()}
      </div>
    </div>
  );
};

export default ProcessSection;
