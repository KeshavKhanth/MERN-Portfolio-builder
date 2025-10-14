import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaInstagram, 
  FaDribbble, 
  FaFacebook,
  FaEnvelope 
} from 'react-icons/fa';

const socialIcons = {
  linkedin: FaLinkedin,
  github: FaGithub,
  twitter: FaTwitter,
  instagram: FaInstagram,
  dribbble: FaDribbble,
  facebook: FaFacebook,
  email: FaEnvelope
};

const socialColors = {
  linkedin: '#0077b5',
  github: '#333',
  twitter: '#1da1f2',
  instagram: '#e4405f',
  dribbble: '#ea4c89',
  facebook: '#1877f2',
  email: '#ea4335'
};

const ContactForm = ({ 
  fields = ['email', 'message'],
  formStyle = 'modern',  // Changed from 'style' to 'formStyle'
  style,  // Keep style for CSS styling if passed
  showLabels = true,
  recipientEmail = '',
  socialLinks = [
    { platform: 'linkedin', url: '' },
    { platform: 'github', url: '' },
    { platform: 'email', url: '' }
  ],
  isEditing,
  onPropsChange,
  customizations 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [selectedFields, setSelectedFields] = useState(fields);
  const [links, setLinks] = useState(socialLinks);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully!');
      setFormData({
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const toggleField = (field) => {
    if (selectedFields.includes(field)) {
      const updated = selectedFields.filter(f => f !== field);
      setSelectedFields(updated);
      if (onPropsChange) {
        onPropsChange({ fields: updated });
      }
    } else {
      const updated = [...selectedFields, field];
      setSelectedFields(updated);
      if (onPropsChange) {
        onPropsChange({ fields: updated });
      }
    }
  };

  const handleLinkChange = (index, field, value) => {
    const updated = links.map((link, i) => 
      i === index ? { ...link, [field]: value } : { ...link }
    );
    setLinks(updated);
    if (onPropsChange) {
      onPropsChange({ socialLinks: updated });
    }
  };

  const addLink = () => {
    const updated = [...links, { platform: '', url: '' }];
    setLinks(updated);
    if (onPropsChange) {
      onPropsChange({ socialLinks: updated });
    }
  };

  const removeLink = (index) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    if (onPropsChange) {
      onPropsChange({ socialLinks: updated });
    }
  };

  const formatUrl = (url, platform) => {
    if (!url) return '#';
    if (platform === 'email') {
      return url.includes('@') ? `mailto:${url}` : url;
    }
    return url;
  };

  const availableFields = [
    { id: 'email', label: 'Email', type: 'email', required: true },
    { id: 'subject', label: 'Subject', type: 'text', required: false },
    { id: 'message', label: 'Message', type: 'textarea', required: true }
  ];

  const styleClasses = {
    modern: 'space-y-6',
    classic: 'space-y-4',
    minimal: 'space-y-3'
  };
  
  // Use formStyle instead of style for form styling
  const currentFormStyle = formStyle || 'modern';

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Social Links */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Social Links Header */}
          <h2 
            className="text-3xl font-bold text-center mb-6"
            style={{ 
              color: customizations?.colors?.text,
              fontFamily: customizations?.fonts?.heading 
            }}
          >
            Social Links
          </h2>

          {/* Social Links Display - Only show in preview/live mode */}
          {!isEditing && (
            <div className="p-6 rounded-xl bg-white shadow-lg border border-gray-100">
              <div className="space-y-4 flex flex-col items-center px-9">
                {links.filter(link => link.platform).map((link, index) => {
                  const Icon = socialIcons[link.platform];
                  const color = socialColors[link.platform];
                  
                  return (
                    <motion.a
                      key={index}
                      href={formatUrl(link.url, link.platform)}
                      target={link.platform !== 'email' ? "_blank" : undefined}
                      rel={link.platform !== 'email' ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-2/5 flex items-center justify-center gap-4 p-5 rounded-xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-transparent hover:shadow-2xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                      style={{
                        '--hover-color': color
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                      {Icon && (
                        <div 
                          className="text-3xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 relative z-10"
                          style={{ color }}
                        >
                          <Icon />
                        </div>
                      )}
                      <div className="relative z-10">
                        <p className="font-semibold capitalize text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                          {link.platform}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Social Links Management - Only show in edit mode */}
          {isEditing && (
            <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm font-medium mb-3">Manage Social Links:</p>
              <div className="space-y-3">
                {links.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <select
                      value={link.platform}
                      onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded text-sm flex-1"
                    >
                      <option value="">Select platform</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="github">GitHub</option>
                      <option value="twitter">Twitter</option>
                      <option value="instagram">Instagram</option>
                      <option value="dribbble">Dribbble</option>
                      <option value="facebook">Facebook</option>
                      <option value="email">Email</option>
                    </select>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                      placeholder="URL or email"
                      className="px-3 py-2 border border-gray-300 rounded text-sm flex-1"
                    />
                    <button
                      onClick={() => removeLink(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={addLink}
                  className="w-full px-3 py-2 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                >
                  + Add Link
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Contact Me Header */}
          <h2 
            className="text-3xl font-bold text-center mb-6"
            style={{ 
              color: customizations?.colors?.text,
              fontFamily: customizations?.fonts?.heading 
            }}
          >
            Contact Me
          </h2>

          {/* Contact Form Box */}
          <div className="p-6 rounded-xl bg-white shadow-lg border border-gray-100 space-y-6">
          {isEditing && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Recipient Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => onPropsChange && onPropsChange({ recipientEmail: e.target.value })}
                placeholder="your-email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-gray-600 mt-1">
                Contact form submissions will be sent to this email address
              </p>
            </div>
          )}

          {isEditing && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium mb-2">Select form fields:</p>
              <div className="flex flex-wrap gap-2">
                {availableFields.map((field) => (
                  <button
                    key={field.id}
                    onClick={() => toggleField(field.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      selectedFields.includes(field.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {field.label}
                  </button>
                ))}
              </div>
            </div>
          )}

        <form 
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {selectedFields.includes('email') && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {showLabels && (
                <label className="block text-sm font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
              )}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={!showLabels ? "your@email.com" : ""}
                required
                className="w-11/12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </motion.div>
          )}

          {selectedFields.includes('phone') && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {showLabels && (
                <label className="block text-sm font-medium mb-2">
                  Phone
                </label>
              )}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={!showLabels ? "Your phone number" : ""}
                className="w-11/12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </motion.div>
          )}

          {selectedFields.includes('subject') && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {showLabels && (
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
              )}
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={!showLabels ? "Message subject" : ""}
                className="w-11/12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </motion.div>
          )}

          {selectedFields.includes('message') && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {showLabels && (
                <label className="block text-sm font-medium mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
              )}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={!showLabels ? "Your message..." : ""}
                required
                rows="5"
                className="w-11/12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              type="submit"
              disabled={isSubmitting || isEditing}
              className={`
                w-full px-6 py-3 text-white font-medium rounded-lg
                hover:opacity-90 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isSubmitting ? 'animate-pulse' : ''}
              `}
              style={{ backgroundColor: customizations?.colors?.primary || '#3b82f6' }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.div>
        </form>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;
