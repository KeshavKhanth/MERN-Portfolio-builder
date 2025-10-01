import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ContactForm = ({ 
  fields = ['name', 'email', 'message'],
  formStyle = 'modern',  // Changed from 'style' to 'formStyle'
  style,  // Keep style for CSS styling if passed
  showLabels = true,
  isEditing,
  onPropsChange,
  customizations 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [selectedFields, setSelectedFields] = useState(fields);
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
        name: '',
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

  const availableFields = [
    { id: 'name', label: 'Name', type: 'text', required: true },
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
    <div className={styleClasses[currentFormStyle]}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h2 
          className="text-3xl font-bold text-center mb-8"
          style={{ 
            color: customizations?.colors?.text,
            fontFamily: customizations?.fonts?.heading 
          }}
        >
          Get In Touch
        </h2>

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
          className={styleClasses[currentFormStyle]}
        >
          <div className="space-y-6">
            {selectedFields.includes('name') && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {showLabels && (
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                )}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={!showLabels ? "Your Name" : ""}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </motion.div>
            )}

            {selectedFields.includes('email') && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </motion.div>
            )}

            {selectedFields.includes('phone') && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </motion.div>
            )}

            {selectedFields.includes('subject') && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </motion.div>
            )}

            {selectedFields.includes('message') && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                type="submit"
                disabled={isSubmitting || isEditing}
                className={`
                  w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
                  hover:bg-blue-700 transition-colors duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${isSubmitting ? 'animate-pulse' : ''}
                `}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
