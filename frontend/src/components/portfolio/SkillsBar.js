import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SkillsBar = ({ 
  content = [],
  style = 'bar',
  animated = true,
  isEditing,
  onContentChange,
  customizations 
}) => {
  const [skills, setSkills] = useState(
    content.length > 0 ? content : [
      { name: 'JavaScript', level: 90, category: 'Frontend' },
      { name: 'React', level: 85, category: 'Frontend' },
      { name: 'Node.js', level: 80, category: 'Backend' },
      { name: 'MongoDB', level: 75, category: 'Database' }
    ]
  );

  useEffect(() => {
    if (content && content.length > 0) {
      setSkills(content);
    }
  }, [content]);

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = field === 'level' ? parseInt(value) : value;
    setSkills(newSkills);
    if (onContentChange) {
      onContentChange(newSkills);
    }
  };

  const addSkill = () => {
    const newSkill = { name: 'New Skill', level: 50, category: 'General' };
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    if (onContentChange) {
      onContentChange(updatedSkills);
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    if (onContentChange) {
      onContentChange(updatedSkills);
    }
  };

  const getSkillColor = (level) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-blue-500';
    if (level >= 40) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  if (style === 'circular') {
    return (
      <div className="py-12 px-6">
        <h2 
          className="text-3xl font-bold text-center mb-12"
          style={{ 
            color: customizations?.colors?.text,
            fontFamily: customizations?.fonts?.heading 
          }}
        >
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative inline-flex">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - skill.level / 100)}`}
                    className={`${getSkillColor(skill.level).replace('bg-', 'text-')} transition-all duration-1000`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                  {skill.level}%
                </span>
              </div>
              {isEditing ? (
                <div className="mt-2 space-y-1">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                    className="text-center border-b border-gray-300 outline-none text-sm w-full"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                    className="text-center border-b border-gray-300 outline-none text-sm w-16 mx-auto"
                  />
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <p className="mt-2 font-medium">{skill.name}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Bar style (default)
  return (
    <div className="py-12 px-6">
      <h2 
        className="text-3xl font-bold text-center mb-12"
        style={{ 
          color: customizations?.colors?.text,
          fontFamily: customizations?.fonts?.heading 
        }}
      >
        Skills & Expertise
      </h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              {isEditing ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                    className="border-b border-gray-300 outline-none font-medium"
                  />
                  <input
                    type="text"
                    value={skill.category}
                    onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                    className="border-b border-gray-300 outline-none text-sm text-gray-500"
                    placeholder="Category"
                  />
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.category}</span>
                </>
              )}
              <span className="font-semibold ml-4">{skill.level}%</span>
            </div>
            <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ 
                  duration: animated ? 1 : 0, 
                  delay: animated ? index * 0.1 : 0,
                  ease: "easeOut"
                }}
                className={`absolute top-0 left-0 h-full rounded-full ${getSkillColor(skill.level)}`}
              />
            </div>
            {isEditing && (
              <input
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                className="w-full"
              />
            )}
          </motion.div>
        ))}
        
        {isEditing && (
          <button
            onClick={addSkill}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            Add New Skill
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillsBar;
