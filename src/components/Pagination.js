import { Pagination as FlowbitePagination } from 'flowbite-react';

export default function PaginationWithIcons({ currentPage, totalPages, paginate }) {

  // Handle page change
  const onPageChange = (page) => {
    paginate(page);
  };

  // Custom pagination theme
  const customTheme = {
    "base": "",
    "layout": {
      "table": {
        "base": "text-md text-neutral-700 dark:text-neutral-400",
        "span": "font-extrabold text-neutral-900 dark:text-white"
      }
    },
    "pages": {
      "base": "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      "showIcon": "inline-flex",
      "previous": {
        "base": "ml-0 rounded-l-lg border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500 enabled:hover:bg-neutral-100 enabled:hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 enabled:dark:hover:bg-neutral-700 enabled:dark:hover:text-white",
        "icon": "h-5 w-5"
      },
      "next": {
        "base": "rounded-r-lg border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500 enabled:hover:bg-neutral-100 enabled:hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 enabled:dark:hover:bg-neutral-700 enabled:dark:hover:text-white",
        "icon": "h-5 w-5"
      },
      "selector": {
        "base": "w-8 md:w-12 border border-neutral-300 bg-white py-2 leading-tight text-neutral-500 enabled:hover:bg-neutral-100 enabled:hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 enabled:dark:hover:bg-neutral-700 enabled:dark:hover:text-white",
        "active": "bg-neutral-100 text-neutral-600 font-bold hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white",
        "disabled": "opacity-50 cursor-normal"
      }
    }
  };

  return (
      <FlowbitePagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        showIcons
        totalPages={totalPages}
        theme={customTheme}
        className='mt-5 md:mt-10 mx-5'
      />
  );
}
