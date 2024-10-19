const TOTAL_NUMBERS_SHOW = 5;
const TOTAL_BLOCKS = TOTAL_NUMBERS_SHOW + 2;

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPaginationRange = () => {
    if (totalPages <= TOTAL_BLOCKS) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    const pages = [];

    if (startPage > 2) {
      pages.push("...");
    }

    pages.push(
      ...Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      )
    );

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    return [1, ...pages, totalPages];
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {paginationRange.map((page, index) => {
        if (page === "...") {
          return (
            <span key={index} className="pagination-dots">
              ...
            </span>
          );
        }

        return (
          <button
            key={index}
            className={page === currentPage ? "active" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
