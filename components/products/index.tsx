'use client';

import { useEffect } from 'react';
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

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchTextParam = searchParams.get('search');
    const pageParam = searchParams.get('page');
    if (categoryParam) {
      dispatch(setCategory(categoryParam));
    }
    if (searchTextParam) {
      dispatch(setSearchText(searchTextParam));
    }
    if (pageParam) {
      dispatch(setCurrentPage(parseInt(pageParam)));
    }
    const getFilteredProducts = async () => {
      await dispatch(getCategories());
      await dispatch(getProducts());
      dispatch(filterProducts());
    };
    getFilteredProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage !== 1) {
      params.set('page', currentPage.toString());
    }
    if (category !== 'all') {
      params.set('category', category);
    }
    if (searchText) {
      params.set('search', searchText);
    }
    const newUrl = `${window?.location.pathname}?${params.toString()}`;
    router.replace(newUrl);
    dispatch(filterProducts());
  }, [category, currentPage, searchText]);

  return (
    <>
      <ProductsForm />
      <ProductsList />
      <ProductsPagination />
    </>
  );
};

export default Products;
