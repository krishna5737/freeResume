import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CertificationsForm from './CertificationsForm';
import AchievementsForm from './AchievementsForm';
// import PageBreakForm from './PageBreakForm';

const ResumeForm = () => {
  const { resumeData, updateSectionOrder } = useResume();
  // Custom section functionality will be rebuilt from scratch
  // Only one section can be open at a time
  const [expandedSection, setExpandedSection] = useState('personalInfo');
  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  
  // Define all section definitions
  const sectionDefinitions = [
    { id: 'personalInfo', label: 'Personal Info', component: <PersonalInfoForm /> },
    { id: 'summary', label: 'Summary', component: <SummaryForm /> },
    { id: 'experience', label: 'Experience', component: <ExperienceForm /> },
    { id: 'education', label: 'Education', component: <EducationForm /> },
    { id: 'skills', label: 'Skills', component: <SkillsForm /> },
    { id: 'projects', label: 'Projects', component: <ProjectsForm /> },
    { id: 'certifications', label: 'Certifications', component: <CertificationsForm /> },
    { id: 'achievements', label: 'Achievements', component: <AchievementsForm /> },
    // { id: 'pageBreak', label: 'Page Break', component: <PageBreakForm /> },
  ];

  // Custom section functionality will be rebuilt from scratch

  const toggleSection = (sectionKey) => {
    // If clicking on the already expanded section, close it
    // Otherwise, open the clicked section and close others
    setExpandedSection(expandedSection === sectionKey ? '' : sectionKey);
  };
  
  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    // Add styling to the dragged item
    e.currentTarget.classList.add('opacity-50');
  };
  
  const handleDragEnter = (e, index) => {
    setDragOverItem(index);
    // Add styling to indicate drop target
    e.currentTarget.classList.add('bg-gray-100');
  };
  
  const handleDragLeave = (e) => {
    // Remove styling when leaving a potential drop target
    e.currentTarget.classList.remove('bg-gray-100');
  };
  
  const handleDragEnd = (e) => {
    // Remove all styling
    e.currentTarget.classList.remove('opacity-50');
    setDraggedItem(null);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    // Remove styling
    e.currentTarget.classList.remove('bg-gray-100');
    
    // Reorder sections
    if (draggedItem !== null && dragOverItem !== null && draggedItem !== dragOverItem) {
      // Get current sections
      const currentSections = [...sections];
      
      // Perform the reordering
      const draggedItemContent = currentSections[draggedItem];
      currentSections.splice(draggedItem, 1);
      currentSections.splice(dragOverItem, 0, draggedItemContent);
      
      // Extract section IDs for the new order
      const newSectionOrder = currentSections.map(section => section.id);
      
      // Update section order in context
      updateSectionOrder(newSectionOrder);
      
      // Force a re-render by setting a state
      setExpandedSection(expandedSection);
      
    }
    
    // Reset state
    setDraggedItem(null);
    setDragOverItem(null);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  // Create a map of all available sections for quick lookup
  const sectionMap = {};
  
  // Add standard sections to the map
  sectionDefinitions.forEach(section => {
    sectionMap[section.id] = section;
  });
  
  // Custom section functionality will be rebuilt from scratch
  
  // Get ordered sections based on sectionOrder from context
  const sections = [];
  
  // If sectionOrder exists and has items, use it to order the sections
  if (resumeData.sectionOrder && resumeData.sectionOrder.length > 0) {
    // Add sections in the order specified by sectionOrder
    resumeData.sectionOrder.forEach(sectionId => {
      if (sectionMap[sectionId]) {
        sections.push(sectionMap[sectionId]);
      }
    });
    
    // Add any sections that might not be in the order (fallback)
    Object.values(sectionMap).forEach(section => {
      if (!sections.some(s => s.id === section.id)) {
        sections.push(section);
      }
    });
  } else {
    // If no order is specified, use default order
    sections.push(...sectionDefinitions);
    // Custom section functionality will be rebuilt from scratch
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {sections.map((section, index) => {
          return (
            <div 
              key={section.id}
              className="border rounded-md overflow-hidden mb-4"
              draggable={section.id !== 'personalInfo'}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={handleDragLeave}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 text-left font-medium cursor-move">
                <div className="flex items-center">
                  {section.id !== 'personalInfo' && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>}
                  <span>{section.label}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering drag when clicking the button
                    toggleSection(section.id);
                  }}
                  className="flex items-center"
                >
                  {expandedSection === section.id ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
              {expandedSection === section.id && (
                <div className="p-4 border-t">
                  {section.component}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeForm;
