import { createContext, useContext, useState, useEffect } from 'react';

// Default section order
const defaultSectionOrder = [
  'personalInfo',
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'achievements'
];

// Sample resume data with filled information
const sampleResumeData = {
  personalInfo: {
    firstName: "Krishan",
    lastName: "Kumar",
    email: "krishna.5737@gmail.com",
    location: "Hyderabad",
    phone: "+91-9984668852",
    linkedinUsername: "",
    githubUsername: "",
    title: "Senior Software Developer at Servicenow",
    name: "Krishan Kumar",
    links: [
      {
        label: "LinkedIn",
        url: "k"
      },
      {
        label: "GitHub",
        url: "f"
      }
    ]
  },
  summary: "Experienced Software Developer with 7+ years in full-stack and AI-driven product development, currently at ServiceNow. Proven track record in leading agile teams, designing intelligent automation solutions, and building scalable UI components. ",
  experience: [
    {
      company: "ServiceNow",
      position: "Sr. Software Developer",
      location: "Hyderabad",
      startDate: "Oct. 2020",
      endDate: "",
      current: true,
      description: "• Worked as a Scrum Master, leading a cross-functional team through Grooming, Planning, and Backlog sessions. Managed release planning, branch strategy, and team coordination. Acted as the main point of contact between the Product Owner and senior stakeholders to ensure timely and high-quality delivery.\n• Built AI Agent to handle non-critical HR cases, successfully redirecting **85%** of such cases—allowing human agents to focus on critical and sensitive issues.\n• Created AI Agents for multiple HR use cases—including Proactive Prompts and WSD—that user experience through faster, more accurate self-service responses.\n• Utilized Machine Learning techniques to implement Universal request and Issue Auto Resolutions, automating case resolution and efficient ticket routing to the appropriate departments reducing the time for case resolution by **60%**.\n• Significantly contributed to the development of a common React component library, implementing complex components in alignment with internal Figma designs, enhancing UI consistency and accelerating development speed by **30%** across multiple projects.\n• Developed a custom AngularJS widget that allows users to upload, view, and manage their skills and experiences—delivering functionality similar to LinkedIn."
    },
    {
      company: "Vitara - An Analytics Company",
      position: "Software Engineer",
      location: "",
      startDate: "June 2018",
      endDate: "Sep. 2020",
      current: false,
      description: "• Led the redesign and redevelopment of the Property Editor, significantly improving usability and overall user experience.\n• Optimized the build pipeline by refactoring the codebase—reducing build time from 3 minutes to 8 seconds and shrinking build size from 10MB to 500KB.\n• Built an interactive Map Chart visualization from scratch, enabling users to explore and analyze geographical data efficiently.\n• Developed and enhanced data analytics visualizations, owning the full cycle from development to testing and support.\n• Worked across a range of front-end technologies including HTML5, CSS, JavaScript (Vanilla and ReactJS), D3.js, and AG Grid.\n"
    },
    {
      company: "MAQ Software",
      position: "Software Engineer",
      location: "Hyderabad",
      startDate: "Sep. 2017",
      endDate: "Apr. 2018",
      current: false,
      description: "• Worked as part of data science team to forecast Microsoft Sales Insights using advanced Machine Learning models. Leveraged Microsoft Azure Machine Learning Studio, Jupyter Notebook, and MSSQL to clean, preprocess, and model sales data for accurate trend prediction.\n• Contributed to the development of custom Power BI plugins using TypeScript, HTML, and CSS, enhancing platform capabilities and user experience through tailored visual components.\n• Designed and developed analytical cubes on MS SQL Server tables to support rich, interactive Power BI reports, enabling actionable insights from curated data."
    }
  ],
  education: [
    {
      institution: "IIIT Allahabad",
      degree: "M.Tech",
      field: "IT - Robotics",
      location: "",
      startDate: "July 2015",
      endDate: "Aug. 2017",
      current: false,
      gpa: "8.4/10",
      description: "Worked as a Teaching Assistant for the Operating Systems course during my master's program. Graded assignments and exams promptly,\nproviding constructive feedback to foster academic growth."
    }
  ],
  skills: [],
  projects: [
    {
      name: "Imitation of Human Motion on a Humanoid Robot",
      link: "",
      technologies: "Image Processing, Vector Algebra, Machine Learning, Python, MATLAB",
      date: "Feb 2017 - July 2017",
      description: "• Built an offline inverse kinematics-based system to enable the NAO robot to imitate human upper limb motions captured using Kinect V1.\n• Processed depth images to extract skeleton joint data and mapped it to the robot's joints, handling differences in human-robot kinematics.\n• Applied single and multi-objective optimization to compress motion data for faster processing and deployment.\n• Achieved smooth and reliable motion replication through experimental validation."
    }
  ],
  certifications: [],
  customSections: [],
  achievements: [
    {
      name: "Research Paper: Imitation of Human Motion on Humanoid Robot using Inverse Kinematics and Path Optimisation",
      url: "http://ieeexplore.ieee.org/document/8662908",
      year: "2018"
    },
    {
      name: "Microsoft 70-774: Perform Cloud Data Science with Azure Machine Learning",
      url: "",
      year: "2018"
    },
    {
      name: "Microsoft 70-761: Querying Data with Transact-SQL",
      url: "",
      year: "2017"
    },
    {
      name: "Udacity Nano Degree for ReactJS",
      url: "",
      year: "2019"
    }
  ],
  pageBreaks: [
    {
      id: "page-break-1751397932791",
      position: 0
    },
    {
      id: "page-break-1751398317668"
    },
    {
      id: "page-break-1751398318824"
    },
    {
      id: "page-break-1751398319858"
    },
    {
      id: "page-break-1751398320056"
    },
    {
      id: "page-break-1751398345403"
    },
    {
      id: "page-break-1751398346060"
    },
    {
      id: "page-break-1751398346235"
    },
    {
      id: "page-break-1751398346390"
    },
    {
      id: "page-break-1751398346554"
    },
    {
      id: "page-break-1751398346735"
    },
    {
      id: "page-break-1751398356529"
    },
    {
      id: "page-break-1751398395177"
    },
    {
      id: "page-break-1751398413676"
    },
    {
      id: "page-break-1751398414185"
    },
    {
      id: "page-break-1751398414375"
    },
    {
      id: "page-break-1751398414534"
    },
    {
      id: "page-break-1751398414728"
    }
  ],
  sectionOrder: [
    "personalInfo",
    "summary",
    "experience",
    "skills",
    "projects",
    "certifications",
    "achievements",
    "education"
  ]
};

