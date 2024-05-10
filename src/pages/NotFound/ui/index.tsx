import * as React from 'react';
import Navigation from '@/widgets/Navigation/ui';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <>
      <Navigation />
      <div className="container">
        <h1 className={styles.title}>Error 404</h1>
      </div>
    </>
  );
};

export default NotFound;
