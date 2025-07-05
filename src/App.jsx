import { useState } from 'react';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import { TemplateProvider } from './context/TemplateContext';
import './App.css';
import ResumeBuilder from './components/ResumeBuilder';

function App() {
  return (
    <ResumeProvider>
      <ThemeProvider>
        <TemplateProvider>
          <div className="min-h-screen transition-colors duration-200">
            <ResumeBuilder />
          </div>
        </TemplateProvider>
      </ThemeProvider>
    </ResumeProvider>
  );
}

export default App;
