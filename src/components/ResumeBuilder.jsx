import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import ResumeForm from './form/ResumeForm';
import ResumePreview from './preview/ResumePreview';
import { generatePDF } from './utils/pdfGenerator';

const ResumeBuilder = () => {
  const { darkMode, toggleDarkMode } = useResume();

  const handleGeneratePDF = () => {
    generatePDF();
  };

  return (
    <div className="min-h-screen flex flex-col">
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

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left side - Edit Form */}
        <div className="md:w-1/2 bg-white border-r overflow-y-auto p-6">
          <div className="mb-6">
            <ResumeForm />
          </div>
          
          <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t">
            <button
              onClick={handleGeneratePDF}
              className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Download PDF
            </button>
          </div>
        </div>
        
        {/* Right side - Preview */}
        <div className="md:w-1/2 bg-gray-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
