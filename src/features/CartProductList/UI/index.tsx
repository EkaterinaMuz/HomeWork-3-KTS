import { observer } from 'mobx-react-lite';
import * as React from 'react'
import CartItem from '@/shared/ui/CartItem/CartItem';
import Text from '@/shared/ui/Text';
import { useProductStore } from '@entities/products/models/store/context';
import s from './CartProductList.module.scss';

const CartProductList = () => {
  const { shoppingCartStore } = useProductStore();

  return (
    <>
      <div className={s.cart__header}>
        <div className={s.cart_header__right}>
          <Text weight='bold'>PRODUCT</Text>
        </div>
        <div className={s.cart_header__left}>
          <Text weight='bold'>PRICE</Text>
          <Text weight='bold'>QTY</Text>
          <Text weight='bold'>TOTAL PRICE</Text>
        </div>
      </div>
      <section className={s.cart__list}>
        {
          shoppingCartStore.cartItems.map(cartItem => {
            return (
              <CartItem product={cartItem} key={cartItem.id} />
            )
          })
        }
      </section>
      <div className={s.cart__bottom}>
        <div className={s.cart__bottom_total}>
          <Text weight='bold' view='p-20'>TOTAL:</Text>
          <Text weight='bold' view='p-20'>${shoppingCartStore.totalAmount}</Text>
        </div>
      </div>
    </>
  )
}
export default observer(CartProductList);
