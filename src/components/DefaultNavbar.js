// Import React and necessary components
import React from 'react';
import { Navbar } from 'flowbite-react';

// DefaultNavbar component
function DefaultNavbar({ searchTerm, setSearchTerm, setSortOrder, selectedTag, resetTag }) {

  return (
    <Navbar fluid rounded className='shadow-md sticky top-0 z-50'>
      <Navbar.Brand href='' className='gap-5'>
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

      <Navbar.Collapse className='ml-3'>
        {/* Sort order dropdown */}
        <span className='self-start text-xs bg-blue-200 p-1 m-0.5 rounded inline-flex '>
          {selectedTag ? ` ${selectedTag}` : 'All Tags'}
          {selectedTag && (
            <button onClick={resetTag}  className='text-center cursor-pointer hover:text-red-700 mx-1'>
              ✕
            </button>
          )}
        </span>
        <select className='self-start font-syne rounded-md w-28 mt-3 md:mt-0' onChange={e => setSortOrder(e.target.value)}>
          <option value='newest'>Newest</option>
          <option value='oldest'>Oldest</option>
        </select>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default DefaultNavbar;
