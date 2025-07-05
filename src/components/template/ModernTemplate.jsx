import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { useTheme } from '../../context/ThemeContext';
import { parseMarkdown } from '../../utils/markdownParser';

const ModernTemplate = () => {
  const { resumeData } = useResume();
  const { theme } = useTheme();
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements, sectionOrder = [] } = resumeData;

  // Header component with modern styling
  const Header = () => (
    <header className="text-center mb-6">
      <div className="flex justify-center items-end mb-2">
        <h1 className="text-4xl font-bold">
          <span style={{ color: `var(--color-accent-text)` }}>{personalInfo.name?.split(' ')[0] || 'Your'}</span>
          <span className="ml-2 font-bold" style={{ color: '#333' }}>{personalInfo.name?.split(' ').slice(1).join(' ') || 'Name'}</span>
        </h1>
      </div>
      <p className="uppercase tracking-wider text-sm font-medium" style={{ color: `var(--color-accent-text)` }}>
        {personalInfo.title || 'Professional Title'}
      </p>
      
      <div className="flex justify-center gap-4 mt-3 text-sm text-gray-600 flex-wrap">
        {personalInfo.email && (
          <a href={`mailto:${personalInfo.email}`} className="hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            {personalInfo.email}
          </a>
        )}
        
        {personalInfo.phone && (
          <a href={`tel:${personalInfo.phone}`} className="hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            {personalInfo.phone}
          </a>
        )}
        
        {personalInfo.location && (
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {personalInfo.location}
          </span>
        )}
        
        {personalInfo.website && (
          <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" x2="22" y1="12" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            {personalInfo.website}
          </a>
        )}
        {personalInfo.linkedinUsername && (
            <div key={"linkedIn"} className="flex items-center gap-1">
            <span>
              <a href={`https://www.linkedin.com/${personalInfo.linkedinUsername}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  {personalInfo.linkedinUsername}
              </a>
            </span>
          </div>
          )}
          {personalInfo.githubUsername && (
            <div key={"Github"} className="flex items-center gap-1">
            <span>
              <a href={`https://www.github.com/${personalInfo.githubUsername}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                {personalInfo.githubUsername}
              </a>
            </span>
          </div>
          )}
      </div>
      
      {personalInfo.objective && (
        <div className="mt-4 text-sm italic text-center max-w-2xl mx-auto">
          "{personalInfo.objective}"
        </div>
      )}
    </header>
  );

  // Modern section heading with colored first three letters
  const SectionHeading = ({ title }) => {
    const firstThreeLetters = title.substring(0, 3);
    const restOfTitle = title.slice(3);
    
    return (
      <h2 className="text-lg font-bold mb-3 pb-1 border-b border-gray-200">
        <span style={{ color: `var(--color-accent-text)` }}>{firstThreeLetters}</span>
        {restOfTitle}
      </h2>
    );
  };

  // Function to render a section based on its ID
  const renderSection = (sectionId) => {
    switch(sectionId) {
      case 'summary':
        return summary && (
          <div className="mb-5" key="summary-section">
            <SectionHeading title="Summary" />
            <p 
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(summary) }}
            />
          </div>
        );
        
      case 'experience':
        return experience && experience.length > 0 && (
          <div className="mb-5" key="experience-section">
            <SectionHeading title="Work Experience" />
            <div className="space-y-4">
              {experience.map((job, index) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{job.position}</div>
                      <div style={{ color: `var(--color-accent-text)` }} className="font-medium">{job.company}</div>
                    </div>
                    <div className="text-gray-500 text-xs">
                      {job.startDate} - {job.current ? 'Present' : job.endDate}
                    </div>
                  </div>
                  {job.location && <div className="text-xs text-gray-500 mb-1">{job.location}</div>}
                  {job.description && (
                    <div 
                      className="text-sm rich-text-content mt-1"
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(job.description) }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'education':
        return education && education.length > 0 && (
          <div className="mb-5" key="education-section">
            <SectionHeading title="Education" />
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{edu.degree}</div>
                    <div className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</div>
                  </div>
                  <div style={{ color: `var(--color-accent-text)` }} className="font-medium">{edu.institution}</div>
                  {edu.location && <div className="text-xs text-gray-500 mb-1">{edu.location}</div>}
                  {edu.gpa && <div className="text-xs">CGPA: {edu.gpa}</div>}
                  {edu.description && (
                    <div 
                      className="text-sm rich-text-content mt-1"
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(edu.description) }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'skills':
        return skills && skills.length > 0 && (
          <div className="mb-5" key="skills-section">
            <SectionHeading title="Skills" />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-1 rounded skill-badge"
                  style={{ 
                    backgroundColor: `var(--color-skill-bg)`,
                    color: `var(--color-skill-text)`
                  }}
                >
                  {typeof skill === 'object' ? skill.name : skill}
                </span>
              ))}
            </div>
          </div>
        );
        
      case 'projects':
        return projects && projects.length > 0 && (
          <div className="mb-5" key="projects-section">
            <SectionHeading title="Projects" />
            <div className="space-y-1">

              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{project.title}</div>
                    <div className="text-gray-500 text-xs">{project.startDate} - {project.endDate || "Current"}</div>
                  </div>
                  {project.description && (
                    <div 
                      className="text-sm rich-text-content mt-1"
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(project.description) }}
                    />
                  )}
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: `var(--color-accent-text)` }}
                      className="text-xs hover:underline inline-flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      Link
                    </a>
                  )}
                  {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      <span className="text-xs">Skills Required: </span>
                      {project.technologies.split(',').map((tech, techIndex) => (
                        <span key={techIndex} className="text-xs">
                          {tech.trim()}{techIndex < project.technologies.split(',').length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'certifications':
        return certifications && certifications.length > 0 && (
          <div className="mb-5" key="certifications-section">
            <SectionHeading title="Certifications" />
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{cert.name}</div>
                    {cert.date && <div className="text-gray-500 text-xs">{cert.date}</div>}
                  </div>
                  <div className="text-sm">{cert.issuer}</div>
                  {cert.description && (
                    <div 
                      className="text-sm rich-text-content mt-1"
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(cert.description) }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'achievements':
        return achievements && Array.isArray(achievements) && achievements.length > 0 && (
          <div className="mb-5" key="achievements-section">
            <SectionHeading title="Achievements" />
            <div className="space-y-1">
              <table className="w-full text-sm">
                <tbody>
                  {achievements.map((achievement, index) => (
                    <tr key={index}>
                      <td className="py-1 pr-4 text-center whitespace-nowrap" style={{ width: '60px' }}>
                        {achievement.year || achievement.date || ''}
                      </td>
                      <td className="py-1">
                        <div className="font-medium">{achievement.name || achievement.title}
                          {achievement.url && (
                            <a 
                              href={achievement.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: `var(--color-accent-text)` }}
                              className="hover:underline text-xs inline-flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                              </svg>
                              Link
                            </a>
                          )}
                        </div>
                        {achievement.description && (
                          <div 
                            className="text-sm rich-text-content"
                            dangerouslySetInnerHTML={{ __html: parseMarkdown(achievement.description) }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div 
      id="resume-preview" 
      className="bg-white shadow-lg border theme-border rounded-lg p-6 max-w-4xl mx-auto my-4"
    >
      <div className="px-8 py-6 print:p-0">
        <Header />
        
        {/* Render sections based on sectionOrder */}
        <div className="resume-sections">
          {sectionOrder && sectionOrder.length > 0 ? (
            // If we have a section order, use it
            sectionOrder.map((sectionId, index) => (
              <div key={`section-${sectionId}-${index}`} className="resume-section">
                {renderSection(sectionId)}
              </div>
            ))
          ) : (
            // Otherwise, render sections in default order
            <>
              {renderSection('summary')}
              {renderSection('experience')}
              {renderSection('education')}
              {renderSection('skills')}
              {renderSection('projects')}
              {renderSection('certifications')}
              {renderSection('achievements')}
            </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
