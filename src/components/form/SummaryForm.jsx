import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import RichTextEditor from '../common/RichTextEditor';

const SummaryForm = () => {
  const { resumeData, updateSection } = useResume();
  const { summary } = resumeData;
  
  const [formData, setFormData] = useState(summary);

  const handleChange = (value) => {
    setFormData(value);
    updateSection('summary', value);
  };

  return (
    <div className="space-y-4">
      <div>
        <RichTextEditor
          value={formData}
          onChange={handleChange}
          placeholder="Write a brief summary of your professional background, skills, and career goals..."
        />
      </div>
    </div>
  );
};

export default SummaryForm;
