import * as React from 'react';
import Skeleton from 'react-loading-skeleton';
import s from './ProductDetailedInfo.module.scss';

const SkeletonProduct = () => {
  return (
    <article className={s.card_wrapper}>
      <div className={s.card_gallery}>
        <Skeleton width={'100%'} height={'100%'} />
      </div>
      <div className={s.product_info}>
        <div className={s.product_description}>
          <h1 className={s.title}>
            <Skeleton width={'100%'} height={50} />
          </h1>
          <div className={s.subtitle}>
            <Skeleton width={'100%'} height={200} />
          </div>
        </div>
        <div className={s.price}>
          <Skeleton width={150} height={40} />
        </div>
        <div className={s.buttons_wrapper}>
          <Skeleton width={150} height={50} />
          <Skeleton width={150} height={50} />
        </div>
      </div>
    </article>
  );
};

export default SkeletonProduct;
