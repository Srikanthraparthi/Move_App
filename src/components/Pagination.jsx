import React from 'react';

function Pagination({ currentPage, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-5">
      <button 
        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <span className="mx-2 px-4 py-2 bg-gray-200 rounded">
        Page {currentPage}
      </span>
      <button 
        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleNext}
      >
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
