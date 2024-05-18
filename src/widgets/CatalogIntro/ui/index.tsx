import * as React from 'react';
import s from './CatalogInfo.module.scss';

const CatalogIntro = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.info}>
        <h1 className={s.title}>Products</h1>
        <div className={s.subtitle}>
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </div>
      </div>
    </div>
  );
};

export default CatalogIntro;
