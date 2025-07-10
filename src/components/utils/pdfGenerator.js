import { themes } from '../../context/ThemeContext';

// Backend API URL - automatically selects production or development URL
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://freeresumebackend.onrender.com/api'  // Replace with your actual Vercel backend URL
  : 'http://localhost:3001/api';


// Function to create and show loading overlay
const showLoadingOverlay = () => {
  // Get current theme from localStorage
  const currentThemeName = localStorage.getItem('resumeTheme') || 'blue';
  const theme = themes[currentThemeName] || themes.blue;
  const primaryColor = theme.primary || '#2563eb';
  
  // Create overlay container
  const overlay = document.createElement('div');
  overlay.id = 'pdf-loading-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;
  
  // Create loader
  const loader = document.createElement('div');
  loader.style.cssText = `
    width: 60px;
    height: 60px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: ${primaryColor};
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 20px;
  `;
  
  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  // Add message
  const message = document.createElement('div');
  message.textContent = 'Generating PDF...';
  message.style.cssText = `
    color: white;
    font-size: 18px;
    font-weight: 500;
    font-family: system-ui, -apple-system, sans-serif;
  `;
  
  // Assemble overlay
  overlay.appendChild(loader);
  overlay.appendChild(message);
  document.body.appendChild(overlay);
  
  return overlay;
};

// Function to hide loading overlay
const hideLoadingOverlay = () => {
  const overlay = document.getElementById('pdf-loading-overlay');
  if (overlay) {
    document.body.removeChild(overlay);
  }
};

// Main function to generate and download PDF
export const generatePDF = async () => {
  let loadingOverlay = null;
  
  try {
    // Show loading overlay
    loadingOverlay = showLoadingOverlay();
    
    // Get the resume preview element
    const element = document.getElementById('resume-preview');
    if (!element) {
      console.error('Resume preview element not found');
      return;
    }

    // Function to get all styles from document
    const getAllStyles = () => {
      const styleSheets = Array.from(document.styleSheets);
      let cssText = '';
      
      styleSheets.forEach(sheet => {
        try {
          const rules = sheet.cssRules || [];
          Array.from(rules).forEach(rule => {
            cssText += rule.cssText + '\n';
          });
        } catch (e) {
          // Handle CORS issues with external stylesheets
          if (sheet.href) {
            cssText += `@import url('${sheet.href}');\n`;
          }
        }
      });
      
      // Get inline styles
      const inlineStyles = Array.from(document.querySelectorAll('style'))
        .map(style => style.textContent)
        .join('\n');
      
      return cssText + '\n' + inlineStyles;
    };

    // Get the complete HTML content with all styles
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          ${getAllStyles()}
          
          /* Ensure all elements are visible in PDF */
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Force background colors to print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0;">
        <div style="width: 210mm; min-height: 297mm; margin: 0 auto; padding: 20mm; box-sizing: border-box;">
          ${element.outerHTML}
        </div>
      </body>
      </html>
    `;

    console.log('Sending request to generate PDF...');
    // Send request to backend
    const response = await fetch(`${API_URL}/pdf/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Don't use credentials: 'include' to avoid CORS preflight complexity
      body: JSON.stringify({
        html: htmlContent
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PDF Generation failed:', errorData);
      throw new Error(errorData.message || errorData.error || 'Failed to generate PDF');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/pdf')) {
      console.error('Invalid response type:', contentType);
      throw new Error('Server did not return a PDF');
    }

    // Get the PDF blob
    const pdfBlob = await response.blob();

    // Create download link
    const downloadUrl = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
    
    // Success message
    if (loadingOverlay) {
      hideLoadingOverlay();
      showSuccessMessage('PDF generated successfully!');
    }
  } catch (error) {
    console.error('PDF Generation Error:', error);
    
    // Hide loading and show error
    if (loadingOverlay) {
      hideLoadingOverlay();
      showErrorMessage('Failed to generate PDF: ' + (error.message || 'Unknown error'));
    }
    throw error;
  }
};

// Success message toast
const showSuccessMessage = (message) => {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #10b981;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: fadeInOut 3s ease forwards;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translate(-50%, 20px); }
      10% { opacity: 1; transform: translate(-50%, 0); }
      90% { opacity: 1; transform: translate(-50%, 0); }
      100% { opacity: 0; transform: translate(-50%, -20px); }
    }
  `;
  document.head.appendChild(style);
  
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, 3000);
};

// Error message toast
const showErrorMessage = (message) => {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ef4444;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: fadeInOut 4s ease forwards;
  `;
  
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, 4000);
};