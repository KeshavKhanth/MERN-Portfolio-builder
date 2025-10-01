import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { generateComponentStyles } from '../../utils/styleUtils';
import { FaPalette, FaFont, FaMagic } from 'react-icons/fa';

const StyleDemo = () => {
  const { customizations } = useSelector(state => state.editor);
  const [demoProps, setDemoProps] = useState({
    fontFamily: 'Inter',
    fontSize: '2xl',
    fontWeight: 'bold',
    color: '#3b82f6',
    backgroundColor: '#f0f9ff',
    padding: 'large',
    rounded: 'lg',
    shadow: 'md',
    textGradient: {
      enabled: false,
      type: 'linear',
      colors: ['#3b82f6', '#8b5cf6']
    },
    textShadow: 'none',
    letterSpacing: 'normal',
    transform: {
      rotate: 0,
      scale: 100
    }
  });

  const { styles } = generateComponentStyles(demoProps, customizations);

  const updateDemo = (key, value) => {
    setDemoProps(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 Advanced Styling Features Demo
          </h1>
          <p className="text-lg text-gray-600">
            Explore the powerful customization options available in the Portfolio Builder
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Demo Preview */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaPalette className="text-blue-600" />
              Live Preview
            </h2>
            
            <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
              <div style={styles} className="transition-all duration-300">
                The quick brown fox jumps over the lazy dog
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Generated CSS:</h3>
              <pre className="text-sm text-gray-600 overflow-x-auto">
                {JSON.stringify(styles, null, 2)}
              </pre>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaMagic className="text-purple-600" />
              Styling Controls
            </h2>

            <div className="space-y-6">
              {/* Typography */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaFont className="text-blue-500" />
                  Typography
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Font Family
                    </label>
                    <select
                      value={demoProps.fontFamily}
                      onChange={(e) => updateDemo('fontFamily', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="JetBrains Mono">JetBrains Mono</option>
                      <option value="Oswald">Oswald</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Font Size
                    </label>
                    <select
                      value={demoProps.fontSize}
                      onChange={(e) => updateDemo('fontSize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="sm">Small</option>
                      <option value="base">Base</option>
                      <option value="lg">Large</option>
                      <option value="xl">XL</option>
                      <option value="2xl">2XL</option>
                      <option value="3xl">3XL</option>
                      <option value="4xl">4XL</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Font Weight
                    </label>
                    <select
                      value={demoProps.fontWeight}
                      onChange={(e) => updateDemo('fontWeight', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="normal">Normal</option>
                      <option value="medium">Medium</option>
                      <option value="semibold">Semibold</option>
                      <option value="bold">Bold</option>
                      <option value="black">Black</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Letter Spacing
                    </label>
                    <select
                      value={demoProps.letterSpacing}
                      onChange={(e) => updateDemo('letterSpacing', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="tighter">Tighter</option>
                      <option value="tight">Tight</option>
                      <option value="normal">Normal</option>
                      <option value="wide">Wide</option>
                      <option value="wider">Wider</option>
                      <option value="widest">Widest</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Colors</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={demoProps.color}
                      onChange={(e) => updateDemo('color', e.target.value)}
                      className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={demoProps.backgroundColor}
                      onChange={(e) => updateDemo('backgroundColor', e.target.value)}
                      className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Effects */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Effects</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Shadow
                    </label>
                    <select
                      value={demoProps.shadow}
                      onChange={(e) => updateDemo('shadow', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="xl">Extra Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Border Radius
                    </label>
                    <select
                      value={demoProps.rounded}
                      onChange={(e) => updateDemo('rounded', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="xl">Extra Large</option>
                      <option value="full">Full</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Text Shadow
                    </label>
                    <select
                      value={demoProps.textShadow}
                      onChange={(e) => updateDemo('textShadow', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="colored">Colored</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Padding
                    </label>
                    <select
                      value={demoProps.padding}
                      onChange={(e) => updateDemo('padding', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="none">None</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="xl">Extra Large</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Text Gradient */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Text Gradient</h3>
                <label className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    checked={demoProps.textGradient.enabled}
                    onChange={(e) => updateDemo('textGradient', {
                      ...demoProps.textGradient,
                      enabled: e.target.checked
                    })}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-600">Enable Gradient Text</span>
                </label>
                
                {demoProps.textGradient.enabled && (
                  <select
                    value={demoProps.textGradient.type}
                    onChange={(e) => updateDemo('textGradient', {
                      ...demoProps.textGradient,
                      type: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="linear">Linear Gradient</option>
                    <option value="radial">Radial Gradient</option>
                    <option value="conic">Conic Gradient</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FaPalette className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">50+ Google Fonts</h3>
            <p className="text-gray-600 text-sm">
              Professional typography with on-demand font loading and smart fallbacks
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FaMagic className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Effects</h3>
            <p className="text-gray-600 text-sm">
              Gradients, shadows, transforms, filters and more for stunning visual effects
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FaFont className="text-green-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Theme System</h3>
            <p className="text-gray-600 text-sm">
              6 beautiful themes with import/export functionality and real-time preview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleDemo;