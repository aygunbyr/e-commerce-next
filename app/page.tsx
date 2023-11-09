import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Card from '@/components/Card';
import ProductList from '@/components/ProductList';
import Slider from '@/components/Slider';
import { fetchCategories, fetchProducts } from '@/services';
import { toCapitalCase } from '@/utils';

export default function Home() {
  return (
    <>
      <Slider />
      <ProductList />
    </>
  );
}
