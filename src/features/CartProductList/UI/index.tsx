import * as React from 'react'
import { useProductStore } from '@entities/products/models/store/context';
import CartItem from '@shared/UI/CartItem/CartItem';

const CartProductList = () => {
  const { shoppingCartStore } = useProductStore();

  return (
    <>
      {
        shoppingCartStore.cartItems.map(cartItem => {
          return (
            <CartItem product={cartItem} key={cartItem.id} />
          )
        })
      }
    </>
  )
}
export default CartProductList;
