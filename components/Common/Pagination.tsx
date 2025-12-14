type TPaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (item: number) => void;
    dataLength: number;
    dataPerPage: number;
  };
  
  const Pagination = ({ totalPages, currentPage, onPageChange, dataLength, dataPerPage }: TPaginationProps) => {
    
    const startEntry = (currentPage - 1) * dataPerPage + 1;
    const endEntry = Math.min(currentPage * dataPerPage, dataLength);
  
    const getPaginationRange = () => {
      const range = [];
      const showPagesAround = 2;
  
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          range.push(i);
        }
      } else {
        range.push(1);
  
        if (currentPage > showPagesAround + 2) {
          range.push('...');
        }
  
        for (let i = Math.max(2, currentPage - showPagesAround); i <= Math.min(totalPages - 1, currentPage + showPagesAround); i++) {
          range.push(i);
        }
  
        if (currentPage < totalPages - showPagesAround - 1) {
          range.push('...');
        }
  
        range.push(totalPages);
      }
  
      return range;
    };
  
    const paginationRange = getPaginationRange();
  
    return (
      <div className="pagination-wrapper">
        
        <ul className="pagination-box d-flex align-items-center">
          <li
            className={`nav prev ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            Previous
          </li>
  
          {paginationRange.map((page, index) => (
            <li
              key={index}
              className={`nav page-item ${page === currentPage ? 'active' : ''}`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
            >
              {typeof page === 'number' ? page : '...'}
            </li>
          ))}
  
          <li
            className={`nav next ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          >
            Next
          </li>
        </ul>
  
        <div className="ms-auto text-box">
          <p className="fw-medium text-sm text-slate-700">
            Showing {startEntry} to {endEntry} out of {dataLength} entries
          </p>
        </div>

      </div>
    );
  };
  
  export default Pagination;
  