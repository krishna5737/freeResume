import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const PersonalInfoForm = () => {
  const { resumeData, updateSection } = useResume();
  const { personalInfo } = resumeData;
  
  // Initialize with default values or existing values
  const [formData, setFormData] = useState({
    firstName: personalInfo.firstName || '',
    lastName: personalInfo.lastName || '',
    email: personalInfo.email || '',
    location: personalInfo.location || '',
    phone: personalInfo.phone || '',
    linkedinUsername: personalInfo.linkedinUsername || '',
    githubUsername: personalInfo.githubUsername || '',
    title: personalInfo.title || '',
    ...personalInfo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    
    // If first or last name changes, update the full name
    if (name === 'firstName' || name === 'lastName') {
      updatedData.name = `${name === 'firstName' ? value : formData.firstName} ${name === 'lastName' ? value : formData.lastName}`.trim();
    }
    
    setFormData(updatedData);
    updateSection('personalInfo', updatedData);
  };

  const handleLinkChange = (label, url) => {
    // Find if link with this label exists
    const links = [...(formData.links || [])];
    const existingIndex = links.findIndex(link => link.label === label);
    
    if (existingIndex >= 0) {
      links[existingIndex].url = url;
    } else {
      links.push({ label, url });
    }
    
    const updatedData = {
      ...formData,
      links
    };
    
    setFormData(updatedData);
    updateSection('personalInfo', updatedData);
  };

  return (
    <div className="space-y-4">
      {/* <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Personal Information</h3>
          <button type="button" className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div> */}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Krishan"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Kumar"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="krishna.5737@gmail.com"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Hyderabad, India"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="+91-9999999999"
          />
        </div>
        
        <div>
          <label htmlFor="linkedinUsername" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Username</label>
          <input
            type="text"
            id="linkedinUsername"
            name="linkedinUsername"
            value={formData.linkedinUsername || ''}
            onChange={(e) => {
              handleChange(e);
              handleLinkChange('LinkedIn', e.target.value);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="krishankumar12"
          />
        </div>
        
        <div>
          <label htmlFor="githubUsername" className="block text-sm font-medium text-gray-700 mb-1">GitHub Username</label>
          <input
            type="text"
            id="githubUsername"
            name="githubUsername"
            value={formData.githubUsername || ''}
            onChange={(e) => {
              handleChange(e);
              handleLinkChange('GitHub', e.target.value);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="krishna5737"
          />
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Senior Full Stack Developer | Senior Front End Engineer"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
