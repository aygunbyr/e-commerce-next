'use client';

import { useEffect, useMemo, useState } from 'react';

import Card from '@/components/card';
import type { Product } from '@/types';
import { toCapitalCase } from '@/utils';

interface ProductListProps {
  products: Product[];
  categories: string[];
}

const ProductList = ({ products, categories }: ProductListProps) => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  const filteredProducts = useMemo(() => {
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

    const itemsPerPage = 5;
    const totalPagesCalculated = Math.ceil(
      filteredBySearchTerm.length / itemsPerPage,
    );
    setTotalPages(totalPagesCalculated);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredBySearchTerm.slice(startIndex, endIndex);

    return paginatedItems;
  }, [filter, products, search, currentPage]);

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
        {filteredProducts?.length === 0 && (
          <p className="my-4 w-full text-center text-xl">
            No product found matching these criteria
          </p>
        )}
        {filteredProducts?.map((product: Product) => {
          return (
            <div
              key={product.id}
              className="basis-full p-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Card product={product} />
            </div>
          );
        })}
      </section>
      <div className="mb-4 mt-1 flex items-center justify-center rounded-sm bg-zinc-900 p-2 text-lg text-zinc-100 ">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`mr-4 rounded px-3 py-0.5 ${
            currentPage === 1
              ? 'border border-zinc-300 bg-transparent'
              : 'bg-rose-700'
          }`}
        >
          &larr;
        </button>

        {currentPage - 1 >= 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="mr-4 rounded bg-rose-700 px-2 py-0.5"
          >
            {currentPage - 1}
          </button>
        )}

        <p className="mr-4 font-bold">{currentPage}</p>

        {currentPage + 1 <= totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="mr-4 rounded bg-rose-700 px-2 py-0.5"
          >
            {currentPage + 1}
          </button>
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`mr-4 rounded px-3 py-0.5 ${
            currentPage === totalPages
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
