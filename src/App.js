import React, { useState, useEffect, useMemo } from 'react';
import Article from './Article';
import newsData from './aviation-partnerships.json';
import Pagination from './components/Pagination';
import DefaultNavbar from './components/DefaultNavbar';
import FooterWithSocialMediaIcons from './components/Footer';
import LoadingIndicator from './components/LoadingIndicator';

// Constant for number of articles per page
const articlesPerPage = 9;

// Helper function to filter and sort articles
const getSortedAndFilteredArticles = (data, searchTerm, sortOrder) => {
  // Filtering articles based on the search term
  const filtered = data.documents.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sorting articles based on date and sort order
  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return sorted;
};

function App() {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDisplayedArticles, setCurrentDisplayedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Use memoization to minimize recalculation of sorted articles
  const sortedArticles = useMemo(
    () => getSortedAndFilteredArticles(newsData, searchTerm, sortOrder),
    // eslint-disable-next-line
    [newsData, searchTerm, sortOrder]
  );

  // Effect for pagination and loading status
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const indexOfLastArticle = currentPage * articlesPerPage;
      const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

      setCurrentDisplayedArticles(sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle));
      
      setIsLoading(false);
    }, 500);

    // Cleanup timer when unmounting
    return () => clearTimeout(timer);
  }, [currentPage, sortedArticles]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);

  // Function to change the current page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Navbar for search and sorting */}
      <DefaultNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
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
              <Article key={article.documentId} article={article} />
            ))}

            {/* Pagination component */}
            <div className="col-span-full flex justify-center items-center ">
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
