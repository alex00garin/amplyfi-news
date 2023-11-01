// Import React and necessary components
import React from 'react';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorBoundary from './components/ErrorBoundary';
import SpeedDial from './components/SpeedDial';
import '../src/index.css'; // Import CSS

// Function to format a date string
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

// Article component
const Article = ({ article, handleTagClick }) => {
  // Get tags from the article's alertTypes field
  const tags = article.sentences[0]?.alertTypes || [];  // Get alertTypes as tags

 
  return (
    <ErrorBoundary>
      {/* Article wrapper */}
      <div className='article grid m-4 rounded-lg border p-6 shadow-md bg-white hover:scale-110 hover:shadow-2xl transition duration-500'>
        {/* Loading indicator */}
        <LoadingIndicator />
        
        {/* Display formatted date */}
        <p className='text-md text-gray-600'>{formatDate(article.date)}</p>
        
        {/* Display article title */}
        <h2 className='text-2xl font-semibold mb-4'>{article.title}</h2>
        
        {/* Display article content */}
        <p className='text-md text-gray-700'>{article.sentences[0].text}</p>
        
        {/* Tag container */}
        <div className='tag-container mt-4 flex flex-wrap items-center'>
          {/* Loop through tags and display them */}
          {tags.map((tag, index) => (
            <button 
              key={index} 
              className='tag text-xs bg-blue-100 hover:bg-blue-200 hover:shadow-lg p-1 m-0.5 rounded inline-flex items-center justify-center hover:scale-105 transition duration-300 ease-in-out' 
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Social sharing buttons */}
        <div className='flex items-end justify-between mt-6'>
          <SpeedDial 
            url={article.url} 
            title={article.title} 
            summary={article.sentences[0].text}
          />
          
          {/* Link to read full article */}
          <a 
            target='_blank' 
            rel='noreferrer' 
            href={article.url} 
            className='readFull text-md text-neutral-600 hover:text-neutral-800 flex items-center'
          >
            Read full
          </a>
        </div>
      </div>
    </ErrorBoundary>
  );
};

// Export the Article component
export default Article; 