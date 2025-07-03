import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const AchievementsForm = () => {
  const { resumeData, addItem, updateItem, removeItem, updateSection } = useResume();
  // Ensure achievements array exists, initialize if not
  const achievements = resumeData.achievements || [];
  
  // Initialize achievements array if it doesn't exist
  if (!resumeData.achievements) {
    updateSection('achievements', []);
  }
  
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  
  const emptyAchievement = {
    name: '',
    url: '',
    year: ''
  };
  
  const [formData, setFormData] = useState(emptyAchievement);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedData);
    
    // If we're editing an existing item, update it in real-time
    if (editIndex !== null) {
      updateItem('achievements', editIndex, updatedData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editIndex !== null) {
      updateItem('achievements', editIndex, formData);
      setEditIndex(null);
    } else {
      addItem('achievements', formData);
    }
    
    setFormData(emptyAchievement);
    setIsAdding(false);
  };

  const handleEdit = (index) => {
    setFormData(achievements[index]);
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index) => {
    removeItem('achievements', index);
  };

  const handleCancel = () => {
    setFormData(emptyAchievement);
    setEditIndex(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {!isAdding ? (
        <div>
          {achievements && achievements.length > 0 ? (
            <div className="space-y-4 text-left">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{achievement.name}</h3>
                      {achievement.url && (
                        <a 
                          href={achievement.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                          View Achievement
                        </a>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(index)}
                        className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(index)}
                        className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">No achievements added yet.</p>
          )}
          
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="btn btn-secondary mt-4"
          >
            Add Achievement
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="form-label">Achievement Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Research Paper: Imitation of Human Motion on NAO using Inverse Kinematics"
              required
            />
          </div>
          
          <div>
            <label htmlFor="year" className="form-label">Year</label>
            <input
              type="text"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="form-input"
              placeholder="2017"
              required
            />
          </div>
          
          <div>
            <label htmlFor="url" className="form-label">URL (Optional)</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="form-input"
              placeholder="https://www.credential.net/your-achievement"
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="btn btn-primary"
            >
              {editIndex !== null ? 'Update' : 'Add'} Achievement
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AchievementsForm;
