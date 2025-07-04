import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { useTheme } from '../context/ThemeContext';
import ResumeForm from './form/ResumeForm';
import ResumePreview from './preview/ResumePreview';
import ThemeSwitcher from './theme/ThemeSwitcher';
import { generatePDF } from './utils/pdfGenerator';

const ResumeBuilder = () => {
  const { theme } = useTheme();

  const handleGeneratePDF = () => {
    generatePDF();
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme.background} ${theme.text}`}>
      {/* <header className="bg-white border-b py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <button 
            onClick={() => toggleDarkMode()}
            className="p-1 border border-gray-300 rounded"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header> */}

      <div className="container mx-auto px-4 py-4 flex items-center justify-between border-b mb-4">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left side - Edit Form */}
        <div className={`md:w-1/2 ${theme.sidebarBackground} border-r overflow-y-auto p-6 ${theme.border}`}>
          <div className="mb-6">
            <ResumeForm />
          </div>
          
          <div className={`flex justify-between sticky bottom-0 ${theme.sidebarBackground} pt-4 pb-2 border-t ${theme.border}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-sm font-medium">Theme:</div>
              <ThemeSwitcher />
            </div>
            <button
              onClick={handleGeneratePDF}
              className={`p-2 rounded theme-button ${theme.buttonPrimary}`}
            >
              Download PDF
            </button>
          </div>
        </div>
        
        {/* Right side - Preview */}
        <div className={`md:w-1/2 ${theme.formBackground} overflow-y-auto`}>
          <div className="max-w-4xl mx-auto">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
