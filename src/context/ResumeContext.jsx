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
    firstName: "Prashant",
    lastName: "Kushwah",
    email: "prashantkushwah913@gmail.com",
    location: "",
    phone: "+91-9793271167",
    linkedinUsername: "prashant-kumar-87a909211/",
    githubUsername: "PrashantKumar9786",
    title: "",
    name: "Prashant Kushwah",
  },
  summary: "",
  experience: [],
  education: [
    {
      institution: "Pranveer Singh Institute of Technology, Kanpur",
      degree: "B.Tech",
      field: "Computer Science and Engineering",
      location: "",
      startDate: "Dec. 2022",
      endDate: "Present",
      current: true,
      gpa: "7.7/10.0",
      description: ""
    },
    {
      institution: "Saraswati Vidya Mandir, Agra, UP",
      degree: "Senior Secondary",
      field: "Class XII",
      location: "",
      startDate: "Apr. 2021",
      endDate: "Apr. 2022",
      current: false,
      gpa: "84.2%",
      description: ""
    },
    {
      institution: "Saraswati Vidya Mandir, Agra, UP",
      degree: "Secondary School",
      field: "Class X",
      location: "",
      startDate: "Apr. 2019",
      endDate: "Apr. 2020",
      current: false,
      gpa: "71%",
      description: ""
    }
  ],
  skills: [
    "C++",
    "JavaScript",
    "SQL",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "React.js",
    "Node.js",
    "Express.js",
    "REST APIs",
    "JWT Authentication",
    "MongoDB",
    "MySQL",
    "GitHub",
    "Postman",
    "VS Code",
    "OOPs",
    "Operating Systems",
    "Database Management System"
  ],
  projects: [
    {
      title: "ResumeNest - Smart Resume Builder",
      link: "",
      technologies: "React.js, TailwindCSS, JavaScript, Git, Vercel",
      startDate: "July 2025",
      endDate: "Aug. 2025",
      description: "• Built full-stack resume generator application with structured backend integration for live preview and client-side export.\n• Integrated jsPDF and html2canvas to generate clean, downloadable PDF resumes on the client side.\n• Designed a responsive and accessible UI using TailwindCSS for cross-device compatibility.\n• Designed a responsive and modern UI with TailwindCSS, ensuring accessibility across mobile, tablet, and desktop.\n• Employed modular UI components with TailwindCSS and ensured seamless deployment using Vercel CI/CD."
    },
    {
      title: "DocuSummarizer - Summarization Tool",
      link: "",
      technologies: "JavaScript, Node.js, Express.js, REST APIs, MongoDB, OCR, Gemini AI",
      startDate: "Sep. 2025",
      endDate: "Oct. 2025",
      description: "• Developed an AI-based document summarization web app with OCR (Tesseract.js) and PDF text parsing pipeline.\n• Designed and implemented a modular RESTful backend in Express.js, supporting OCR-based document uploads and AI-driven summarization.\n• Developed Express.js RESTful API with memory-based file processing, CORS security, and input validation.\n• Integrated Gemini AI API for generating structured markdown summaries and Tesseract.js for OCR extraction.\n• Focused on backend optimization, request validation, and asynchronous data handling."
    }
  ],
  certifications: [
    {
      name: "Transformer-Based NLP — NVIDIA",
      issuer: "NVIDIA",
      date: "",
      url: ""
    },
    {
      name: "Software Engineering Virtual Experience —JPMorgan Chase, Forage",
      issuer: "JPMorgan Chase, Forage",
      date: "",
      url: ""
    },
    {
      name: "160 Days of Problem Solving — GeeksforGeeks",
      issuer: "GeeksforGeeks",
      date: "",
      url: ""
    }
  ],
  customSections: [],
  achievements: [
    {
      name: "Earned 4-Star rating in C++ Programming on HackerRank",
      url: "",
      year: ""
    },
    {
      name: "Ranked 204th on GeeksForGeeks with a 800+ coding score, in the top 5% of my college",
      url: "",
      year: ""
    },
    {
      name: "Technical Co-Head — IGNITIA 2024: Annual Techno-Cultural Event",
      url: "",
      year: "2024"
    }
  ],
  pageBreaks: [],
  sectionOrder: [
    "personalInfo",
    "education",
    "projects",
    "skills",
    "achievements",
    "certifications",
    "summary",
    "experience"
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

  // Custom sections functionality will be rebuilt from scratch

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
