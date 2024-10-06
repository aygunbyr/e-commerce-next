'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ProductsForm from './form';
import ProductsList from './list';
import ProductsPagination from './pagination';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  filterByCategory,
  filterBySearchText,
  paginateProducts,
  setFilteredProducts,
  setSelectedCategory,
  setCurrentPage,
  setSearchText,
} from '@/features/products/productsSlice';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/models/product';
import { getCategories, getProducts } from '@/services/productsApiService';

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { selectedCategory, currentPage, searchText } = useAppSelector(
    (state) => state.products,
  );

  const {
    data: products,
    error,
    isError,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const filterProducts = () => {
    if (!products || products.length === 0) return;
    dispatch(setFilteredProducts(products));
    dispatch(filterByCategory());
    dispatch(filterBySearchText());
    dispatch(paginateProducts());
  };

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchTextParam = searchParams.get('search');
    const pageParam = searchParams.get('page');
    if (categoryParam) {
      dispatch(setSelectedCategory(categoryParam));
    }
    if (searchTextParam) {
      dispatch(setSearchText(searchTextParam));
    }
    if (pageParam) {
      dispatch(setCurrentPage(Number.parseInt(pageParam)));
    }
    filterProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage !== 1) {
      params.set('page', currentPage.toString());
    }
    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    if (searchText) {
      params.set('search', searchText);
    }
    const newUrl = `${window?.location.pathname}?${params.toString()}`;
    router.replace(newUrl);
    filterProducts();
  }, [selectedCategory, currentPage, searchText, products, categories]);

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <ProductsForm />
      <ProductsList />
      <ProductsPagination />
    </>
  );
};

export default Products;
