import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setCurrentPage,
  paginateProducts,
} from '@/features/products/productsSlice';
import Button from '@/components/button';

const ProductsPagination = () => {
  const dispatch = useAppDispatch();
  const { currentPage, numberOfPages } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(paginateProducts());
  }, [currentPage]);

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
      <Button aria-label="Go to previous page" disabled={!hasPreviousPage} onClick={gotoPreviousPage}>
        &larr;
      </Button>

      {hasPreviousPage && (
        <Button aria-label={`Go to page ${currentPage -1}`} onClick={gotoPreviousPage}>{currentPage - 1}</Button>
      )}

      <Button disabled>{currentPage}</Button>

      {hasNextPage && <Button aria-label={`Go to page ${currentPage + 1}`} onClick={gotoNextPage}>{currentPage + 1}</Button>}

      <Button aria-label="Go to next page" disabled={!hasNextPage} onClick={gotoNextPage}>
        &rarr;
      </Button>
    </div>
  );
};

export default ProductsPagination;
