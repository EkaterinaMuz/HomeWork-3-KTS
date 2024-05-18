import * as React from 'react';
import Navigation from '@/widgets/Navigation/UI';
import s from './NotFound.module.scss';

const NotFound = () => {
  return (
    <>
      <Navigation />
      <div className="container">
        <h1 className={s.title}>Error 404</h1>
      </div>
    </>
  );
};

export default NotFound;
