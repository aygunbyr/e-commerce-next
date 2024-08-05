'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import type { Product } from '@/types';
import ProductsForm from './form';
import ProductsList from './list';
import ProductsPagination from './pagination';

interface ProductsProps {
  products: Product[];
  categories: string[];
}

const ITEMS_PER_PAGE = 10;

const Products = ({ products, categories }: ProductsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentCategory, setCurrentCategory] = useState<string>(searchParams.get('category') || "all");
  const [searchText, setSearchText] = useState<string>(searchParams.get("search") || "");
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  const paginatedProducts = useMemo(() => {
    if(!products) {
      return []
    }
    const filteredByCategory =  currentCategory === "all" ? products : products.filter(product => product.category === currentCategory);
    const filteredBySearchText = !searchText ? filteredByCategory : filteredByCategory.filter(({title}) => title.toLowerCase().includes(searchText.toLowerCase()));
    const numberOfPagesCalculated = Math.ceil(filteredBySearchText.length / ITEMS_PER_PAGE);
    setNumberOfPages(numberOfPagesCalculated);
    const startIndex = (currentPage-1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredBySearchText.length);
    const filteredByPageNumber = numberOfPages === 1 ? filteredBySearchText : filteredBySearchText.slice(startIndex, endIndex);
    return filteredByPageNumber
  }, [products, currentCategory, searchText, currentPage, numberOfPages]);

  const hasPreviousPage = useMemo<boolean>(
    () => currentPage > 1,
    [currentPage],
  );

  const hasNextPage = useMemo<boolean>(
    () => currentPage < numberOfPages,
    [currentPage, numberOfPages],
  );

  const gotoPreviousPage = () => {
    if(hasPreviousPage) {
      setCurrentPage((page) => page - 1);
    }
  }

  const gotoNextPage = () => {
    if(hasNextPage) {
      setCurrentPage((page) => page + 1);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams();
    if (currentCategory !== 'all') {
      params.set('category', currentCategory);
    }
    if(searchText) {
      params.set("search", searchText);
    }
    if(currentPage > numberOfPages) {
      setCurrentPage(1);
    }
    params.set("page", currentPage.toString());

    const newUrl = `${window?.location.pathname}?${params.toString()}`;
    router.replace(newUrl);
  }, [currentCategory, currentPage, searchText, numberOfPages, router]);

  return (
    <>
      <ProductsForm
        categories={categories}
        filter={currentCategory}
        setFilter={setCurrentCategory}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <ProductsList paginatedProducts={paginatedProducts} />
      <ProductsPagination
        currentPage={currentPage}
        numberofPages={numberOfPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        gotoPreviousPage={gotoPreviousPage}
        gotoNextPage={gotoNextPage}
      />
    </>
  );
};

export default Products;
