import React, { useState, useEffect, useMemo } from 'react';
import Article from './Article';
import newsData from './aviation-partnerships.json';
import Pagination from './components/Pagination';
import DefaultNavbar from './components/DefaultNavbar';
import FooterWithSocialMediaIcons from './components/Footer';
import LoadingIndicator from './components/LoadingIndicator';

// Constant for number of articles per page
const articlesPerPage = 9;

function App() {
  // Define state variables
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDisplayedArticles, setCurrentDisplayedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate indices for slicing articles array based on current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage + 1;

   // State for selected tags in articles
  const [selectedTag, setSelectedTag] = useState(null);

  // Function to reset selected tags
  const resetTagFunction = () => {
    setSelectedTag(null);
  };

  // Function to get sorted and filtered articles
  const getSortedAndFilteredArticles = (data, searchTerm, sortOrder, selectedTag) => {
    const filtered = data.documents.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    let tagFiltered = filtered;

    if (selectedTag) {
      tagFiltered = filtered.filter(article =>
        article.sentences[0]?.alertTypes && article.sentences[0]?.alertTypes.includes(selectedTag)
      );
  }


    const sorted = [...tagFiltered].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return sorted;
  };

  // Memoize sorted articles to prevent re-sorting unless dependencies change
  const sortedArticles = useMemo(
    () => getSortedAndFilteredArticles(newsData, searchTerm, sortOrder, selectedTag),
    [searchTerm, sortOrder, selectedTag]
  );

  // Memoize sorted articles to prevent re-sorting unless dependencies change
  useEffect(() => {
  }, [sortedArticles]);

  // useEffect for handling pagination and showing a loading indicator
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const indexOfLastArticle = currentPage * articlesPerPage;
      const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

      setCurrentDisplayedArticles(sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle));
      
      setIsLoading(false);
    }, 500); //Simulation
  
    // Cleanup timer when unmounting
    return () => clearTimeout(timer);
  }, [currentPage, sortedArticles]);

  // Calculate total number of pages
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);

  // Function to set the current page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Navbar for search and sorting */}
      <DefaultNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        selectedTag={selectedTag}
        resetTag={resetTagFunction} 
      />

      {/* Display loading indicator if data is being loaded */}
      {isLoading ? (
        <LoadingIndicator loading={isLoading} />
      ) : (
        <div className="max-w-screen-xl mx-auto p-5">
          {/* Grid layout for articles */}
          <div className="app font-syne grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Map over current articles to display them */}
            {currentDisplayedArticles.map((article) => (
              <Article key={article.documentId} article={article} handleTagClick={setSelectedTag} />
            ))}
          <div className="col-span-full flex flex-col justify-center items-center mt-5">
            <p>
              Displaying articles <span className='text-xl font-bold'>{indexOfFirstArticle}</span> to <span className='text-xl font-bold'>{Math.min(indexOfLastArticle, sortedArticles.length)}</span> of {sortedArticles.length}
            </p>
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
          </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <FooterWithSocialMediaIcons />
    </div>
  );
}

export default App;