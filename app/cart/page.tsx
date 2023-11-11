import CartContainer from '@/components/cart-container';
import ClientProvider from '@/components/client-provider';

const CartPage = () => {
  return (
    <ClientProvider>
      <CartContainer />
    </ClientProvider>
  );
};

export default CartPage;
