import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Text from '@/shared/ui/Text';
import { useProductStore } from '@entities/products/models/store/context';
import ROUTES from '@shared/routes';
import Bag from './bag.svg';
import Logo from './logo.svg';
import User from './user.svg';
import s from './Navigation.module.scss';

const Navigation = () => {
  const { shoppingCartStore } = useProductStore();
  return (
    <header className={s.header}>
      <div>
        <Link to={ROUTES.CATALOG}>
          <Logo />
        </Link>
      </div>
      <nav className={s.nav_wrapper}>
        <ul className={s.nav_links}>
          <li className={cn(s.nav_link, s.active)}>
            <Link to={ROUTES.CATALOG}>Product</Link>
          </li>
          <li className={s.nav_link}>
            <Link to={ROUTES.CATALOG}>Categories</Link>
          </li>
          <li className={s.nav_link}>
            <Link to={ROUTES.CATALOG}>About us</Link>
          </li>
        </ul>
      </nav>
      <div className={s.header_icons}>
        <div className={s.cart_wrapper}>
          <Link to={ROUTES.CART}>
            <Bag />
          </Link>
          {shoppingCartStore.cartItems.length > 0 && (
            <Text view="p-14" className={s.cart_number}>
              {shoppingCartStore.cartItems.length}
            </Text>
          )}
        </div>
        <User />
      </div>
    </header>
  );
};

export default observer(Navigation);
