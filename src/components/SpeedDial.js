import React, { useState, useRef } from 'react';

export default function SpeedDial({ url, title, summary }) {
    // State variables to manage hover and tooltip visibility
    const [isHovered, setIsHovered] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    // Ref to track the speed dial container
    const speedDialRef = useRef(null);

    // Handle mouse out event to hide the tooltip
    const handleMouseOut = (e) => {
        if (!speedDialRef.current.contains(e.relatedTarget)) {
            setIsHovered(false);
        }
    };

    // Function to handle sharing action
    const handleShare = () => {
        const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        window.open(linkedInUrl, '_blank');
    };

    // Function to handle printing action
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<html><head><title>${title}</title></head><body><h1>${title}</h1><p>${summary}</p></body></html>`);
        printWindow.document.close();
        printWindow.print();
    };

    // Function to handle downloading action
    const handleDownload = () => {
        const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${title}.txt`;
        a.click();
    };

    // Function to handle copying action
    const handleCopy = () => {
        navigator.clipboard.writeText(url)
            .then(() => {
                console.log('Text successfully copied');
                // Show the "Copied!" tooltip
                setShowTooltip(true);
                // Hide the "Copied!" tooltip after 3 seconds
                setTimeout(() => setShowTooltip(false), 3000);
            })
            .catch((err) => {
                console.log('Failed to copy text: ', err);
            });
    };
  
    return (
      <div ref={speedDialRef} onMouseOver={() => setIsHovered(true)} onMouseOut={handleMouseOut} className="flex group">
        {/* Button to open the actions menu */}
        <button 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center justify-center ml-auto text-neutral-500 bg-white border border-neutral-500 rounded-full w-8 h-8 hover:bg-neutral-900 hover:text-white mr-2 transition duration-300"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
          </svg>
          <span className="sr-only">Open actions menu</span>
        </button>
    
        {/* Actions menu */}
        <div 
          id="speed-dial-menu-horizontal" 
          className={`flex items-center ${isHovered ? 'block' : 'hidden'} mr-4 space-x-2 transition duration-500`}
        >
          {/* Share button */}
          <button 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}            
            onClick={handleShare} 
            type="button" 
            data-tooltip-target="tooltip-share" 
            data-tooltip-placement="top" 
            className="flex justify-center items-center w-8 h-8 text-neutral-500 hover:text-neutral-900 bg-white rounded-full border border-neutral-200 dark:border-neutral-600 shadow-sm "
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z"/>
            </svg>
            <span className="sr-only">Share</span>
          </button>
          
          {/* Share tooltip */}
          <div id="tooltip-share" role="tooltip" className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-neutral-900 rounded-lg shadow-sm opacity-0 tooltip dark-bg-neutral-700">
            Share
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          
          {/* Print button */}
          <button onClick={handlePrint} type="button" data-tooltip-target="tooltip-print" data-tooltip-placement="top" className="flex justify-center items-center w-8 h-8 text-neutral-500 hover:text-neutral-900 bg-white rounded-full border border-neutral-200 dark:border-neutral-600 shadow-sm ">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"/>
              <path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"/>
            </svg>
            <span className="sr-only">Print</span>
          </button>
          
          {/* Print tooltip */}
          <div id="tooltip-print" role="tooltip" className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-neutral-900 rounded-lg shadow-sm opacity-0 tooltip dark-bg-neutral-700">
            Print
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          
          {/* Download button */}
          <button onClick={handleDownload} type="button" data-tooltip-target="tooltip-download" data-tooltip-placement="top" className="flex justify-center items-center w-8 h-8 text-neutral-500 hover:text-neutral-900 bg-white rounded-full border border-neutral-200 dark:border-neutral-600 shadow-sm">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Download</span>
          </button>
          
          {/* Download tooltip */}
          <div id="tooltip-download" role="tooltip" className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-neutral-900 rounded-lg shadow-sm opacity-0 tooltip dark-bg-neutral-700">
            Download
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          
          {/* Copy button and tooltip */}
          <div className="relative inline-block">
            <div 
              id="tooltip-copy"
              role="tooltip"
              className={`absolute z-10 inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-neutral-900 rounded-lg shadow-sm ${showTooltip ? 'opacity-100' : 'opacity-0'} tooltip dark-bg-neutral-700`}
              style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)' }}
            >
              Copied!
              <div className="tooltip" data-popper></div>
            </div>
    
            <button 
              onClick={handleCopy} 
              type="button" 
              data-tooltip-target="tooltip-copy" 
              data-tooltip-placement="top" 
              className="flex justify-center items-center w-8 h-8 text-neutral-500 hover:text-neutral-900 bg-white rounded-full border border-neutral-200 dark:border-neutral-600 shadow-sm"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"/>
                <path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
    
}
