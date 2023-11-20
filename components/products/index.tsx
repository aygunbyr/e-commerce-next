'use client';

import { useEffect, useMemo, useState } from 'react';

import type { Product } from '@/types';
import usePagination from '@/hooks/usePagination';
import ProductsForm from './form';
import ProductsList from './list';
import ProductsPagination from './pagination';

interface ProductsProps {
  products: Product[];
  categories: string[];
}

const ITEMS_PER_PAGE = 5;

const Products = ({ products, categories }: ProductsProps) => {
  const [filter, setFilter] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<string>('loading');
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);

  const filteredProducts = useMemo<Product[]>(() => {
    if (!products) return [];
    const filteredByCategory =
      filter === 'all'
        ? products
        : products.filter((item: Product) => item.category === filter);

    const searchLowerCase = searchText.toLowerCase();

    const filteredBySearchTerm = searchText
      ? filteredByCategory.filter(
          (item: Product) =>
            item.title.toLowerCase().includes(searchLowerCase) ||
            item.description.toLowerCase().includes(searchLowerCase),
        )
      : filteredByCategory;

    return filteredBySearchTerm;
  }, [filter, products, searchText]);

  const {
    currentPage,
    numberofPages,
    gotoPreviousPage,
    gotoNextPage,
    gotoFirstPage,
    hasPreviousPage,
    hasNextPage,
    startIndex,
    endIndex,
  } = usePagination(filteredProducts.length, ITEMS_PER_PAGE);

  useEffect(() => {
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, startIndex, endIndex]);

  useEffect(() => {
    gotoFirstPage();
  }, [filter, searchText, gotoFirstPage]);

  useEffect(() => {
    const loadingInterval = setTimeout(() => {
      setIsLoading('not-loading');
    }, 1000);

    () => clearInterval(loadingInterval);
  }, []);

  return (
    <>
      <ProductsForm
        categories={categories}
        filter={filter}
        setFilter={setFilter}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <ProductsList
        isLoading={isLoading}
        paginatedProducts={paginatedProducts}
      />
      <ProductsPagination
        currentPage={currentPage}
        numberofPages={numberofPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        gotoPreviousPage={gotoPreviousPage}
        gotoNextPage={gotoNextPage}
      />
    </>
  );
};

export default Products;
