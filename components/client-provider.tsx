'use client';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import CartProvider from '@/features/cart/cart-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const ClientProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <CartProvider>
          {children}
          <ToastContainer position="top-center" theme="light" hideProgressBar />
        </CartProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default ClientProvider;
