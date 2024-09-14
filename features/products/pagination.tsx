import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCurrentPage } from '@/features/products/productsSlice';
import Button from '@/components/button';

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
    <div className="text-md mx-auto mb-4 mt-2 flex items-center justify-center gap-3 rounded-md bg-primary-light px-2 py-1">
      <Button
        disabled={!hasPreviousPage}
        onClick={gotoPreviousPage}
        className={`px-2 ${
          !hasPreviousPage &&
          'border border-primary bg-transparent text-primary xl:hover:shadow-none'
        }`}
      >
        &larr;
      </Button>

      {hasPreviousPage && (
        <Button className="px-2" onClick={gotoPreviousPage}>
          {currentPage - 1}
        </Button>
      )}

      <p className="font-bold">{currentPage}</p>

      {hasNextPage && (
        <Button className="px-2" onClick={gotoNextPage}>
          {currentPage + 1}
        </Button>
      )}

      <Button
        disabled={!hasNextPage}
        onClick={gotoNextPage}
        className={`px-2 ${
          !hasNextPage &&
          'border border-primary bg-transparent text-primary xl:hover:shadow-none'
        }`}
      >
        &rarr;
      </Button>
    </div>
  );
};

export default ProductsPagination;