// Initial resume structure - use sample data
const initialResumeState = sampleResumeData;

// Create the context
const ResumeContext = createContext();

// Provider component
export const ResumeProvider = ({ children }) => {
  // Load data from localStorage if available
  const loadSavedData = () => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : initialResumeState;
  };

  const [resumeData, setResumeData] = useState(loadSavedData);
  const [activeTheme, setActiveTheme] = useState('default');
  const [activeFont, setActiveFont] = useState('system-ui');
  const [darkMode, setDarkMode] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  // Update a specific section
  const updateSection = (sectionName, data) => {
    setResumeData(prev => ({
      ...prev,
      [sectionName]: data
    }));
  };

  // Add an item to a section array
  const addItem = (sectionName, item) => {
    setResumeData(prev => ({
      ...prev,
      [sectionName]: [...prev[sectionName], item]
    }));
  };

  // Update an item in a section array
  const updateItem = (sectionName, index, item) => {
    setResumeData(prev => {
      const newArray = [...prev[sectionName]];
      newArray[index] = item;
      return {
        ...prev,
        [sectionName]: newArray
      };
    });
  };

  // Remove an item from a section array
  const removeItem = (sectionName, index) => {
    setResumeData(prev => {
      const newArray = [...prev[sectionName]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [sectionName]: newArray
      };
    });
  };

  // Add a custom section
  const addCustomSection = (title) => {
    const key = title.toLowerCase().replace(/\s+/g, '_');
    
    // Add to custom sections
    setResumeData(prev => ({
      ...prev,
      customSections: [
        ...prev.customSections,
        { key, title, items: [] }
      ]
    }));
    
    return key; // Return the key for the new section
  };

  // Remove a custom section
  const removeCustomSection = (key) => {
    // Remove from custom sections
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(section => section.key !== key)
    }));
  };

  // Update section order (for drag and drop reordering)
  const updateSectionOrder = (newOrder) => {
    
    // Create a new object to ensure state change is detected
    setResumeData(prev => {
      const updatedData = {
        ...prev,
        sectionOrder: [...newOrder] // Create a new array to ensure state change
      };
      
      return updatedData;
    });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        activeTheme,
        activeFont,
        darkMode,
        updateSection,
        addItem,
        updateItem,
        removeItem,
        addCustomSection,
        removeCustomSection,
        updateSectionOrder,
        setActiveTheme,
        setActiveFont,
        toggleDarkMode
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook to use the resume context
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
