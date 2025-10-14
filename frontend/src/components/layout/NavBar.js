import React, { useState, useEffect } from 'react'

const NavBar = ({ className = '', portfolioName = 'Portfolio' }) => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const aliases = {
    hero: ['hero', 'header', 'top'],
    projects: ['projects', 'portfolio', 'portfolio-grid'],
    contact: ['contact', 'contact-form', 'get-in-touch'],
    about: ['about', 'about-section'],
    skills: ['skills', 'expertise']
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (sectionKey) => {
    setOpen(false)
    if (!sectionKey) return window.scrollTo({ top: 0, behavior: 'smooth' })
    const keys = aliases[sectionKey] || [sectionKey]
    for (const k of keys) {
      const el = document.querySelector(`[data-section-type="${k}"]`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav
      role="navigation"
      aria-label="Portfolio navigation"
      className={`w-full sticky top-0 z-50 ${className}`}
    >
      <div className={`transition-colors duration-200 ${scrolled ? 'bg-white/80 backdrop-blur-sm border-b border-gray-200' : 'bg-transparent'} `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Portfolio name removed */}
            </div>

            <div className="hidden sm:flex items-center gap-6" role="menubar" aria-label="Main menu">
              <button role="menuitem" onClick={() => scrollTo('hero')} className="text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">Home</button>
              <button role="menuitem" onClick={() => scrollTo('about')} className="text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">About</button>
              <button role="menuitem" onClick={() => scrollTo('skills')} className="text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">Skills</button>
              <button role="menuitem" onClick={() => scrollTo('projects')} className="text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">My Works</button>
              <button role="menuitem" onClick={() => scrollTo('contact')} className="text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">Contact Me</button>
            </div>

            <div className="sm:hidden">
              <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} className="p-2 rounded bg-white border border-gray-200 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  {open ? (
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 15a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {open && (
            <div className="sm:hidden py-2 border-t border-gray-100" role="menu">
                <div className="flex flex-col px-2 gap-2 pb-2">
                <button role="menuitem" onClick={() => scrollTo('hero')} className="text-left px-2 py-2 rounded hover:bg-gray-50">Home</button>
                <button role="menuitem" onClick={() => scrollTo('about')} className="text-left px-2 py-2 rounded hover:bg-gray-50">About</button>
                <button role="menuitem" onClick={() => scrollTo('skills')} className="text-left px-2 py-2 rounded hover:bg-gray-50">Skills</button>
                <button role="menuitem" onClick={() => scrollTo('projects')} className="text-left px-2 py-2 rounded hover:bg-gray-50">My Works</button>
                <button role="menuitem" onClick={() => scrollTo('contact')} className="text-left px-2 py-2 rounded hover:bg-gray-50">Contact Me</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
