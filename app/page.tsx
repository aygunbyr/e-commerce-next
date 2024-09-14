import { Suspense } from 'react';
import Hero from '@/components/hero';
import Loading from '@/components/loading';
import Products from '@/features/products';

export default async function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<Loading />}>
        <Products />
      </Suspense>
    </>
  );
}
