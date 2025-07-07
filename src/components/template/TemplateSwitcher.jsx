import { useState, useRef, useEffect } from 'react';
import { useTemplate } from '../../context/TemplateContext';
import { useTheme } from '../../context/ThemeContext';

const TemplateSwitcher = () => {
  const { currentTemplate, templates, changeTemplate } = useTemplate();
  const { changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [useDefaultTheme, setUseDefaultTheme] = useState(true);
  const dropdownRef = useRef(null);

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

  // Handle template change
  const handleTemplateChange = (templateId) => {
    changeTemplate(templateId);
    
    // Apply default theme if option is selected
    if (useDefaultTheme && templates[templateId].defaultTheme) {
      changeTheme(templates[templateId].defaultTheme);
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm flex items-center gap-1 px-2 py-1 rounded border transition-colors"
        aria-label="Change template"
        aria-expanded={isOpen}
        aria-controls="template-dropdown"
      >
        {templates[currentTemplate].name}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div 
          id="template-dropdown"
          className="absolute mt-2 w-56 right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
        >
          <div className="py-1">
            {/* Default theme option */}
            <div className="px-4 py-2 border-b">
              <label className="flex items-center text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useDefaultTheme} 
                  onChange={() => setUseDefaultTheme(!useDefaultTheme)}
                  className="mr-2"
                />
                Apply default theme
              </label>
            </div>
            
            {/* Template options */}
            {Object.keys(templates).map((templateId) => (
              <button
                key={templateId}
                onClick={() => handleTemplateChange(templateId)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  currentTemplate === templateId 
                    ? 'bg-gray-100 text-gray-900 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2 border border-gray-300" 
                    style={{ 
                      backgroundColor: templateId === 'classic' ? '#f8fafc' : '#4f46e5'
                    }}
                  ></div>
                  {templates[templateId].name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSwitcher;
