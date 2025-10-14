import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PortfolioGrid = ({ content = [], columns = 3, gap = 'medium', hover = 'zoom', isEditing, onContentChange, customizations }) => {
  // Accept content as either an array of projects or an object containing a `projects` array
  const incomingProjects = Array.isArray(content)
    ? content
    : (content && Array.isArray(content.projects) ? content.projects : [])

  const initial = (incomingProjects && incomingProjects.length > 0)
    ? incomingProjects.map(p => ({ ...(p || {}) }))
    : [
      { title: 'Project 1', description: 'A brief description', image: 'https://via.placeholder.com/400x300', link: '', source: '', tags: ['React'] },
      { title: 'Project 2', description: 'Another project', image: 'https://via.placeholder.com/400x300', link: '', source: '', tags: ['Node.js'] }
    ]

  const [projects, setProjects] = useState(initial)

  useEffect(() => {
    if (Array.isArray(content) && content.length > 0) {
      setProjects(content.map(p => ({ ...(p || {}) })))
      return
    }
    if (content && Array.isArray(content.projects) && content.projects.length > 0) {
      setProjects(content.projects.map(p => ({ ...(p || {}) })))
    }
  }, [content])

  const pushChange = (updated) => {
    setProjects(updated)
    if (!onContentChange) return
    if (Array.isArray(content)) {
      onContentChange(updated.map(p => ({ ...(p || {}) })))
    } else if (content && typeof content === 'object') {
      onContentChange({ ...(content || {}), projects: updated.map(p => ({ ...(p || {}) })) })
    } else {
      // Fallback: send array
      onContentChange(updated.map(p => ({ ...(p || {}) })))
    }
  }

  const handleProjectChange = (index, field, value) => {
    const updated = projects.map((p, i) => (i === index ? { ...(p || {}), [field]: value } : { ...(p || {}) }))
    pushChange(updated)
  }

  const addProject = () => {
    const newProject = { title: 'New Project', description: '', image: '', link: '', source: '', tags: [] }
    pushChange([...projects.map(p => ({ ...(p || {}) })), newProject])
  }

  const removeProject = (index) => {
    pushChange(projects.filter((_, i) => i !== index).map(p => ({ ...(p || {}) })))
  }

  const handleTagChange = (projectIndex, tagIndex, value) => {
    const updated = projects.map((p, i) => {
      if (i !== projectIndex) return { ...(p || {}) }
      const tags = (p.tags || []).map((t, ti) => (ti === tagIndex ? value : t))
      return { ...(p || {}), tags }
    })
    pushChange(updated)
  }

  const addTag = (projectIndex) => {
    const updated = projects.map((p, i) => (i === projectIndex ? { ...(p || {}), tags: [...(p.tags || []), 'New Tag'] } : { ...(p || {}) }))
    pushChange(updated)
  }

  const removeTag = (projectIndex, tagIndex) => {
    const updated = projects.map((p, i) => (i === projectIndex ? { ...(p || {}), tags: (p.tags || []).filter((_, ti) => ti !== tagIndex) } : { ...(p || {}) }))
    pushChange(updated)
  }

  const columnsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  const gapClasses = { small: 'gap-4', medium: 'gap-6', large: 'gap-8' }
  const hoverEffects = { zoom: 'hover:scale-105', lift: 'hover:-translate-y-2', glow: 'hover:shadow-2xl', none: '' }

  const normalizeUrl = (raw) => {
    if (!raw) return ''
    try {
      // If it already has a protocol, return as-is
      const url = new URL(raw)
      return url.href
    } catch (e) {
      // No protocol present — assume https
      return `https://${raw}`
    }
  }

  return (
    <div className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8" style={{ color: customizations?.colors?.text, fontFamily: customizations?.fonts?.heading }}>
        Projects
      </h2>

      <div className={`max-w-7xl mx-auto grid ${columnsClasses[columns]} ${gapClasses[gap]}`}>
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.03 }}
            whileHover={!isEditing ? { scale: 1.05, y: -5 } : {}}
            className={`bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300 ${hoverEffects[hover]} ${isEditing ? 'border-2 border-dashed border-gray-300' : ''}`}
          >
            <div className="relative h-44 bg-gray-100 overflow-hidden">
              <img src={project.image || ''} alt={project.title} className="w-full h-full object-cover" />
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <input type="text" value={project.image || ''} onChange={(e) => handleProjectChange(index, 'image', e.target.value)} className="px-2 py-1 bg-white text-black rounded text-sm" placeholder="Image URL" />
                </div>
              )}
            </div>

            <div className="p-4">
              {isEditing ? (
                <input type="text" value={project.title || ''} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} className="text-lg font-semibold w-full mb-2 border-b border-gray-200" />
              ) : (
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              )}

              {isEditing ? (
                <textarea value={project.description || ''} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} className="w-full text-sm mb-3 border rounded p-2" rows={2} />
              ) : (
                <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {(project.tags || []).map((tag, tagIndex) => (
                  <div key={tagIndex} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input type="text" value={tag} onChange={(e) => handleTagChange(index, tagIndex, e.target.value)} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs" />
                        <button onClick={() => removeTag(index, tagIndex)} className="text-red-500 text-xs">✕</button>
                      </>
                    ) : (
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{tag}</span>
                    )}
                  </div>
                ))}
                {isEditing && <button onClick={() => addTag(index)} className="px-2 py-1 bg-gray-200 rounded text-xs">+ Tag</button>}
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <input type="text" value={project.link || ''} onChange={(e) => handleProjectChange(index, 'link', e.target.value)} className="w-full border rounded px-2 py-1 text-sm" placeholder="Project URL" />
                  <input type="text" value={project.source || ''} onChange={(e) => handleProjectChange(index, 'source', e.target.value)} className="w-full border rounded px-2 py-1 text-sm" placeholder="Source (code) URL" />
                  <div className="flex gap-2">
                    <button onClick={() => removeProject(index)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                    {project.link && <a href={normalizeUrl(project.link)} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium">Live Demo</a>}
                    {project.source && <a href={normalizeUrl(project.source)} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">View Source</a>}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {isEditing && (
        <div className="max-w-7xl mx-auto mt-6">
          <button onClick={addProject} className="w-full px-4 py-3 bg-blue-600 text-white rounded">Add New Project</button>
        </div>
      )}
    </div>
  )
}

export default PortfolioGrid
