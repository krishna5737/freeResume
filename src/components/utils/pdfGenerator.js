import html2pdf from 'html2pdf.js';
import { themes } from '../../context/ThemeContext';

// Helper function to prepare the resume element for PDF generation
const prepareResumeElement = () => {
  // Get the current theme from localStorage
  const currentTheme = localStorage.getItem('resumeTheme') || 'light';
  // Get the resume preview element
  const element = document.getElementById('resume-preview');
  
  if (!element) {
    console.error('Resume preview element not found');
    return null;
  }
  
  // Clone the element to avoid modifying the original
  const clonedElement = element.cloneNode(true);
  
  // Fix bullet points and remove margins in the DOM
  const richTextContents = clonedElement.querySelectorAll('.rich-text-content');
  richTextContents.forEach(container => {
    // Remove margin-left from rich-text-content
    container.style.marginLeft = '0';
    
    // Find all bullet points
    const bulletPoints = container.querySelectorAll('ul li');
    bulletPoints.forEach(li => {
      // Remove any leading spaces before bullet points
      if (li.innerHTML.startsWith(' ')) {
        li.innerHTML = li.innerHTML.trimStart();
      }
      // Adjust styling directly
      li.style.textIndent = '0';
      li.style.marginLeft = '0';
      li.style.paddingLeft = '0';
    });
    
    // Adjust ul elements
    const ulElements = container.querySelectorAll('ul');
    ulElements.forEach(ul => {
      ul.style.paddingLeft = '0rem';
      ul.style.marginTop = '0.25rem';
    });
  });
  
  // Remove border and apply theme styles
  const styles = document.createElement('style');
  styles.textContent = `
    #resume-preview {
      border: none !important;
    }
    .border {
      border: none !important;
    }
    
    /* Apply current theme styles */
    #resume-preview {
      color: var(--color-text) !important;
      background-color: var(--color-bg) !important;
    }
    
    #resume-preview h1, #resume-preview h2, #resume-preview h3, #resume-preview h4 {
      color: var(--color-heading) !important;
    }
    
    #resume-preview .skill-badge {
      background-color: var(--color-skill-bg) !important;
      color: var(--color-skill-text) !important;
    }
    
    #resume-preview .accent-text {
      color: var(--color-accent-text) !important;
    }
    
    /* Apply theme color variables to buttons and interactive elements */
    #resume-preview .theme-button {
      background-color: var(--color-button-bg) !important;
      color: var(--color-button-text) !important;
    }
    
    #resume-preview .theme-button:hover {
      background-color: var(--color-button-hover) !important;
    }
    
    /* Apply theme border colors */
    #resume-preview .theme-border {
      border-color: var(--color-border) !important;
    }
  `;
  document.head.appendChild(styles);
  
  // Add the current theme class to the cloned element
  clonedElement.classList.add(`theme-${currentTheme}`);
  
  return { element: clonedElement, styles };
};

// Helper function to add footer to all pages
const addFooterToPages = (pdf, userName) => {
  const totalPages = pdf.internal.getNumberOfPages();
  
  if (totalPages < 1) return;
  
  // Add footer to all pages
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    
    // Set font styles for footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Current date for left side of footer
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    pdf.text(currentDate, 10, pageHeight - 10);
    
    // Name and Resume text for center
    const centerText = `${userName} \u00b7 Resume`;
    pdf.text(centerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    // Page number for right side
    pdf.text(`${i}`, pageWidth - 10, pageHeight - 10, { align: 'right' });
    
    // Add thin line above footer
    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, pageHeight - 15, pageWidth - 10, pageHeight - 15);
  }
};

// Main function to generate and download PDF
export const generatePDF = () => {
  // Prepare the resume element
  const prepared = prepareResumeElement();
  if (!prepared) return;
  
  const { element, styles } = prepared;
  
  // Get user name for the footer
  const userName = element.querySelector('h1')?.textContent || 'Resume';
  
  // Configure html2pdf options
  const opt = {
    margin: [0, 3, 15, 3], // top, right, bottom, left (in mm)
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { 
      scale: 4,
      useCORS: true,
      letterRendering: true,
      logging: false,
      dpi: 300
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait'
    }
  };
  
  // Generate PDF with footer
  html2pdf()
    .set(opt)
    .from(element)
    .toPdf()
    .get('pdf')
    .then(pdf => {
      // Add footer to all pages
      addFooterToPages(pdf, userName);
      return pdf;
    })
    .save()
    .then(() => {
      // Clean up
      setTimeout(() => {
        document.head.removeChild(styles);
      }, 1000);
    });
};

// Helper function to preview the PDF without downloading
export const previewPDF = () => {
  // Prepare the resume element
  const prepared = prepareResumeElement();
  if (!prepared) return;
  
  const { element, styles } = prepared;
  
  // Get user name for the footer
  const userName = element.querySelector('h1')?.textContent || 'Resume';
  
  // Configure html2pdf options
  const opt = {
    margin: [10, 3, 15, 3], // top, right, bottom, left (in mm)
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { 
      scale: 4,
      useCORS: true,
      letterRendering: true,
      logging: false,
      dpi: 300
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait'
    },
    pagebreak: { mode: 'avoid-all' },
    output: 'dataurlnewwindow'
  };
  
  // Generate PDF with footer
  html2pdf()
    .set(opt)
    .from(element)
    .toPdf()
    .get('pdf')
    .then(pdf => {
      // Add footer to all pages
      addFooterToPages(pdf, userName);
      return pdf;
    })
    .output('dataurlnewwindow')
    .catch(error => {
      console.error('Error previewing PDF:', error);
    })
    .finally(() => {
      // Clean up
      setTimeout(() => {
        document.head.removeChild(styles);
      }, 1000);
    });
};
