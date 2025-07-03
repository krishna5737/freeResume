import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import RichTextEditor from '../common/RichTextEditor';

const EducationForm = () => {
  const { resumeData, addItem, updateItem, removeItem } = useResume();
  const { education } = resumeData;
  
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  
  const emptyEducation = {
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    description: ''
  };
  
  const [formData, setFormData] = useState(emptyEducation);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    setFormData(updatedData);
    
    // If we're editing an existing item, update it in real-time
    if (editIndex !== null) {
      updateItem('education', editIndex, updatedData);
    }
  };
  
  const handleDescriptionChange = (value) => {
    const updatedData = {
      ...formData,
      description: value
    };
    setFormData(updatedData);
    
    // If we're editing an existing item, update it in real-time
    if (editIndex !== null) {
      updateItem('education', editIndex, updatedData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editIndex !== null) {
      updateItem('education', editIndex, formData);
      setEditIndex(null);
    } else {
      addItem('education', formData);
    }
    
    setFormData(emptyEducation);
    setIsAdding(false);
  };

  const handleEdit = (index) => {
    setFormData(education[index]);
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index) => {
    removeItem('education', index);
  };

  const handleCancel = () => {
    setFormData(emptyEducation);
    setEditIndex(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {!isAdding ? (
        <div>
          {education.length > 0 ? (
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                      </p>
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
                  {edu.description && (
                    <p className="mt-2 text-sm whitespace-pre-line">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">No education added yet.</p>
          )}
          
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="btn btn-secondary mt-4"
          >
            Add Education
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="institution" className="form-label">Institution</label>
            <input
              type="text"
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="form-input"
              placeholder="University of California, Berkeley"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="degree" className="form-label">Degree</label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="form-input"
                placeholder="Bachelor of Science"
                required
              />
            </div>
            
            <div>
              <label htmlFor="field" className="form-label">Field of Study</label>
              <input
                type="text"
                id="field"
                name="field"
                value={formData.field}
                onChange={handleChange}
                className="form-input"
                placeholder="Computer Science"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              placeholder="Berkeley, CA"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input
                type="text"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
                placeholder="Aug 2016"
                required
              />
            </div>
            
            <div>
              <label htmlFor="endDate" className="form-label">End Date</label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="May 2020"
                  disabled={formData.current}
                  required={!formData.current}
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="current"
                    name="current"
                    checked={formData.current}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="current" className="text-sm">Current</label>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="gpa" className="form-label">GPA (Optional)</label>
            <input
              type="text"
              id="gpa"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              className="form-input"
              placeholder="3.8/4.0"
            />
          </div>
          
          <div>
            <label className="form-label">Additional Information (Optional)</label>
            <RichTextEditor
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Relevant coursework, honors, activities, etc."
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button type="submit" className="btn btn-primary">
              {editIndex !== null ? 'Update' : 'Add'} Education
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EducationForm;
