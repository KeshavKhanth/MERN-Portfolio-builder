import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PortfolioGrid = ({ 
  content = [],
  columns = 3,
  gap = 'medium',
  hover = 'zoom',
  isEditing,
  onContentChange,
  customizations 
}) => {
  const [projects, setProjects] = useState(
    content.length > 0 ? content : [
      {
        title: 'Project 1',
        description: 'A brief description of your amazing project',
        image: 'https://via.placeholder.com/400x300',
        link: 'https://github.com',
        tags: ['React', 'Node.js', 'MongoDB']
      },
      {
        title: 'Project 2',
        description: 'Another great project showcasing your skills',
        image: 'https://via.placeholder.com/400x300',
        link: 'https://github.com',
        tags: ['JavaScript', 'CSS', 'HTML']
      },
      {
        title: 'Project 3',
        description: 'Yet another impressive project in your portfolio',
        image: 'https://via.placeholder.com/400x300',
        link: 'https://github.com',
        tags: ['Python', 'Django', 'PostgreSQL']
      }
    ]
  );

  useEffect(() => {
    if (content && content.length > 0) {
      setProjects(content);
    }
  }, [content]);

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
    if (onContentChange) {
      onContentChange(updatedProjects);
    }
  };

  const handleTagChange = (projectIndex, tagIndex, value) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].tags[tagIndex] = value;
    setProjects(updatedProjects);
    if (onContentChange) {
      onContentChange(updatedProjects);
    }
  };

  const addProject = () => {
    const newProject = {
      title: 'New Project',
      description: 'Project description',
      image: 'https://via.placeholder.com/400x300',
      link: '#',
      tags: ['Tag1', 'Tag2']
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const addTag = (projectIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].tags.push('New Tag');
    setProjects(updatedProjects);
    if (onContentChange) {
      onContentChange(updatedProjects);
    }
  };

  const removeTag = (projectIndex, tagIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].tags = updatedProjects[projectIndex].tags.filter((_, i) => i !== tagIndex);
    setProjects(updatedProjects);
    if (onContentChange) {
      onContentChange(updatedProjects);
    }
  };

  const columnsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const gapClasses = {
    small: 'gap-4',
    medium: 'gap-6',
    large: 'gap-8'
  };

  const hoverEffects = {
    zoom: 'hover:scale-105',
    lift: 'hover:-translate-y-2',
    glow: 'hover:shadow-2xl',
    none: ''
  };

  return (
    <div className="py-12 px-6">
      <h2 
        className="text-3xl font-bold text-center mb-12"
        style={{ 
          color: customizations?.colors?.text,
          fontFamily: customizations?.fonts?.heading 
        }}
      >
        Portfolio Projects
      </h2>
      
      <div className={`max-w-7xl mx-auto grid ${columnsClasses[columns]} ${gapClasses[gap]}`}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              bg-white rounded-lg shadow-lg overflow-hidden 
              transition-all duration-300 ${hoverEffects[hover]}
              ${isEditing ? 'border-2 border-dashed border-gray-300' : ''}
            `}
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <input
                    type="text"
                    value={project.image}
                    onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                    className="px-2 py-1 bg-white text-black rounded text-sm"
                    placeholder="Image URL"
                  />
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="p-6">
              {isEditing ? (
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  className="text-xl font-semibold mb-2 w-full border-b border-gray-300 outline-none"
                />
              ) : (
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              )}

              {isEditing ? (
                <textarea
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  className="text-gray-600 mb-4 w-full border border-gray-300 rounded p-1 text-sm resize-none"
                  rows="2"
                />
              ) : (
                <p className="text-gray-600 mb-4">{project.description}</p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="flex items-center">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => handleTagChange(index, tagIndex, e.target.value)}
                          className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs"
                          size={tag.length || 5}
                        />
                        <button
                          onClick={() => removeTag(index, tagIndex)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                        {tag}
                      </span>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => addTag(index)}
                    className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs hover:bg-gray-300"
                  >
                    + Tag
                  </button>
                )}
              </div>

              {/* Project Link */}
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={project.link}
                    onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                    placeholder="Project URL"
                  />
                  <button
                    onClick={() => removeProject(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Project
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {isEditing && (
        <div className="max-w-7xl mx-auto mt-6">
          <button
            onClick={addProject}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          >
            Add New Project
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioGrid;
