import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TestimonialsSection = ({
  content = [],
  title = 'What People Say',
  subtitle = 'Client testimonials and reviews',
  layout = 'carousel',
  isEditing,
  onContentChange,
  customizations
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(
    content.length > 0 ? content : [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CEO at TechStart',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        text: 'Working with this developer was an absolute pleasure. They delivered exceptional results and exceeded our expectations.',
        rating: 5
      },
      {
        id: 2,
        name: 'Michael Chen',
        role: 'Product Manager',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        text: 'Outstanding work! The attention to detail and commitment to quality is remarkable.',
        rating: 5
      },
      {
        id: 3,
        name: 'Emily Davis',
        role: 'Designer',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        text: 'Creative, professional, and highly skilled. I would definitely work with them again.',
        rating: 5
      }
    ]
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleTestimonialEdit = (index, field, value) => {
    const updated = [...testimonials];
    updated[index][field] = value;
    setTestimonials(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: 'New Client',
      role: 'Position',
      image: 'https://via.placeholder.com/150',
      text: 'Add testimonial text here',
      rating: 5
    };
    const updated = [...testimonials, newTestimonial];
    setTestimonials(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const removeTestimonial = (index) => {
    const updated = testimonials.filter((_, i) => i !== index);
    setTestimonials(updated);
    if (onContentChange) {
      onContentChange(updated);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  if (layout === 'grid') {
    return (
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ 
                color: customizations?.colors?.text,
                fontFamily: customizations?.fonts?.heading 
              }}
            >
              {title}
            </h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <FaQuoteLeft className="text-3xl text-blue-500 opacity-20 mb-4" />
                
                {isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={testimonial.text}
                      onChange={(e) => handleTestimonialEdit(index, 'text', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded resize-none"
                      rows="4"
                    />
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => handleTestimonialEdit(index, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      value={testimonial.role}
                      onChange={(e) => handleTestimonialEdit(index, 'role', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Role"
                    />
                    <button
                      onClick={() => removeTestimonial(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                    {renderStars(testimonial.rating)}
                    <div className="flex items-center mt-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {isEditing && (
            <div className="mt-8 text-center">
              <button
                onClick={addTestimonial}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Testimonial
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Carousel layout (default)
  return (
    <div className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ 
              color: customizations?.colors?.text,
              fontFamily: customizations?.fonts?.heading 
            }}
          >
            {title}
          </h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 md:p-12 rounded-2xl shadow-xl"
            >
              <FaQuoteLeft className="text-5xl text-blue-500 opacity-20 mb-6" />
              
              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={testimonials[currentIndex].text}
                    onChange={(e) => handleTestimonialEdit(currentIndex, 'text', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none text-lg"
                    rows="4"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={testimonials[currentIndex].name}
                      onChange={(e) => handleTestimonialEdit(currentIndex, 'name', e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      value={testimonials[currentIndex].role}
                      onChange={(e) => handleTestimonialEdit(currentIndex, 'role', e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Role"
                    />
                  </div>
                  <input
                    type="text"
                    value={testimonials[currentIndex].image}
                    onChange={(e) => handleTestimonialEdit(currentIndex, 'image', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Image URL"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => removeTestimonial(currentIndex)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                    <button
                      onClick={addTestimonial}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add New
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xl text-gray-700 mb-8 italic leading-relaxed">
                    "{testimonials[currentIndex].text}"
                  </p>
                  
                  <div className="flex justify-center mb-6">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  <div className="flex items-center justify-center">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {testimonials.length > 1 && !isEditing && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {testimonials.length > 1 && !isEditing && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
