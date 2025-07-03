import { useState } from 'react';
import { ResumeProvider } from './context/ResumeContext';
import './App.css';
import ResumeBuilder from './components/ResumeBuilder';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <ResumeBuilder />
      </div>
    </ResumeProvider>
  );
}

export default App;
