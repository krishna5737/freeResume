import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const SkillsForm = () => {
  const { resumeData, updateSection } = useResume();
  const [skills, setSkills] = useState(resumeData.skills || []);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    
    if (newSkill.trim()) {
      const skill = {
        id: Date.now().toString(),
        name: newSkill.trim()
      };
      
      const updatedSkills = [...skills, skill];
      setSkills(updatedSkills);
      setNewSkill('');
      
      // Save to context
      updateSection('skills', updatedSkills);
    }
  };

  const handleRemoveSkill = (skillId) => {
    const updatedSkills = skills.filter(skill => skill.id !== skillId);
    setSkills(updatedSkills);
    
    // Save to context
    updateSection('skills', updatedSkills);
  };

  return (
    <div className="space-y-6">
      <div>
    
        <form onSubmit={handleAddSkill} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="form-input flex-1"
              placeholder="Add a skill (e.g., JavaScript, React, Node.js)"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 btn-primary border rounded hover:btn-primary-200"
            >
              Add
            </button>
          </div>
          

        </form>
      </div>
      
      <div>
        
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <div 
                key={typeof skill === 'object' ? skill.id : skill} 
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 font-semibold flex items-center"
              >
                <span>{typeof skill === 'object' ? skill.name : skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(typeof skill === 'object' ? skill.id : skill)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;
