import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaEdit,
  FaTrash,
  FaCopy,
  FaEye,
  FaGlobe,
  FaClock,
  FaShareAlt,
  FaChartLine
} from 'react-icons/fa';
import thumbnailService from '../../services/thumbnailService';
import PortfolioThumbnail from './PortfolioThumbnail';

const PortfolioCard = ({
  portfolio,
  onDelete,
  onDuplicate,
  onTogglePublish
}) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/portfolio/${portfolio.slug}`;
    navigator.clipboard.writeText(url);
    // You can add a toast notification here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Thumbnail Preview */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <PortfolioThumbnail 
          portfolio={portfolio} 
          width={400} 
          height={192}
        />

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {portfolio.isPublished ? (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <FaGlobe className="text-xs" />
              Published
            </span>
          ) : (
            <span className="px-3 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
              Draft
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showActions ? 1 : 0 }}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2"
        >
          <Link
            to={`/editor/${portfolio._id}`}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            title="Edit"
          >
            <FaEdit className="text-lg" />
          </Link>
          <Link
            to={`/preview/${portfolio._id}`}
            className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            title="Preview"
          >
            <FaEye className="text-lg" />
          </Link>
          {portfolio.isPublished && (
            <a
              href={`/portfolio/${portfolio.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              title="View Live"
            >
              <FaGlobe className="text-lg" />
            </a>
          )}
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title and Description */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {portfolio.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {portfolio.description || 'No description available'}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <FaClock className="text-xs" />
            <span>{formatDate(portfolio.updatedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaChartLine className="text-xs" />
            <span>{portfolio.views || 0} views</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => onDuplicate(portfolio._id)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Duplicate"
            >
              <FaCopy className="text-sm" />
            </button>
            <button
              onClick={() => onDelete(portfolio._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>

          <div className="flex gap-2">
            {portfolio.isPublished && (
              <button
                onClick={handleCopyUrl}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Copy URL"
              >
                <FaShareAlt className="text-sm" />
              </button>
            )}
            <button
              onClick={() => onTogglePublish(portfolio._id)}
              className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                portfolio.isPublished
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {portfolio.isPublished ? 'Unpublish' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
