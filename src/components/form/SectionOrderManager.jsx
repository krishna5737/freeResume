import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';

const SectionOrderManager = () => {
  const { resumeData, updateSectionOrder } = useResume();
  const [sections, setSections] = useState([]);
  
  // Define default sections
  const defaultSections = [
    { id: 'personalInfo', name: 'personalInfo', label: 'Personal Info' },
    { id: 'summary', name: 'summary', label: 'Summary' },
    { id: 'experience', name: 'experience', label: 'Experience' },
    { id: 'education', name: 'education', label: 'Education' },
    { id: 'skills', name: 'skills', label: 'Skills' },
    { id: 'projects', name: 'projects', label: 'Projects' },
    { id: 'certifications', name: 'certifications', label: 'Certifications' },
    { id: 'achievements', name: 'achievements', label: 'Achievements' },
    { id: 'pageBreak', name: 'pageBreak', label: 'Page Break' }
  ];

  // Initialize sections when component mounts or resumeData changes
  useEffect(() => {
    // Get current section order from resumeData or use default
    const currentOrder = resumeData.sectionOrder && resumeData.sectionOrder.length > 0
      ? resumeData.sectionOrder
      : defaultSections.map(section => section.id);
    
    // Map section names to items with labels
    const items = currentOrder.map(sectionId => {
      // Find the section in default sections
      const defaultSection = defaultSections.find(s => s.id === sectionId);
      if (defaultSection) {
        return {
          id: defaultSection.id,
          label: defaultSection.label
        };
      }
      
      // Custom section functionality will be rebuilt from scratch
      
      // Fallback for unknown sections
      return {
        id: sectionId,
        label: sectionId
      };
    });
    
    setSections(items);
  }, [resumeData.sectionOrder]);

  // Move a section up in the order
  const moveUp = (index) => {
    if (index === 0) return; // Already at the top
    
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index - 1];
    newSections[index - 1] = temp;
    
    setSections(newSections);
    updateSectionOrder(newSections.map(section => section.id));
  };

  // Move a section down in the order
  const moveDown = (index) => {
    if (index === sections.length - 1) return; // Already at the bottom
    
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index + 1];
    newSections[index + 1] = temp;
    
    setSections(newSections);
    updateSectionOrder(newSections.map(section => section.id));
  };

  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="text-lg font-medium mb-3">Section Order</h3>
      <p className="text-sm text-gray-600 mb-4">Use the arrows to reorder sections in your resume</p>
      
      <div className="space-y-2 border rounded-md p-3 bg-gray-50">
        {sections.map((section, index) => (
          <div 
            key={section.id} 
            className="p-3 bg-white border rounded-md flex items-center justify-between"
          >
            <div className="flex items-center">
              <span className="ml-2">{section.label}</span>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Move up"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={() => moveDown(index)}
                disabled={index === sections.length - 1}
                className={`p-1 rounded ${index === sections.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Move down"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionOrderManager;
