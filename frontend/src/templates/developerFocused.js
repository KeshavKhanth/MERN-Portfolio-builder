export const developerFocusedTemplate = {
  name: 'Developer Focused',
  slug: 'developer-focused',
  preview: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600',
  sections: [
    {
      id: 'hero-dev',
      type: 'hero',
      order: 1,
      props: {
        backgroundImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080',
        overlay: true,
        height: 'screen',
        layout: 'center',
        content: {
          title: '< Hello World />',
          subtitle: 'Full Stack Developer & Open Source Enthusiast',
          description: 'Building scalable web applications with modern JavaScript frameworks. Passionate about clean code, performance optimization, and developer experience.',
          ctaButton: { 
            text: 'View My GitHub', 
            link: 'https://github.com',
            style: 'terminal'
          },
          secondaryButton: {
            text: 'Read My Blog',
            link: '#blog',
            style: 'outline'
          },
          terminalAnimation: true
        }
      }
    },
    {
      id: 'about-dev',
      type: 'about',
      order: 2,
      props: {
        layout: 'developer',
        content: {
          title: '// About Me',
          bio: `const developer = {
  name: 'Alex Martinez',
  role: 'Full Stack Developer',
  experience: '7+ years',
  location: 'San Francisco, CA',
  
  passion: [
    'Building scalable applications',
    'Contributing to open source',
    'Learning new technologies',
    'Teaching and mentoring'
  ],
  
  currentFocus: 'Cloud-native architectures and DevOps practices'
};`,
          image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=600&h=600',
          stats: {
            commits: '3,500+',
            pullRequests: '850+',
            repositories: '120+',
            contributions: '1,200+'
          }
        }
      }
    },
    {
      id: 'skills-dev',
      type: 'techStack',
      order: 3,
      props: {
        title: 'Tech Stack',
        layout: 'categorized',
        content: {
          frontend: [
            { name: 'React', level: 95, icon: '⚛️', color: '#61DAFB' },
            { name: 'TypeScript', level: 90, icon: '📘', color: '#3178C6' },
            { name: 'Next.js', level: 85, icon: '▲', color: '#000000' },
            { name: 'Vue.js', level: 80, icon: '💚', color: '#4FC08D' },
            { name: 'Tailwind CSS', level: 90, icon: '🎨', color: '#06B6D4' }
          ],
          backend: [
            { name: 'Node.js', level: 95, icon: '🟢', color: '#339933' },
            { name: 'Express.js', level: 90, icon: '⚡', color: '#000000' },
            { name: 'Python', level: 85, icon: '🐍', color: '#3776AB' },
            { name: 'PostgreSQL', level: 85, icon: '🐘', color: '#4169E1' },
            { name: 'MongoDB', level: 80, icon: '🍃', color: '#47A248' }
          ],
          devops: [
            { name: 'Docker', level: 85, icon: '🐳', color: '#2496ED' },
            { name: 'Kubernetes', level: 75, icon: '☸️', color: '#326CE5' },
            { name: 'AWS', level: 80, icon: '☁️', color: '#FF9900' },
            { name: 'CI/CD', level: 90, icon: '🔄', color: '#2088C6' },
            { name: 'Git', level: 95, icon: '📦', color: '#F05032' }
          ],
          tools: [
            { name: 'VS Code', icon: '📝', color: '#007ACC' },
            { name: 'Postman', icon: '📬', color: '#FF6C37' },
            { name: 'Figma', icon: '🎨', color: '#F24E1E' },
            { name: 'Jira', icon: '📋', color: '#0052CC' },
            { name: 'Slack', icon: '💬', color: '#4A154B' }
          ]
        }
      }
    },
    {
      id: 'projects-dev',
      type: 'githubProjects',
      order: 4,
      props: {
        title: '{ Featured Projects }',
        subtitle: 'Open source contributions and personal projects',
        layout: 'cards',
        content: [
          {
            title: 'React Dashboard Kit',
            description: 'A comprehensive React component library for building modern dashboards',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400',
            github: 'https://github.com/username/react-dashboard-kit',
            demo: 'https://dashboard-kit-demo.vercel.app',
            stars: 2543,
            forks: 412,
            language: 'TypeScript',
            tags: ['React', 'TypeScript', 'Tailwind', 'Chart.js'],
            features: [
              '50+ Reusable Components',
              'Dark Mode Support',
              'Responsive Design',
              'TypeScript Support'
            ]
          },
          {
            title: 'Node.js API Boilerplate',
            description: 'Production-ready REST API boilerplate with authentication and testing',
            image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400',
            github: 'https://github.com/username/node-api-boilerplate',
            stars: 1876,
            forks: 298,
            language: 'JavaScript',
            tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Jest'],
            features: [
              'JWT Authentication',
              'Request Validation',
              'Unit & Integration Tests',
              'Docker Support'
            ]
          },
          {
            title: 'CLI Developer Tools',
            description: 'Collection of CLI tools to boost developer productivity',
            image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400',
            github: 'https://github.com/username/dev-cli-tools',
            npm: 'https://npmjs.com/package/dev-cli-tools',
            stars: 956,
            forks: 87,
            language: 'Python',
            tags: ['Python', 'CLI', 'Automation', 'DevOps'],
            features: [
              'Code Generation',
              'Git Workflow Automation',
              'Project Scaffolding',
              'Performance Monitoring'
            ]
          },
          {
            title: 'ML Model Pipeline',
            description: 'End-to-end machine learning pipeline with automated training and deployment',
            image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=600&h=400',
            github: 'https://github.com/username/ml-pipeline',
            stars: 634,
            forks: 112,
            language: 'Python',
            tags: ['Python', 'TensorFlow', 'Docker', 'Kubernetes'],
            features: [
              'Automated Training',
              'Model Versioning',
              'A/B Testing',
              'Real-time Inference'
            ]
          },
          {
            title: 'VS Code Theme Pack',
            description: 'Beautiful VS Code themes optimized for long coding sessions',
            image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400',
            github: 'https://github.com/username/vscode-themes',
            marketplace: 'https://marketplace.visualstudio.com',
            downloads: 45000,
            rating: 4.8,
            language: 'JSON',
            tags: ['VS Code', 'Themes', 'Productivity'],
            features: [
              '5 Color Themes',
              'Semantic Highlighting',
              'Icon Themes',
              'Bracket Colorization'
            ]
          },
          {
            title: 'Blockchain Voting DApp',
            description: 'Decentralized voting application built on Ethereum',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400',
            github: 'https://github.com/username/voting-dapp',
            demo: 'https://voting-dapp.eth',
            stars: 423,
            forks: 89,
            language: 'Solidity',
            tags: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
            features: [
              'Smart Contracts',
              'MetaMask Integration',
              'IPFS Storage',
              'Gas Optimization'
            ]
          }
        ]
      }
    },
    {
      id: 'github-stats',
      type: 'githubStats',
      order: 5,
      props: {
        title: 'GitHub Activity',
        username: 'alexmartinez',
        showStats: true,
        showLanguages: true,
        showContributions: true,
        theme: 'dark'
      }
    },
    {
      id: 'blog-dev',
      type: 'blogPosts',
      order: 6,
      props: {
        title: '// Latest Blog Posts',
        layout: 'list',
        content: [
          {
            title: 'Building Scalable Microservices with Node.js',
            excerpt: 'Learn how to design and implement microservices architecture using Node.js, Docker, and Kubernetes...',
            date: '2025-01-15',
            readTime: '8 min',
            tags: ['Node.js', 'Microservices', 'Docker'],
            link: '#'
          },
          {
            title: 'Advanced TypeScript Patterns for React Applications',
            excerpt: 'Explore advanced TypeScript patterns and best practices for building type-safe React applications...',
            date: '2025-01-08',
            readTime: '12 min',
            tags: ['TypeScript', 'React', 'Best Practices'],
            link: '#'
          },
          {
            title: 'Optimizing React Performance: A Deep Dive',
            excerpt: 'Comprehensive guide to React performance optimization techniques including code splitting, lazy loading...',
            date: '2023-12-20',
            readTime: '15 min',
            tags: ['React', 'Performance', 'Optimization'],
            link: '#'
          },
          {
            title: 'Getting Started with Web3 Development',
            excerpt: 'Introduction to blockchain development and building decentralized applications with Web3.js...',
            date: '2023-12-10',
            readTime: '10 min',
            tags: ['Web3', 'Blockchain', 'Ethereum'],
            link: '#'
          }
        ]
      }
    },
    {
      id: 'achievements-dev',
      type: 'achievements',
      order: 7,
      props: {
        title: '// Achievements & Contributions',
        content: [
          {
            icon: '🏆',
            title: 'GitHub Arctic Code Vault Contributor',
            description: 'Code preserved in Arctic Code Vault for 1000 years',
            year: '2020'
          },
          {
            icon: '🥇',
            title: 'HackathonX Winner',
            description: 'First place in international hackathon with AI project',
            year: '2023'
          },
          {
            icon: '⭐',
            title: '10K+ GitHub Stars',
            description: 'Combined stars across all open source projects',
            year: '2025'
          },
          {
            icon: '📚',
            title: 'Technical Writer',
            description: 'Published 50+ technical articles on dev.to and Medium',
            year: 'Ongoing'
          },
          {
            icon: '🎓',
            title: 'Mentor',
            description: 'Mentored 20+ junior developers through bootcamps',
            year: 'Ongoing'
          },
          {
            icon: '🎤',
            title: 'Conference Speaker',
            description: 'Spoke at ReactConf and NodeSummit',
            year: '2023'
          }
        ]
      }
    },
    {
      id: 'testimonials-dev',
      type: 'testimonials',
      order: 8,
      props: {
        title: '// What Colleagues Say',
        layout: 'carousel',
        content: [
          {
            name: 'Sarah Chen',
            role: 'Tech Lead @ Google',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150',
            text: 'Alex is an exceptional developer with deep technical knowledge. Their contributions to our open source projects have been invaluable. A true team player who writes clean, maintainable code.',
            rating: 5
          },
          {
            name: 'James Wilson',
            role: 'CTO @ StartupX',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150',
            text: 'Working with Alex transformed our development process. They implemented CI/CD pipelines that reduced our deployment time by 70%. Highly skilled and always willing to share knowledge.',
            rating: 5
          },
          {
            name: 'Maria Rodriguez',
            role: 'Senior Developer @ Microsoft',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150',
            text: 'Alex\'s code reviews are legendary. They have an eye for optimization and security that has helped our team level up. Plus, their documentation is always top-notch!',
            rating: 5
          }
        ]
      }
    },
    {
      id: 'contact-dev',
      type: 'contact',
      order: 9,
      props: {
        title: '// Get In Touch',
        subtitle: 'Have a project in mind? Let\'s build something awesome together!',
        fields: ['name', 'email', 'github', 'project_type', 'message'],
        formStyle: 'terminal',
        showLabels: true,
        terminalStyle: true,
        contactInfo: {
          email: 'alex@developer.com',
          github: 'github.com/alexmartinez',
          discord: 'alexdev#1234',
          timezone: 'PST (UTC-8)'
        }
      }
    },
    {
      id: 'footer-dev',
      type: 'socialLinks',
      order: 10,
      props: {
        displayStyle: 'icons',
        size: 'large',
        color: 'gradient',
        content: [
          { platform: 'github', url: 'https://github.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'twitter', url: 'https://twitter.com' },
          { platform: 'stackoverflow', url: 'https://stackoverflow.com' },
          { platform: 'codepen', url: 'https://codepen.io' },
          { platform: 'medium', url: 'https://medium.com' }
        ]
      }
    }
  ],
  customizations: {
    colors: {
      primary: '#10b981',
      secondary: '#6366f1',
      accent: '#f59e0b',
      background: '#0f172a',
      text: '#e2e8f0',
      muted: '#64748b',
      card: '#1e293b',
      code: '#1e1e1e'
    },
    fonts: {
      heading: 'JetBrains Mono',
      body: 'Fira Code',
      code: 'Monaco'
    },
    spacing: {
      section: '6rem',
      container: '2rem'
    },
    style: {
      theme: 'dark',
      codeTheme: true,
      animations: 'tech',
      terminal: true
    }
  }
};
