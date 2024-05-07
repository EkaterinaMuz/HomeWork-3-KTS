import cn from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '@shared/routes';
import Bag from './bag.svg';
import Logo from './logo.svg';
import User from './user.svg';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <header className={styles.header}>
      <div>
        <Link to={ROUTES.CATALOG}>
          <Logo />
        </Link>
      </div>
      <nav className={styles.nav_wrapper}>
        <ul className={styles.nav_links}>
          <li className={cn(styles.nav_link, styles.active)}>
            <Link to={ROUTES.CATALOG}>Product</Link>
          </li>
          <li className={styles.nav_link}>
            <Link to={ROUTES.CATALOG}>Categories</Link>
          </li>
          <li className={styles.nav_link}>
            <Link to={ROUTES.CATALOG}>About us</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.header_icons}>
        <Bag />
        <User />
      </div>
    </header>
  );
};

export default Navigation;
