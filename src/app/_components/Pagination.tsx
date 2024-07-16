import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const goToFirstPage = () => handlePageChange(1);
    const goToLastPage = () => handlePageChange(totalPages);
    const goToPreviousPage = () => handlePageChange(currentPage - 1);
    const goToNextPage = () => handlePageChange(currentPage + 1);

    return (
        <div className="gap-3 flex select-none">
            <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
            >
                {'<<'}
            </button>
            <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
            >
                {'<'}
            </button>
            {/* Page Numbers */}
            <div>
                {Array.from({length: Math.min(5, totalPages)}, (_, index) => {
                    const page = Math.max(1, currentPage - 2) + index;
                    if (page <= totalPages) {
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={page === currentPage ? 'font-semibold text-xl' : 'text-light-gray-text' + " " + 'px-3'}
                            >
                                {page}
                            </button>
                        );
                    }
                    return null;
                })}
            </div>
            <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
            >
                {'>'}
            </button>
            <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
            >
                {'>>'}
            </button>
        </div>
    );
};

export default Pagination;
