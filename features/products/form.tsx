'use client';
import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { MdFilterListOff } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setSelectedCategory,
  setSearchText,
} from '@/features/products/productsSlice';
import { toCapitalCase } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/productsApi';
import Button from '@/components/button';

const ProductsForm = () => {
  const [searchBarText, setSearchBarText] = useState<string>('');
  const { selectedCategory, searchText } = useAppSelector(
    (state) => state.products,
  );

  const {
    data: categories,
    error,
    isError,
  } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  function handleSearchTextSubmit() {
    dispatch(setSearchText(searchBarText));
  }

  function clearSearchText() {
    setSearchBarText('');
    dispatch(setSearchText(''));
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <form
      id="filter-form"
      className="mt-1 flex flex-col items-center justify-between gap-3 rounded-md bg-primary-light px-2 py-1 text-lg sm:flex-row sm:gap-0"
      onSubmit={handleSubmit}
    >
      <div className="inline-flex items-center gap-2 self-start">
        <label htmlFor="filter-select" className="sr-only">
          Filter by:
        </label>
        <ShoppingBagIcon aria-hidden="true" width={20} />
        <select
          className="rounded-sm border border-transparent px-1 py-0.5 focus:outline-none"
          id="filter-select"
          name="filter"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch(setSelectedCategory(event.target.value))
          }
          value={selectedCategory}
        >
          <option value="all">All Products</option>?
          {categories?.map((category: string, index: number) => (
            <option key={index} value={category}>
              {toCapitalCase(category)}
            </option>
          ))}
        </select>
      </div>

      <div className="inline-flex items-center gap-2 self-start">
        <label htmlFor="search" className="sr-only">
          Search:
        </label>
        <span></span>
        <input
          className="rounded-sm border border-transparent bg-white px-1 focus:outline-none"
          id="search"
          name="search"
          type="text"
          placeholder="Search..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchBarText(event.target.value)
          }
          value={searchBarText}
        />
        <Button type="submit" onClick={handleSearchTextSubmit}>
          <MagnifyingGlassIcon aria-hidden="true" width={20} />
        </Button>
        <Button
          className="bg-red-500"
          disabled={searchText === ''}
          onClick={clearSearchText}
        >
          <MdFilterListOff aria-hidden="true" width={20} />
        </Button>
      </div>
    </form>
  );
};

export default ProductsForm;
