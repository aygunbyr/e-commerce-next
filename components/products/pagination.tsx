import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCurrentPage } from '@/redux/productsSlice';

const ProductsPagination = () => {
  const dispatch = useAppDispatch();
  const { currentPage, numberOfPages } = useAppSelector(
    (state) => state.products,
  );

  const hasPreviousPage = useMemo<boolean>(
    () => currentPage > 1,
    [currentPage],
  );

  const hasNextPage = useMemo<boolean>(
    () => currentPage < numberOfPages,
    [currentPage, numberOfPages],
  );

  const gotoPreviousPage = () => {
    if (hasPreviousPage) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const gotoNextPage = () => {
    if (hasNextPage) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <div className="mb-4 mt-1 flex items-center justify-center rounded-sm bg-primary-light p-2 text-lg text-primary-dark">
      <button
        disabled={!hasPreviousPage}
        onClick={gotoPreviousPage}
        className={`mr-4 rounded px-3 py-0.5 ${
          !hasPreviousPage
            ? 'border border-primary bg-transparent'
            : 'bg-primary-dark text-primary-light'
        }`}
      >
        &larr;
      </button>

      {hasPreviousPage && (
        <button
          onClick={gotoPreviousPage}
          className="mr-4 rounded bg-primary-dark px-2 py-0.5 text-primary-light"
        >
          {currentPage - 1}
        </button>
      )}

      <p className="mr-4 font-bold">{currentPage}</p>

      {hasNextPage && (
        <button
          onClick={gotoNextPage}
          className="mr-4 rounded bg-primary-dark px-2 py-0.5 text-primary-light"
        >
          {currentPage + 1}
        </button>
      )}

      <button
        disabled={!hasNextPage}
        onClick={gotoNextPage}
        className={`mr-4 rounded px-3 py-0.5 ${
          !hasNextPage
            ? 'border border-primary bg-transparent'
            : 'bg-primary-dark text-primary-light'
        }`}
      >
        &rarr;
      </button>
    </div>
  );
};

export default ProductsPagination;
