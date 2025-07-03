import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import RichTextEditor from '../common/RichTextEditor';

const ProjectsForm = () => {
  const { resumeData, addItem, updateItem, removeItem } = useResume();
  const { projects } = resumeData;
  
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  
  const emptyProject = {
    title: '',
    link: '',
    technologies: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  };
  
  const [formData, setFormData] = useState(emptyProject);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    setFormData(updatedData);
    
    // If we're editing an existing item, update it in real-time
    if (editIndex !== null) {
      updateItem('projects', editIndex, updatedData);
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
      updateItem('projects', editIndex, updatedData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editIndex !== null) {
      updateItem('projects', editIndex, formData);
      setEditIndex(null);
    } else {
      addItem('projects', formData);
    }
    
    setFormData(emptyProject);
    setIsAdding(false);
  };

  const handleEdit = (index) => {
    setFormData(projects[index]);
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index) => {
    removeItem('projects', index);
  };

  const handleCancel = () => {
    setFormData(emptyProject);
    setEditIndex(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {!isAdding ? (
        <div>
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {project.title}
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                          </a>
                        )}
                      </h3>
                      {project.technologies && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{project.technologies}</p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {project.startDate} - {project.current ? 'Present' : project.endDate}
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
                  {project.description && (
                    <p className="mt-2 text-sm whitespace-pre-line">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">No projects added yet.</p>
          )}
          
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="btn btn-secondary mt-4"
          >
            Add Project
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="form-label">Project Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Personal Portfolio Website"
              required
            />
          </div>
          
          <div>
            <label htmlFor="link" className="form-label">Project Link (Optional)</label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="form-input"
              placeholder="https://github.com/yourusername/project"
            />
          </div>
          
          <div>
            <label htmlFor="technologies" className="form-label">Technologies Used</label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              className="form-input"
              placeholder="React, Node.js, MongoDB"
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
                placeholder="Jan 2022"
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
                  placeholder="Mar 2022"
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
                  <label htmlFor="current" className="text-sm">Ongoing</label>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="form-label">Project Description</label>
            <RichTextEditor
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Describe the project, your role, and key achievements..."
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button type="submit" className="btn btn-primary">
              {editIndex !== null ? 'Update' : 'Add'} Project
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

export default ProjectsForm;
