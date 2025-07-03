import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const CertificationsForm = () => {
  const { resumeData, addItem, updateItem, removeItem } = useResume();
  const { certifications } = resumeData;
  
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  
  const emptyCertification = {
    name: '',
    issuer: '',
    date: '',
    expiry: '',
    credentialID: '',
    credentialURL: '',
    description: ''
  };
  
  const [formData, setFormData] = useState(emptyCertification);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedData);
    
    // If we're editing an existing item, update it in real-time
    if (editIndex !== null) {
      updateItem('certifications', editIndex, updatedData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editIndex !== null) {
      updateItem('certifications', editIndex, formData);
      setEditIndex(null);
    } else {
      addItem('certifications', formData);
    }
    
    setFormData(emptyCertification);
    setIsAdding(false);
  };

  const handleEdit = (index) => {
    setFormData(certifications[index]);
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index) => {
    removeItem('certifications', index);
  };

  const handleCancel = () => {
    setFormData(emptyCertification);
    setEditIndex(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {!isAdding ? (
        <div>
          {certifications.length > 0 ? (
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {cert.name}
                        {cert.credentialURL && (
                          <a 
                            href={cert.credentialURL} 
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
                      <p className="text-gray-600 dark:text-gray-300">{cert.issuer}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Issued: {cert.date}
                        {cert.expiry && ` • Expires: ${cert.expiry}`}
                      </p>
                      {cert.credentialID && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Credential ID: {cert.credentialID}
                        </p>
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
                  {cert.description && (
                    <p className="mt-2 text-sm whitespace-pre-line">{cert.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">No certifications added yet.</p>
          )}
          
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="btn btn-secondary mt-4"
          >
            Add Certification
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="form-label">Certification Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="AWS Certified Solutions Architect"
              required
            />
          </div>
          
          <div>
            <label htmlFor="issuer" className="form-label">Issuing Organization</label>
            <input
              type="text"
              id="issuer"
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              className="form-input"
              placeholder="Amazon Web Services"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="form-label">Issue Date</label>
              <input
                type="text"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
                placeholder="Jun 2022"
                required
              />
            </div>
            
            <div>
              <label htmlFor="expiry" className="form-label">Expiry Date (Optional)</label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                className="form-input"
                placeholder="Jun 2025"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="credentialID" className="form-label">Credential ID (Optional)</label>
              <input
                type="text"
                id="credentialID"
                name="credentialID"
                value={formData.credentialID}
                onChange={handleChange}
                className="form-input"
                placeholder="ABC123XYZ"
              />
            </div>
            
            <div>
              <label htmlFor="credentialURL" className="form-label">Credential URL (Optional)</label>
              <input
                type="url"
                id="credentialURL"
                name="credentialURL"
                value={formData.credentialURL}
                onChange={handleChange}
                className="form-input"
                placeholder="https://www.credential.net/abc123xyz"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="form-label">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input h-32"
              placeholder="Additional details about the certification..."
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button type="submit" className="btn btn-primary">
              {editIndex !== null ? 'Update' : 'Add'} Certification
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

export default CertificationsForm;
