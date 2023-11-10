// Import React and necessary components from 'flowbite-react'
import React from 'react';
import { Navbar } from 'flowbite-react';

// Define the DefaultNavbar component
// Props: searchTerm, setSearchTerm, setSortOrder, selectedTag, resetTag
function DefaultNavbar({ searchTerm, setSearchTerm, setSortOrder, selectedTag, resetTag }) {

  return (
    // Navbar component from 'flowbite-react' with styling
    <Navbar fluid rounded className='shadow-md sticky top-0 z-50'>
      <Navbar.Brand href='#' className='gap-5'>
        {/* Brand Name */}
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Amplyfi News</span>

        <div className='relative'>
          {/* Search input field */}
          <input
            type='text'
            placeholder='Search articles...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='border rounded-md h-10 w-36 md:w-56 pl-3'
          />
          {/* Clear search button; appears only when searchTerm is non-empty */}
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
      
      {/* Navbar Toggle button */}
      <Navbar.Toggle className='text-black bg-white border border-black ring-0 h-10 w-10' />

      <Navbar.Collapse className='ml-3'>
        {/* Display selectedTag or "All Tags" */}
        <span className='self-start text-xs bg-blue-200 shadow-lg hover:bg-blue-100 hover:shadow-none transition duration-300 ease-in-out p-1 m-0.5 rounded inline-flex my-auto'>
          {selectedTag ? ` ${selectedTag}` : 'All Tags'}
          {/* Button to reset the selected tag */}
          {selectedTag && (
            <button onClick={resetTag}  className='text-center cursor-pointer hover:text-red-700 mx-1'>
              ✕
            </button>
          )}
        </span>
        {/* Sort Order Dropdown */}
        <select className='self-start font-syne rounded-md w-28 mt-3 md:mt-0' onChange={e => setSortOrder(e.target.value)}>
          <option value='newest'>Newest</option>
          <option value='oldest'>Oldest</option>
        </select>
      </Navbar.Collapse>
    </Navbar>
  );
}

// Export the DefaultNavbar component
export default DefaultNavbar;
