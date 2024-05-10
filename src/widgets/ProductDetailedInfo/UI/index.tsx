import * as React from 'react';
import { useProductStore } from '@entities/products/models/store/context';
import Button from '@shared/UI/Button';
import { Product } from '@shared/types/Products';
import s from './ProductDetailedInfo.module.scss';

const ProductDetailedInfo: React.FC<{ product: Product }> = ({ product }) => {
  const { shoppingCartStore } = useProductStore();
  return (
    <article className={s.card_wrapper}>
      <div className={s.card_gallery}>
        <img src={product.images[0]} alt="" />
      </div>
      <div className={s.product_info}>
        <div className={s.product_description}>
          <h1 className={s.title}>{product.title}</h1>
          <div className={s.subtitle}>{product.description}</div>
        </div>
        <div className={s.price}>${product.price}</div>
        <div className={s.buttons_wrapper}>
          <Button color="accent">Buy Now</Button>
          <Button
            onClick={() => shoppingCartStore.addToCart(product)}
            color="light"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductDetailedInfo;
