import { useTheme } from '../../context/ThemeContext';

const ThemedSectionHeading = ({ title }) => {
  const { theme } = useTheme();
  
  return (
    <h3 className={`text-base font-bold my-2 uppercase font-sans px-2 py-1 rounded bg-gray-100 ${theme.sectionHeading}`}>
      {title}
    </h3>
  );
};

export default ThemedSectionHeading;
