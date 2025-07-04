import { useResume } from '../../context/ResumeContext';
import { useTheme } from '../../context/ThemeContext';
import { parseMarkdown } from '../../utils/markdownParser';
import ThemedSectionHeading from '../theme/ThemedSectionHeading';

const ResumePreview = () => {
  const { resumeData } = useResume();
  const { theme } = useTheme();
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements, pageBreaks, sectionOrder = [] } = resumeData;

  // Function to render a section based on its ID
  const renderSection = (sectionId) => {
    
    switch(sectionId) {
      case 'summary':
        return summary && (
          <div className="mb-4 text-left" key="summary-section">
            <ThemedSectionHeading title="Summary" />
            <p 
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(summary) }}
            />
          </div>
        );
      case 'experience':
        return experience && experience.length > 0 && (
          <div className="mb-4 text-left" key="experience-section">
            <ThemedSectionHeading title="Experience" />
            <div className="space-y-2">
              {experience.map((job, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <div className="font-semibold">{job.position}</div>
                      <span>&nbsp;at&nbsp;</span>
                      <div style={{ color: `var(--color-accent-text)` }} className="font-medium">{job.company}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {job.startDate} - {job.current ? 'Present' : job.endDate}
                    </div>
                  </div>
                  {job.description && (
                    <div 
                      className="text-sm rich-text-content"
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
          <div className="mb-4 text-left" key="education-section">
            <ThemedSectionHeading title="Education" />
            <div className="space-y-2">
              {education.map((edu, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="font-semibold">{edu.degree}</div>
                    <div className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</div>
                  </div>
                  <div style={{ color: `var(--color-accent-text)` }} className="font-medium">{edu.institution}</div>
                  {edu.description && (
                    <p className="text-sm">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        return skills && skills.length > 0 && (
          <div className="mb-4 text-left" key="skills-section">
            <ThemedSectionHeading title="Skills" />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className={`${theme.skillBadge} text-xs px-2 py-1 rounded skill-badge`}>
                  {typeof skill === 'object' ? skill.name : skill}
                </span>
              ))}
            </div>
          </div>
        );
      case 'projects':
        return projects && projects.length > 0 && (
          <div className="mb-4 text-left" key="projects-section">
            <ThemedSectionHeading title="Projects" />
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="font-semibold">{project.name}</div>
                    {project.date && <div className="text-sm text-gray-500">{project.date}</div>}
                  </div>
                  {project.description && (
                    <div 
                      className="text-sm rich-text-content"
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
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'certifications':
        return certifications && certifications.length > 0 && (
          <div className="mb-4 text-left" key="certifications-section">
            <ThemedSectionHeading title="Certifications" />
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="space-y-1">
                  <div className="font-semibold">{cert.name}</div>
                  <div className="text-sm">{cert.issuer}</div>
                  {cert.date && <div className="text-xs text-gray-500">{cert.date}</div>}
                  {cert.credentialURL && (
                    <a href={cert.credentialURL} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-700">
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'achievements':
        return achievements && achievements.length > 0 && (
          <div className="mb-4 text-left" key="achievements-section">
            <ThemedSectionHeading title="Achievements" />
            <div className="space-y-1">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center">
                  <div className="text-right text-xs text-gray-600 mr-2">
                    {achievement.year}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">
                      {achievement.name}
                      {achievement.url && (
                        <a 
                          href={achievement.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: `var(--color-accent-text)` }} 
                          className="ml-2 hover:underline text-xs inline-flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                          View
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'pageBreak':
        return pageBreaks && pageBreaks.map((pageBreak, index) => (
          <div 
            key={pageBreak.id || `page-break-${index}`} 
            className="w-full my-4 border-b border-dashed border-gray-400 print:break-after-page" 
            style={{ 
              pageBreakAfter: 'always',
              breakAfter: 'page',
              height: '1px',
              margin: '2rem 0'
            }}
            data-page-break="true"
          >
            <div className="text-xs text-center text-gray-500 py-1 print:hidden">
              Page Break
            </div>
          </div>
        ));
      default:
        // Custom section functionality will be rebuilt from scratch
        return null;
    }
  };

  const Header = () => (
    <header className="text-center">
      <div className="mb-4">
        <h1 className="text-4xl font-bold uppercase" style={{ color: '#1A365D' }}>
          {personalInfo.name ? personalInfo.name.split(' ').map((part, i) => (
            <span key={i} style={{ color: '#1A365D' }}>{i > 0 && ' '}{part}</span>
          )) : 'YOUR NAME'}
        </h1>
        <p className="text-gray-600 mt-1 text-lg">{personalInfo.title || 'Professional Title'}</p>
        <div className="flex justify-center gap-4 mt-1 text-base text-gray-600 flex-wrap mb-2">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-purple-600 transition-colors cursor-pointer select-all">
                  {personalInfo.email}
                </a>
              </div>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <a href={`tel:${personalInfo.phone}`} className="hover:text-purple-600 transition-colors cursor-pointer select-all">
                {personalInfo.phone}
              </a>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="select-all">{personalInfo.location}</span>
            </div>
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
                LinkedIn
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
                Github
              </a>
            </span>
          </div>
          )}
        </div>
      </div>
    </header>
  );
  
  // Section heading component with styling matching the HTML example
  const SectionHeading = ({ title }) => {
    const { theme } = useTheme();
    return (
      <h2 
        className={`text-base font-bold my-2 uppercase font-sans px-2 py-1 rounded ${theme.sectionHeading}`}
      >
        {title}
      </h2>
    );
  };

  return (
    <div 
      id="resume-preview" 
      className="bg-white shadow-lg border theme-border rounded-lg p-8 max-w-4xl mx-auto my-8"
    >
      <div className="px-10 py-7 print:p-0">
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
            // Otherwise fall back to default order
            <>
              <div className="resume-section">{renderSection('summary')}</div>
              <div className="resume-section">{renderSection('experience')}</div>
              <div className="resume-section">{renderSection('education')}</div>
              <div className="resume-section">{renderSection('skills')}</div>
              <div className="resume-section">{renderSection('projects')}</div>
              <div className="resume-section">{renderSection('certifications')}</div>
              <div className="resume-section">{renderSection('achievements')}</div>
              {/* Custom section functionality will be rebuilt from scratch */}
            </>
          )}
        </div>
        

      </div>
    </div>
  );
};


export default ResumePreview;
