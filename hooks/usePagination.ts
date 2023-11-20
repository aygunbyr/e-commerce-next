import { useCallback, useEffect, useMemo, useState } from 'react';

const usePagination = (itemCount: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberofPages, setNumberofPages] = useState<number>(1);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(0);
  const hasPreviousPage = useMemo<boolean>(
    () => currentPage > 1,
    [currentPage],
  );
  const hasNextPage = useMemo<boolean>(
    () => currentPage < numberofPages,
    [currentPage, numberofPages],
  );

  useEffect(() => {
    const numberofPagesCalculated = Math.ceil(itemCount / itemsPerPage);
    setNumberofPages(numberofPagesCalculated);

    const startIndexCalculated = (currentPage - 1) * itemsPerPage;
    setStartIndex(startIndexCalculated);
    setEndIndex(startIndexCalculated + itemsPerPage);
  }, [itemCount, itemsPerPage, currentPage]);

  const gotoPreviousPage = () =>
    hasPreviousPage ? setCurrentPage((previous) => previous - 1) : null;

  const gotoNextPage = () =>
    hasNextPage ? setCurrentPage((previous) => previous + 1) : null;

  const gotoFirstPage = useCallback(() => setCurrentPage(1), []);

  return {
    currentPage,
    numberofPages,
    gotoPreviousPage,
    gotoNextPage,
    gotoFirstPage,
    hasPreviousPage,
    hasNextPage,
    startIndex,
    endIndex,
  };
};

export default usePagination;
