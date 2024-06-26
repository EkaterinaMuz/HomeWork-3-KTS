import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import useLocalStore from '@/shared/lib/hooks/useLocalStore';
import CartStore from '@entities/cart/models/store';
import ProductsStore from './ProductsStore';

const context = createContext<StoreValue | null>(null);

type Props = {
  children: ReactNode;
};
interface StoreValue {
  productStore: ProductsStore;
  shoppingCartStore: CartStore;
}

export const useProductStore = () => {
  const store = useContext(context);
  if (!store) {
    throw new Error('Product Store is not found!');
  }
  return store;
};

export const ProductStoreProvider = ({ children }: Props) => {
  const productStore = useLocalStore(() => new ProductsStore());
  const shoppingCartStore = useLocalStore(() => new CartStore());

  const value = useMemo(
    () => ({
      productStore,
      shoppingCartStore,
    }),
    [productStore, shoppingCartStore],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};
