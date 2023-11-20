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
    <div className="mb-4 mt-1 flex items-center justify-center rounded-sm bg-zinc-900 p-2 text-lg text-zinc-100 ">
      <button
        disabled={!hasPreviousPage}
        onClick={() => gotoPreviousPage()}
        className={`mr-4 rounded px-3 py-0.5 ${
          !hasPreviousPage
            ? 'border border-zinc-300 bg-transparent'
            : 'bg-rose-700'
        }`}
      >
        &larr;
      </button>

      {currentPage - 1 >= 1 && (
        <button
          onClick={() => gotoPreviousPage()}
          className="mr-4 rounded bg-rose-700 px-2 py-0.5"
        >
          {currentPage - 1}
        </button>
      )}

      <p className="mr-4 font-bold">{currentPage}</p>

      {currentPage + 1 <= numberofPages && (
        <button
          onClick={() => gotoNextPage()}
          className="mr-4 rounded bg-rose-700 px-2 py-0.5"
        >
          {currentPage + 1}
        </button>
      )}

      <button
        disabled={!hasNextPage}
        onClick={() => gotoNextPage()}
        className={`mr-4 rounded px-3 py-0.5 ${
          !hasNextPage ? 'border border-zinc-300 bg-transparent' : 'bg-rose-700'
        }`}
      >
        &rarr;
      </button>
    </div>
  );
};

export default ProductsPagination;
