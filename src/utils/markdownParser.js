/**
 * Simple markdown parser for resume text
 * Handles basic markdown formatting: bold, italic, links, bullet points, and numbered lists
 */
export const parseMarkdown = (text) => {
  if (!text) return '';
  
  // Replace bold text
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace italic text
  parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Replace links
  parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-purple-700 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Replace bullet points
  parsed = parsed.replace(/^• (.*?)$/gm, '<li>$1</li>');
  
  // Replace numbered lists
  parsed = parsed.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
  
  // Wrap bullet points in ul tags
  if (parsed.includes('<li>')) {
    const lines = parsed.split('\n');
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('<li>') && !inList) {
        lines[i] = '<ul class="list-disc ml-5 mb-2">' + lines[i];
        inList = true;
      } else if (!lines[i].includes('<li>') && inList) {
        lines[i-1] = lines[i-1] + '</ul>';
        inList = false;
      }
    }
    
    if (inList) {
      lines[lines.length - 1] = lines[lines.length - 1] + '</ul>';
    }
    
    parsed = lines.join('\n');
  }
  
  // Handle line breaks
  parsed = parsed.replace(/\n/g, '');
  
  return parsed;
};
