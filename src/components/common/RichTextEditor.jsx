import { useState, useEffect } from 'react';

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const [text, setText] = useState(value || '');
  
  useEffect(() => {
    setText(value || '');
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setText(newValue);
    onChange(newValue);
  };

  const handleFormat = (format) => {
    const textarea = document.getElementById('rich-text-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    let formattedText = '';
    let cursorPosition = end;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorPosition = end + 4;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorPosition = end + 2;
        break;
      case 'bullet':
        // Add a bullet point at the beginning of each line
        formattedText = selectedText
          ? selectedText.split('\n').map(line => `• ${line}`).join('\n')
          : '• ';
        cursorPosition = end + (selectedText ? 2 * selectedText.split('\n').length : 2);
        break;
      case 'number':
        // Add numbered list
        formattedText = selectedText
          ? selectedText.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n')
          : '1. ';
        cursorPosition = end + (selectedText ? 3 * selectedText.split('\n').length : 3);
        break;
      case 'link':
        formattedText = `[${selectedText || 'link text'}](url)`;
        cursorPosition = end + (selectedText ? 7 : 16);
        break;
      default:
        return;
    }

    const newText = text.substring(0, start) + formattedText + text.substring(end);
    setText(newText);
    onChange(newText);
    
    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  return (
    <div className="rich-text-editor border rounded-md overflow-hidden">
      <div className="bg-gray-50 border-b flex items-center p-1">
        <div className="flex gap-1 mr-4">
          <button 
            type="button" 
            onClick={() => handleFormat('bold')}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded"
            title="Bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
            </svg>
          </button>
          <button 
            type="button" 
            onClick={() => handleFormat('italic')}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded"
            title="Italic"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
            </svg>
          </button>
        </div>
        
        <div className="flex gap-1 mr-4 border-l pl-4">
          <button 
            type="button" 
            onClick={() => handleFormat('bullet')}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded"
            title="Bullet List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
          </button>
          <button 
            type="button" 
            onClick={() => handleFormat('number')}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded"
            title="Numbered List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>
            </svg>
          </button>
        </div>
        
        <div className="flex gap-1 border-l pl-4">
          <button 
            type="button" 
            onClick={() => handleFormat('link')}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded"
            title="Link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
              <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <textarea
        id="rich-text-editor"
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-3 h-40 resize-y border-0 focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default RichTextEditor;
