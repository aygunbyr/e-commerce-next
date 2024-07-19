interface ProductsPaginationProps {
  currentPage: number;
  numberofPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  gotoPreviousPage: () => void;
  gotoNextPage: () => void;
}

const ProductsPagination = ({
  currentPage,
  numberofPages,
  hasPreviousPage,
  hasNextPage,
  gotoPreviousPage,
  gotoNextPage,
}: ProductsPaginationProps) => {
  return (
    <div className="bg-primary-light text-primary-dark mb-4 mt-1 flex items-center justify-center rounded-sm p-2 text-lg">
      <button
        disabled={!hasPreviousPage}
        onClick={() => gotoPreviousPage()}
        className={`mr-4 rounded px-3 py-0.5 ${
          !hasPreviousPage
            ? 'border-primary border bg-transparent'
            : 'text-primary-light bg-primary-dark'
        }`}
      >
        &larr;
      </button>

      {currentPage - 1 >= 1 && (
        <button
          onClick={() => gotoPreviousPage()}
          className="text-primary-light bg-primary-dark mr-4 rounded px-2 py-0.5"
        >
          {currentPage - 1}
        </button>
      )}

      <p className="mr-4 font-bold">{currentPage}</p>

      {currentPage + 1 <= numberofPages && (
        <button
          onClick={() => gotoNextPage()}
          className="text-primary-light bg-primary-dark mr-4 rounded px-2 py-0.5"
        >
          {currentPage + 1}
        </button>
      )}

      <button
        disabled={!hasNextPage}
        onClick={() => gotoNextPage()}
        className={`mr-4 rounded px-3 py-0.5 ${
          !hasNextPage
            ? 'border-primary border bg-transparent'
            : 'text-primary-light bg-primary-dark'
        }`}
      >
        &rarr;
      </button>
    </div>
  );
};

export default ProductsPagination;
