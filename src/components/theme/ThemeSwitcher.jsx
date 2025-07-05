import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeSwitcher = () => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Color mappings for theme swatches
  const themeColors = {
    blue: ['#1e40af', '#2563eb', '#60a5fa'],  // Navy, Medium Blue, Sky Blue
    red: ['#991b1b', '#dc2626', '#f87171'],    // Dark Red, Medium Red, Light Red
    green: ['#166534', '#16a34a', '#2dd4bf'],  // Dark Green, Medium Green, Teal
    purple: ['#581c87', '#9333ea', '#a78bfa'], // Deep Purple, Medium Purple, Light Violet
    gray: ['#1f2937', '#4b5563', '#9ca3af']    // Charcoal, Medium Gray, Silver
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-1">
        <div className="flex">
          {themeColors[currentTheme].map((color, index) => (
            <div 
              key={index} 
              className="w-3 h-3 rounded-full border border-gray-200" 
              style={{ 
                backgroundColor: color,
                marginLeft: index > 0 ? '-3px' : '0',
                zIndex: 3 - index
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm flex items-center gap-1 px-2 py-1 rounded border transition-colors"
          aria-label="Change theme"
          aria-expanded={isOpen}
          aria-controls="theme-dropdown"
        >
          {themes[currentTheme].name}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div 
          id="theme-dropdown"
          className="absolute mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
        >
          <div className="py-1">
            {Object.keys(themes).map((themeName) => (
              <button
                key={themeName}
                onClick={() => handleThemeChange(themeName)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  currentTheme === themeName 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {themeColors[themeName].map((color, index) => (
                      <div 
                        key={index} 
                        className="w-3 h-3 rounded-full border border-gray-200" 
                        style={{ 
                          backgroundColor: color,
                          marginLeft: index > 0 ? '-3px' : '0',
                          zIndex: 3 - index
                        }}
                      />
                    ))}
                  </div>
                  {themes[themeName].name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
