import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const CustomSectionForm = ({ section }) => {
  const { updateSection, removeCustomSection } = useResume();
  const { key, title, items = [] } = section;
  
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  
  const emptyItem = {
    title: '',
    subtitle: '',
    date: '',
    description: ''
  };
  
  const [formData, setFormData] = useState(emptyItem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let updatedItems;
    
    if (editIndex !== null) {
      updatedItems = [...items];
      updatedItems[editIndex] = formData;
    } else {
      updatedItems = [...items, formData];
    }
    
    // Update the custom section in the context
    updateSection('customSections', prev => 
      prev.map(s => s.key === key ? { ...s, items: updatedItems } : s)
    );
    
    setFormData(emptyItem);
    setEditIndex(null);
    setIsAdding(false);
  };

  const handleEdit = (index) => {
    setFormData(items[index]);
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    
    // Update the custom section in the context
    updateSection('customSections', prev => 
      prev.map(s => s.key === key ? { ...s, items: updatedItems } : s)
    );
  };

  const handleDeleteSection = () => {
    if (window.confirm(`Are you sure you want to delete the "${title}" section?`)) {
      removeCustomSection(key);
    }
  };

  const handleCancel = () => {
    setFormData(emptyItem);
    setEditIndex(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">{title}</h3>
        <button
          type="button"
          onClick={handleDeleteSection}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          Delete Section
        </button>
      </div>
      
      {!isAdding ? (
        <div>
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      {item.subtitle && (
                        <p className="text-gray-600 dark:text-gray-300">{item.subtitle}</p>
                      )}
                      {item.date && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
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
                  {item.description && (
                    <p className="mt-2 text-sm whitespace-pre-line">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">No items added to this section yet.</p>
          )}
          
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="btn btn-secondary mt-4"
          >
            Add Item
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Item Title"
              required
            />
          </div>
          
          <div>
            <label htmlFor="subtitle" className="form-label">Subtitle (Optional)</label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="form-input"
              placeholder="Item Subtitle"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="form-label">Date (Optional)</label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
              placeholder="2022"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="form-label">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input h-32"
              placeholder="Additional details..."
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button type="submit" className="btn btn-primary">
              {editIndex !== null ? 'Update' : 'Add'} Item
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

export default CustomSectionForm;
