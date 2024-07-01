import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-end items-center mt-4 space-x-4 p-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
        aria-disabled={currentPage === 0}
        className={`inline-flex items-center justify-center rounded-md p-4 text-center font-medium text-white hover:bg-opacity-90 
          ${
            currentPage === 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-primary'
          }`}
      >
        <IoIosArrowBack size={20} />
      </button>
      <span className="text-gray-700 dark:text-white">
        Halaman {currentPage + 1} dari {totalPage}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage >= totalPage - 1}
        aria-disabled={currentPage >= totalPage - 1}
        className={`inline-flex items-center justify-center rounded-md p-4 text-center font-medium text-white hover:bg-opacity-90 
          ${
            currentPage >= totalPage - 1
              ? 'bg-slate-300    cursor-not-allowed'
              : 'bg-primary'
          }`}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
