import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { useTheme } from '../../context/ThemeContext';
import { parseMarkdown } from '../../utils/markdownParser';

const CompactTemplate = () => {
  const { resumeData } = useResume();
  const { theme } = useTheme();
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements } = resumeData;

  // Helper function to render bullet points with markdown support
  const renderBulletPoints = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    return (
      <div className="text-sm">
        {lines.map((line, index) => (
          <p key={index} className="mb-1" dangerouslySetInnerHTML={{ __html: parseMarkdown(line) }}></p>
        ))}
      </div>
    );
  };

  // Helper function to render experience items
  const renderExperienceItem = (exp) => {
    if (!exp) return null;
    
    return (
      <div className="mb-4">
        <div className="flex justify-between items-baseline">
          <div>
            <span className="font-bold">{exp?.company || 'Company'}</span>
            <span className="italic"> | {exp?.position || 'Position'}</span>
          </div>
        </div>
        <div className="text-sm italic">
          {exp?.startDate || ''} – {exp?.current ? 'Present' : exp?.endDate || ''} | {exp?.location || ''}
        </div>
        {exp?.description && renderBulletPoints(exp.description)}
      </div>
    );
  };

  // Helper function to render project items
  const renderProjectItem = (project) => {
    if (!project) return null;
    
    return (
      <div className="mb-4">
        <div className="flex justify-between items-baseline">
          <div>
            <span className="font-bold">{project?.title || project?.name || 'Project'}</span>
            <span className="italic"> | {project?.role || ''}</span>
          </div>
        </div>
        <div className="text-sm italic" dangerouslySetInnerHTML={{ __html: parseMarkdown(`${project?.startDate || project?.date || ''} ${(project?.startDate || project?.date) && project?.endDate ? '– ' + project.endDate : ''} | ${project?.location || ''}`) }}></div>
        {project?.description && renderBulletPoints(project.description)}
        {project?.link && (
          <div className="text-sm">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${theme.accent} hover:underline`}
            >
              {project.link.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          </div>
        )}
      </div>
    );
  };

  // Helper function to render education items
  const renderEducationItem = (edu) => {
    if (!edu) return null;
    
    return (
      <div className="mb-4">
        <div className="font-bold">{edu?.institution || 'Institution'}</div>
        <div className="italic" dangerouslySetInnerHTML={{ __html: parseMarkdown(edu?.degree || 'Degree') }}></div>
        <div className="text-sm" dangerouslySetInnerHTML={{ __html: parseMarkdown(`${edu?.startDate || ''} – ${edu?.endDate || ''} | ${edu?.location || ''}`) }}></div>
        {edu?.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
        {edu?.description && <div className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: parseMarkdown(edu.description) }}></div>}
      </div>
    );
  };

  // Helper function to render skills section
  const renderSkillsSection = () => {
    if (!skills || !skills.length) return null;
    
    // Group skills by category if possible
    const categories = {
      "Programming": [],
      "Technology": [],
      "Other": []
    };
    
    // Simple categorization based on common programming languages and technologies
    const programmingKeywords = ['python', 'java', 'javascript', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'go'];
    const techKeywords = ['aws', 'azure', 'git', 'docker', 'kubernetes', 'linux', 'windows', 'unix', 'ai', 'ml'];
    
    skills.forEach(skill => {
      const lowerSkill = skill.toLowerCase();
      if (programmingKeywords.some(keyword => lowerSkill.includes(keyword))) {
        categories["Programming"].push(skill);
      } else if (techKeywords.some(keyword => lowerSkill.includes(keyword))) {
        categories["Technology"].push(skill);
      } else {
        categories["Other"].push(skill);
      }
    });
    
    return (
      <>
        {Object.keys(categories).map(category => 
          categories[category].length > 0 && (
            <div key={category} className="mb-3">
              <div className="font-bold">{category}</div>
              <div className="text-sm" dangerouslySetInnerHTML={{ __html: parseMarkdown(categories[category].join(' • ')) }}></div>
            </div>
          )
        )}
      </>
    );
  };

  return (
    <div className="bg-white my-6 mx-auto w-full max-w-5xl print:shadow-none p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{personalInfo?.name || `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`}</h1>
        {personalInfo?.title && (
          <p className="text-lg text-gray-600 mb-2" dangerouslySetInnerHTML={{ __html: parseMarkdown(personalInfo.title) }}></p>
        )}
        <p className="text-sm">
          {personalInfo?.email && (
            <><a href={`mailto:${personalInfo.email}`} className={`${theme.accent} hover:underline`}>{personalInfo.email}</a> | </>
          )}
          {personalInfo?.phone && (
            <><a href={`tel:${personalInfo.phone}`} className={`${theme.accent} hover:underline`}>{personalInfo.phone}</a>
          </>)}
          {personalInfo?.location && (
            <> | {personalInfo.location}</>
          )}
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left Column - 60% */}
        <div className="md:w-2/3 md:pr-6">
          {/* Experience Section */}
          {experience && experience.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold uppercase border-b ${theme.border} mb-3`}>Experience</h2>
              {experience.map((exp, index) => (
                <div key={index}>
                  {renderExperienceItem(exp)}
                </div>
              ))}
            </section>
          )}

          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold uppercase border-b ${theme.border} mb-3`}>Projects</h2>
              {projects.map((project, index) => (
                <div key={index}>
                  {renderProjectItem(project)}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column - 40% */}
        <div className="md:w-1/3">
          {/* Education Section */}
          {education && education.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold uppercase border-b ${theme.border} mb-3`}>Education</h2>
              {education.map((edu, index) => (
                <div key={index}>
                  {renderEducationItem(edu)}
                </div>
              ))}
            </section>
          )}

          {/* Summary Section */}
          {summary && (
            <section className="mb-6">
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: parseMarkdown(summary) }}></p>
            </section>
          )}

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold uppercase border-b ${theme.border} mb-3`}>Skills</h2>
              {renderSkillsSection()}
            </section>
          )}

          {/* Links Section */}
          {(personalInfo?.linkedinUsername || personalInfo?.githubUsername || personalInfo?.website) && (
            <section className="mb-6">
              <h2 className={`text-lg font-bold uppercase border-b ${theme.border} mb-3`}>Links</h2>
              <div className="text-sm">
                {personalInfo?.githubUsername && (
                  <div className="mb-1">
                    Github:// <a href={`https://github.com/${personalInfo.githubUsername}`} target="_blank" rel="noopener noreferrer" className={`font-bold ${theme.accent} hover:underline`}>
                      {personalInfo.githubUsername}
                    </a>
                  </div>
                )}
                {personalInfo?.linkedinUsername && (
                  <div className="mb-1">
                    LinkedIn:// <a href={`https://linkedin.com/in/${personalInfo.linkedinUsername}`} target="_blank" rel="noopener noreferrer" className={`font-bold ${theme.accent} hover:underline`}>
                      {personalInfo.linkedinUsername}
                    </a>
                  </div>
                )}
                {personalInfo?.website && (
                  <div className="mb-1">
                    Website:// <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className={`font-bold ${theme.accent} hover:underline`}>
                      {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompactTemplate;
