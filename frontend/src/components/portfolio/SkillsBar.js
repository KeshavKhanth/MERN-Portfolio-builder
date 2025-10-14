import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SkillsBar = ({
  content = [],
  isEditing,
  onContentChange,
  customizations
}) => {
  // Support both array content (legacy) and object content: { description, skills }
  const initialSkills = Array.isArray(content)
    ? content.map(s => ({ ...(s || {}) }))
    : (content && content.skills) ? content.skills.map(s => ({ ...(s || {}) })) : [];

  const [skills, setSkills] = useState(
    initialSkills.length > 0
      ? initialSkills
      : [
          { name: 'JavaScript', category: 'Frontend' },
          { name: 'React', category: 'Frontend' },
          { name: 'Node.js', category: 'Backend' },
          { name: 'MongoDB', category: 'Database' }
        ]
  );

  const [description, setDescription] = useState(
    typeof content === 'object' && content && content.description ? content.description : ''
  );

  useEffect(() => {
    if (Array.isArray(content) && content.length > 0) {
      setSkills(content.map(s => ({ ...(s || {}) })));
    } else if (content && content.skills) {
      setSkills(content.skills.map(s => ({ ...(s || {}) })));
      setDescription(content.description || '');
    }
  }, [content]);

  const handleSkillChange = (index, field, value) => {
    // immutable update: clone array and the specific skill object
    const newSkills = skills.map((s, i) => (i === index ? { ...(s || {}), [field]: value } : { ...(s || {}) }));
    setSkills(newSkills);
    if (onContentChange) {
      const sanitized = newSkills.map(s => {
        const { level, ...rest } = s || {};
        return { ...rest };
      });
      const payload = Array.isArray(content) ? sanitized : { description, skills: sanitized };
      onContentChange(payload);
    }
  };

  const addSkill = () => {
    const newSkill = { name: 'New Skill', category: 'General' };
    const updatedSkills = [...skills.map(s => ({ ...(s || {}) })), newSkill];
    setSkills(updatedSkills);
    if (onContentChange) {
      const sanitized = updatedSkills.map(s => {
        const { level, ...rest } = s || {};
        return { ...rest };
      });
      const payload = Array.isArray(content) ? sanitized : { description, skills: sanitized };
      onContentChange(payload);
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index).map(s => ({ ...(s || {}) }));
    setSkills(updatedSkills);
    if (onContentChange) {
      const sanitized = updatedSkills.map(s => {
        const { level, ...rest } = s || {};
        return { ...rest };
      });
      const payload = Array.isArray(content) ? sanitized : { description, skills: sanitized };
      onContentChange(payload);
    }
  };

  return (
    <div className="py-12 px-6">
      <h2
        className="text-3xl font-bold text-center mb-4"
        style={{
          color: customizations?.colors?.text,
          fontFamily: customizations?.fonts?.heading
        }}
      >
        Skills & Expertise
      </h2>

      <div className="max-w-4xl mx-auto text-center mb-6">
        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (onContentChange) onContentChange({ description: e.target.value, skills });
            }}
            placeholder="Add a short 2-5 line description for this section"
            rows={3}
            className="w-full max-w-2xl mx-auto p-2 border border-gray-200 rounded resize-y"
          />
        ) : (
          description ? (
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          ) : null
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Responsive grid: 1 col sm, 2 col md, 3 col lg, 4 col xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-300 hover:border-blue-500 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  {isEditing ? (
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                        className="border-b border-gray-300 outline-none font-medium w-full"
                      />
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-semibold text-gray-800 text-center w-full group-hover:text-blue-600 transition-colors">{skill.name}</span>
                    </>
                  )}
                </div>
                {skill.detail && (
                  <div className="text-sm text-gray-600 mt-1">{skill.detail}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {isEditing && (
          <button
            onClick={addSkill}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            Add New Skill
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillsBar;
