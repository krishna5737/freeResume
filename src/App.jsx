import { useState } from 'react';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import ResumeBuilder from './components/ResumeBuilder';

function App() {
  return (
    <ResumeProvider>
      <ThemeProvider>
        <div className="min-h-screen transition-colors duration-200">
          <ResumeBuilder />
        </div>
      </ThemeProvider>
    </ResumeProvider>
  );
}

export default App;
