import React, { createContext, ReactNode, useContext } from 'react';
import CartStore from '@entities/cart/models/store';
import useLocalStore from '@shared/libs/hooks/useLocalStore';
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

  const value: StoreValue = {
    productStore,
    shoppingCartStore
  }

  return <context.Provider value={value}>{children}</context.Provider>;
};
