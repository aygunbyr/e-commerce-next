'use client';

import { useEffect, useMemo, useState } from 'react';

import Card from '@/components/card';
import type { Product } from '@/types';
import { toCapitalCase } from '@/utils';
import usePagination from '@/hooks/usePagination';

interface ProductListProps {
  products: Product[];
  categories: string[];
}

const ITEMS_PER_PAGE = 5;

const ProductList = ({ products, categories }: ProductListProps) => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    setIsLoading(true);
    if (!products) return [];
    const filteredByCategory =
      filter === 'all'
        ? products
        : products.filter((item: Product) => item.category === filter);

    const searchLowerCase = search.toLowerCase();

    const filteredBySearchTerm = search
      ? filteredByCategory.filter(
          (item: Product) =>
            item.title.toLowerCase().includes(searchLowerCase) ||
            item.description.toLowerCase().includes(searchLowerCase),
        )
      : filteredByCategory;

    setIsLoading(false);

    return filteredBySearchTerm;
  }, [filter, products, search]);

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

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, startIndex, endIndex]);

  useEffect(() => {
    gotoFirstPage();
  }, [filter, search, gotoFirstPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        id="filter-form"
        className="mt-1 flex flex-col items-center justify-between gap-4 rounded-sm bg-zinc-900 p-2 text-lg text-zinc-100 sm:flex-row sm:gap-0"
        onSubmit={handleSubmit}
      >
        <div className="inline-flex items-center gap-2 self-start">
          <label htmlFor="filter-select" className="w-20 min-w-fit">
            Filter by:
          </label>
          <select
            className="p-1 text-zinc-900 focus:outline-none"
            id="filter-select"
            name="filter"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All Categories</option>?
            {categories?.map((category: string, index: number) => (
              <option key={index} value={category}>
                {toCapitalCase(category)}
              </option>
            ))}
          </select>
        </div>
        <div className="inline-flex items-center gap-2 self-start">
          <label htmlFor="search" className="w-20 min-w-fit sm:hidden">
            Search:
          </label>
          <input
            className="max-w-fit px-1 py-0.5 text-zinc-900 placeholder:text-zinc-500 focus:outline-none"
            id="search"
            name="search"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </form>
      <section id="products" className="flex flex-wrap">
        {paginatedProducts?.length > 0 ? (
          paginatedProducts?.map((product: Product) => {
            return (
              <div
                key={product.id}
                className="basis-full p-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Card product={product} />
              </div>
            );
          })
        ) : (
          <p className="my-4 w-full text-center text-xl">
            No product found matching these criteria
          </p>
        )}
      </section>
      <div className="mb-4 mt-1 flex items-center justify-center rounded-sm bg-zinc-900 p-2 text-lg text-zinc-100 ">
        <button
          disabled={!hasPreviousPage}
          onClick={() => gotoPreviousPage()}
          className={`mr-4 rounded px-3 py-0.5 ${
            !hasPreviousPage
              ? 'border border-zinc-300 bg-transparent'
              : 'bg-rose-700'
          }`}
        >
          &larr;
        </button>

        {currentPage - 1 >= 1 && (
          <button
            onClick={() => gotoPreviousPage()}
            className="mr-4 rounded bg-rose-700 px-2 py-0.5"
          >
            {currentPage - 1}
          </button>
        )}

        <p className="mr-4 font-bold">{currentPage}</p>

        {currentPage + 1 <= numberofPages && (
          <button
            onClick={() => gotoNextPage()}
            className="mr-4 rounded bg-rose-700 px-2 py-0.5"
          >
            {currentPage + 1}
          </button>
        )}

        <button
          disabled={!hasNextPage}
          onClick={() => gotoNextPage()}
          className={`mr-4 rounded px-3 py-0.5 ${
            !hasNextPage
              ? 'border border-zinc-300 bg-transparent'
              : 'bg-rose-700'
          }`}
        >
          &rarr;
        </button>
      </div>
    </>
  );
};

export default ProductList;
