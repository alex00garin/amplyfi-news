import React from 'react';

// Pagination component to manage and display pagination
function Pagination({ currentPage, totalPages, paginate }) {
  // Generate an array of page numbers based on current and total pages
  function generatePageNumbers() {
    const pageNumbers = [];

    // Show initial pages if on first two pages
    if (currentPage <= 2) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
    } 
    // Show last pages if on last two pages
    else if (currentPage >= totalPages - 1) {
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } 
    // Show current page and one before & after it
    else {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
    }
  
    return pageNumbers;
  }
  
  return (
    <div className="mt-3 md:mt-5 ld:mt-12 text-sm md:text-lg lg:text-xl inline-flex items-center -space-x-px cursor-pointer font-syne">
      
      {/* Previous button */}
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="ml-0 rounded-l-lg border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500"
      >
        Previous
      </button>

      {/* Display first page and ellipsis if not on first page */}
      {currentPage > 1 &&
        <>
          <span
            onClick={() => paginate(1)}
            className={`${currentPage === 1 ? 'font-bold' : ''} border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500`}
          >
            1
          </span>
          <span className='px-2'> ... </span>
        </>
      }

      {/* Display generated page numbers */}
      {generatePageNumbers().map(number => (
        <span
          key={number}
          onClick={() => paginate(number)}
          className={`${currentPage === number ? 'font-bold' : ''} border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500`}
        >
          {number}
        </span>
      ))}

      {/* Display ellipsis and last page if not on last page */}
      {currentPage <= totalPages - 1 &&
        <>
          <span className='px-2'> ... </span>
          <span
            onClick={() => paginate(totalPages)}
            className={`${currentPage === totalPages ? 'font-bold' : ''} border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500`}
          >
            {totalPages}
          </span>
        </>
      }

      {/* Next button */}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-r-lg border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
