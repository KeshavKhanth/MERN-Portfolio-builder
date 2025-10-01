import React, { useState, useEffect } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook, 
  FaInstagram, 
  FaYoutube,
  FaDribbble,
  FaBehance,
  FaCodepen,
  FaMedium,
  FaStackOverflow,
  FaGitlab,
  FaTelegram,
  FaWhatsapp,
  FaDiscord,
  FaSlack,
  FaTiktok,
  FaPinterest,
  FaReddit,
  FaTwitch
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  dribbble: FaDribbble,
  behance: FaBehance,
  codepen: FaCodepen,
  medium: FaMedium,
  stackoverflow: FaStackOverflow,
  gitlab: FaGitlab,
  telegram: FaTelegram,
  whatsapp: FaWhatsapp,
  discord: FaDiscord,
  slack: FaSlack,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  reddit: FaReddit,
  twitch: FaTwitch
};

const socialColors = {
  github: '#333',
  linkedin: '#0077b5',
  twitter: '#1da1f2',
  facebook: '#1877f2',
  instagram: '#e4405f',
  youtube: '#ff0000',
  dribbble: '#ea4c89',
  behance: '#1769ff',
  codepen: '#000',
  medium: '#00ab6c',
  stackoverflow: '#f48024',
  gitlab: '#fc6d26',
  telegram: '#0088cc',
  whatsapp: '#25d366',
  discord: '#5865f2',
  slack: '#4a154b',
  tiktok: '#000',
  pinterest: '#bd081c',
  reddit: '#ff4500',
  twitch: '#9146ff'
};

const SocialLinks = ({ 
  content = [],
  displayStyle = 'icons',  // Changed from 'style' to 'displayStyle'
  style,  // Keep style for CSS styling if passed
  size = 'medium',
  color = 'default',
  isEditing,
  onContentChange,
  customizations 
}) => {
  const [links, setLinks] = useState(
    content.length > 0 ? content : [
      { platform: 'github', url: 'https://github.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
      { platform: 'twitter', url: 'https://twitter.com' }
    ]
  );

  useEffect(() => {
    if (content && content.length > 0) {
      setLinks(content);
    }
  }, [content]);

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
    if (onContentChange) {
      onContentChange(updatedLinks);
    }
  };

  const addLink = () => {
    const updated = [...links, { platform: 'github', url: '' }];
    setLinks(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const removeLink = (index) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const renderLinks = () => {
    if (displayStyle === 'icons') {
      return (
        <div className="py-8">
          <div className="flex justify-center items-center gap-6">
            {links.map((link, index) => {
              const Icon = socialIcons[link.platform] || FaGithub;

              if (isEditing) {
                return (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <div className="p-2 border-2 border-dashed border-gray-300 rounded">
                      <Icon 
                        className={sizeClasses[size]} 
                        style={{ color: getIconColor(link.platform) }}
                      />
                    </div>
                    <select
                      value={link.platform}
                      onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
                      className="text-xs border border-gray-300 rounded px-1 py-0.5"
                    >
                      {Object.keys(socialIcons).map(platform => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                      placeholder="URL"
                      className="text-xs border border-gray-300 rounded px-1 py-0.5 w-24"
                    />
                    <button
                      onClick={() => removeLink(index)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                );
              }

              return (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="transition-all duration-200 hover:opacity-80"
                  style={{ color: getIconColor(link.platform) }}
                  title={link.platform}
                >
                  <Icon className={sizeClasses[size]} />
                </motion.a>
              );
            })}
            {isEditing && (
              <button
                onClick={addLink}
                className="p-2 border-2 border-dashed border-gray-300 rounded hover:bg-gray-100 text-gray-500"
              >
                <span className={sizeClasses[size]}>+</span>
              </button>
            )}
          </div>
        </div>
      );
    }

    if (displayStyle === 'buttons') {
      return (
        <div className="py-8">
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {links.map((link, index) => {
              const Icon = socialIcons[link.platform] || FaGithub;
              
              if (isEditing) {
                return (
                  <div key={index} className="flex flex-col items-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded">
                    <select
                      value={link.platform}
                      onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      {Object.keys(socialIcons).map(platform => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                      placeholder="URL"
                      className="text-sm border border-gray-300 rounded px-2 py-1 w-32"
                    />
                    <button
                      onClick={() => removeLink(index)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                );
              }

              return (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white shadow-md rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow"
                  style={{ color: getIconColor(link.platform) }}
                >
                  <Icon className={sizeClasses[size]} />
                  <span className="capitalize">{link.platform}</span>
                </motion.a>
              );
            })}
            {isEditing && (
              <button
                onClick={addLink}
                className="px-6 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
              >
                + Add Link
              </button>
            )}
          </div>
        </div>
      );
    }

    // Default style or list style
    return (
      <div className="py-8">
        <div className="flex justify-center items-center gap-6">
          {links.map((link, index) => {
            const Icon = socialIcons[link.platform] || FaGithub;
            if (isEditing) {
              return (
                <div key={index} className="flex flex-col items-center gap-1">
                  <Icon className={sizeClasses[size]} style={{ color: getIconColor(link.platform) }} />
                </div>
              );
            }
            return (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="transition-all duration-200"
                style={{ color: getIconColor(link.platform) }}
              >
                <Icon className={sizeClasses[size]} />
              </motion.a>
            );
          })}
        </div>
      </div>
    );
  }

  
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl',
    xlarge: 'text-4xl'
  };

  const getIconColor = (platform) => {
    if (color === 'brand') {
      return socialColors[platform] || '#333';
    }
    if (color === 'custom' && customizations?.colors?.primary) {
      return customizations.colors.primary;
    }
    return color || '#333';
  };

  return renderLinks();
};

export default SocialLinks;
