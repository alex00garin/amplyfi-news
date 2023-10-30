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
const Article = ({ article }) => {

  
  return (
    <ErrorBoundary>
      <div className='article grid m-4 rounded-lg border p-6 shadow-md bg-white hover:scale-110 hover:shadow-2xl transition duration-500'>
        <LoadingIndicator /> {/* Display a loading indicator */}
        <p className='text-md text-gray-600'>{formatDate(article.date)}</p> {/* Format and display the article date */}
        <h2 className='text-2xl font-semibold mb-4'>{article.title}</h2> {/* Display the article title */}
        <p className='text-md text-gray-700'>{article.sentences[0].text}</p> {/* Display the article content */}
        
        {/* Display the SpeedDial component for sharing */}
        <div className='flex items-end justify-between mt-6'>
          <SpeedDial 
            url={article.url} 
            title={article.title} 
            summary={article.sentences[0].text}
          />
          
          {/* Provide a link to read the full article */}
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

export default Article; // Export the Article component
