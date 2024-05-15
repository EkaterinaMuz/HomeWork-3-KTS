import * as React from 'react';
import { Product } from '@/entities/products/types';
import Button from '@/shared/ui/Button';
import styles from './ProductDetailedInfo.module.scss';

const ProductDetailedInfo: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <article className={styles.card_wrapper}>
      <div className={styles.card_gallery}>
        <img src={product.images[0]} alt="" />
      </div>
      <div className={styles.product_info}>
        <div className={styles.product_description}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.subtitle}>{product.description}</div>
        </div>
        <div className={styles.price}>${product.price}</div>
        <div className={styles.buttons_wrapper}>
          <Button color="accent">Buy Now</Button>
          <Button color="light">Add to Cart</Button>
        </div>
      </div>
    </article>
  );
};

export default ProductDetailedInfo;
