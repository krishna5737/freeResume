import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { useTheme } from '../context/ThemeContext';
import { useTemplate } from '../context/TemplateContext';
import ResumeForm from './form/ResumeForm';
import TemplateRenderer from './template/TemplateRenderer';
import ThemeSwitcher from './theme/ThemeSwitcher';
import TemplateSwitcher from './template/TemplateSwitcher';
import { generatePDF } from './utils/pdfGenerator';

const ResumeBuilder = () => {
  const { theme } = useTheme();

  const handleGeneratePDF = () => {
    generatePDF();
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme.background} ${theme.text}`}>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left side - Edit Form */}
        <div className={`md:w-1/2 ${theme.sidebarBackground} border-r overflow-y-auto p-6 ${theme.border}`}>
          <div className="mb-6">
            <ResumeForm />
          </div>
          
          <div className={`sticky bottom-0 ${theme.sidebarBackground} pt-4 pb-2 border-t ${theme.border}`}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">Theme:</div>
                <ThemeSwitcher />
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">Template:</div>
                <TemplateSwitcher />
              </div>
            </div>
            <button
              onClick={handleGeneratePDF}
              className={`w-full p-2 rounded theme-button ${theme.buttonPrimary}`}
            >
              Download PDF
            </button>
          </div>
        </div>
        
        {/* Right side - Preview */}
        <div className={`md:w-1/2 ${theme.formBackground} overflow-y-auto`}>
          <div className="max-w-4xl mx-auto md:p-4 p-0">
            <TemplateRenderer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
