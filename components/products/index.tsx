'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ProductsForm from './form';
import ProductsList from './list';
import ProductsPagination from './pagination';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  filterProducts,
  getCategories,
  getProducts,
  setCategory,
  setCurrentPage,
  setSearchText,
} from '@/redux/productsSlice';

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { category, currentPage, numberOfPages, searchText } = useAppSelector(
    (state) => state.products,
  );

  const getFilteredProducts = async () => {
    await dispatch(getCategories());
    await dispatch(getProducts());
    dispatch(filterProducts());
  };

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      dispatch(setCategory(categoryParam));
    }

    const searchTextParam = searchParams.get('search');
    if (searchTextParam) {
      dispatch(setSearchText(searchTextParam));
    }

    const pageParam = searchParams.get('page');
    if (pageParam) {
      dispatch(setCurrentPage(parseInt(pageParam)));
    }

    getFilteredProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'all') {
      params.set('category', category);
    }
    if (searchText) {
      params.set('search', searchText);
    }
    params.set('page', currentPage.toString());

    const newUrl = `${window?.location.pathname}?${params.toString()}`;
    router.replace(newUrl);

    dispatch(filterProducts());
  }, [category, currentPage, searchText, numberOfPages]);

  return (
    <>
      <ProductsForm />
      <ProductsList />
      <ProductsPagination />
    </>
  );
};

export default Products;
