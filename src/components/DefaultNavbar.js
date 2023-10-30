// Import React and necessary components
import React from 'react';
import { Navbar } from 'flowbite-react';

// DefaultNavbar component
function DefaultNavbar({ searchTerm, setSearchTerm, setSortOrder }) {
  return (
    <Navbar fluid rounded className='shadow-md sticky top-0 z-50'>
      <Navbar.Brand href='#' className='gap-5'>
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Amplyfi News</span>
        <div className='relative'>
          {/* Search input */}
          <input
            type='text'
            placeholder='Search articles...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='border rounded-md h-10 w-36 md:w-56 pl-3'
          />
          {/* Clear search button */}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className='first-letter:absolute top-0 h-10 w-10 border border-black rounded-md text-center cursor-pointer hover:bg-neutral-200'
            >
              ✕
            </button>
          )}
        </div>
      </Navbar.Brand>
      <Navbar.Toggle className='text-black bg-white border border-black ring-0 h-10 w-10' />
      <Navbar.Collapse>
        {/* Sort order dropdown */}
        <select className='font-syne ml-5 rounded-md w-28' onChange={e => setSortOrder(e.target.value)}>
          <option value='newest'>Newest</option>
          <option value='oldest'>Oldest</option>
        </select>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default DefaultNavbar;
