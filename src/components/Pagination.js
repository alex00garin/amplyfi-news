import React from 'react';

function Pagination({ currentPage, totalPages, paginate }) {
  function generatePageNumbers() {
    const pageNumbers = [];
  
    if (currentPage <= 2) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage >= totalPages - 1) {
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
    }
  
    return pageNumbers;
  }
  
  

  return (
    <div className="mt-3 md:mt-5 ld:mt-12 text-sm md:text-lg lg:text-xl inline-flex items-center -space-x-px cursor-pointer font-syne">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="ml-0 rounded-l-lg border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500"
      >
        Previous
      </button>

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

      {generatePageNumbers().map(number => (
        <span
          key={number}
          onClick={() => paginate(number)}
          className={`${currentPage === number ? 'font-bold' : ''} border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500`}
        >
          {number}
        </span>
      ))}

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
