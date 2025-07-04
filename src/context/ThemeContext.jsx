import { createContext, useContext, useState, useEffect } from 'react';

// Define theme options with their Tailwind class mappings
export const themes = {
  blue: {
    name: 'Blue',
    // Color palette
    primary: 'bg-blue-800 text-white', // Navy blue
    secondary: 'bg-blue-600 text-white', // Medium blue
    accent: 'bg-blue-400 text-blue-900', // Sky blue
    
    // UI mappings
    background: 'bg-white',
    text: 'text-gray-800',
    sectionHeading: 'text-blue-800 font-semibold', // primary color
    border: 'border-blue-200',
    accent: 'text-blue-600', // secondary color
    skillBadge: 'bg-blue-100 text-blue-800',
    headerBackground: 'bg-blue-50',
    headerText: 'text-blue-900',
    sidebarBackground: 'bg-white',
    formBackground: 'bg-gray-50',
    cardBackground: 'bg-white',
    buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white', // secondary color
    buttonSecondary: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
  },
  green: {
    name: 'Green',
    // Color palette
    primary: 'bg-green-800 text-white', // Dark green
    secondary: 'bg-green-600 text-white', // Medium green
    accent: 'bg-teal-400 text-teal-900', // Teal
    
    // UI mappings
    background: 'bg-white',
    text: 'text-gray-800',
    sectionHeading: 'text-green-800 font-semibold', // primary color
    border: 'border-green-200',
    accent: 'text-green-600', // secondary color
    skillBadge: 'bg-green-100 text-green-800',
    headerBackground: 'bg-green-50',
    headerText: 'text-green-900',
    sidebarBackground: 'bg-white',
    formBackground: 'bg-gray-50',
    cardBackground: 'bg-white',
    buttonPrimary: 'bg-green-600 hover:bg-green-700 text-white', // secondary color
    buttonSecondary: 'bg-green-100 hover:bg-green-200 text-green-800',
  },
  purple: {
    name: 'Purple',
    // Color palette
    primary: 'bg-purple-900 text-white', // Deep purple
    secondary: 'bg-purple-600 text-white', // Medium purple
    accent: 'bg-violet-400 text-violet-900', // Light violet
    
    // UI mappings
    background: 'bg-white',
    text: 'text-gray-800',
    sectionHeading: 'text-purple-800 font-semibold', // primary color
    border: 'border-purple-200',
    accent: 'text-purple-600', // secondary color
    skillBadge: 'bg-purple-100 text-purple-800',
    headerBackground: 'bg-purple-50',
    headerText: 'text-purple-900',
    sidebarBackground: 'bg-white',
    formBackground: 'bg-gray-50',
    cardBackground: 'bg-white',
    buttonPrimary: 'bg-purple-600 hover:bg-purple-700 text-white', // secondary color
    buttonSecondary: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
  },

  gray: {
    name: 'Gray',
    // Color palette
    primary: 'bg-gray-800 text-white', // Charcoal
    secondary: 'bg-gray-600 text-white', // Medium gray
    accent: 'bg-gray-400 text-gray-900', // Silver
    
    // UI mappings
    background: 'bg-white',
    text: 'text-gray-800',
    sectionHeading: 'text-gray-800 font-semibold', // primary color
    border: 'border-gray-300',
    accent: 'text-gray-600', // secondary color
    skillBadge: 'bg-gray-200 text-gray-800',
    headerBackground: 'bg-gray-100',
    headerText: 'text-gray-900',
    sidebarBackground: 'bg-white',
    formBackground: 'bg-gray-50',
    cardBackground: 'bg-white',
    buttonPrimary: 'bg-gray-600 hover:bg-gray-700 text-white', // secondary color
    buttonSecondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Load theme from localStorage or use default
  const loadSavedTheme = () => {
    const savedTheme = localStorage.getItem('resumeTheme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'blue';
  };

  const [currentTheme, setCurrentTheme] = useState(loadSavedTheme);
  
  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeTheme', currentTheme);
    
    // Apply theme to body for global styles
    document.body.classList.remove(
      'theme-blue', 
      'theme-green', 
      'theme-purple', 
      'theme-gray'
    );
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  // Change the active theme
  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        theme: themes[currentTheme],
        themes,
        changeTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
