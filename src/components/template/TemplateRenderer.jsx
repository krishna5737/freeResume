import React from 'react';
import { useTemplate } from '../../context/TemplateContext';
import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import CompactTemplate from './CompactTemplate';

const TemplateRenderer = () => {
  const { currentTemplate } = useTemplate();
  
  // Render the appropriate template based on the current selection
  switch (currentTemplate) {
    case 'modern':
      return <ModernTemplate />;
    case 'compact':
      return <CompactTemplate />;
    case 'classic':
    default:
      return <ClassicTemplate />;
  }
};

export default TemplateRenderer;
