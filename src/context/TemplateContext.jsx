import { createContext, useContext, useState, useEffect } from 'react';

// Define available resume templates
export const templates = {
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'A clean, professional design with traditional layout',
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'A colorful design with section titles highlighted in theme colors',
  }
};

// Create context
const TemplateContext = createContext();

// Custom hook to use the template context
export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

export const TemplateProvider = ({ children }) => {
  // Load template from localStorage or use default
  const loadSavedTemplate = () => {
    const savedTemplate = localStorage.getItem('resumeTemplate');
    return savedTemplate && templates[savedTemplate] ? savedTemplate : 'classic';
  };

  const [currentTemplate, setCurrentTemplate] = useState(loadSavedTemplate);

  // Save template to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('resumeTemplate', currentTemplate);
    document.body.classList.remove(...Object.keys(templates).map(t => `template-${t}`));
    document.body.classList.add(`template-${currentTemplate}`);
  }, [currentTemplate]);

  // Change the active template
  const changeTemplate = (templateId) => {
    if (templates[templateId]) {
      setCurrentTemplate(templateId);
    }
  };

  return (
    <TemplateContext.Provider
      value={{
        currentTemplate,
        templates,
        changeTemplate,
        template: templates[currentTemplate]
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateContext;
