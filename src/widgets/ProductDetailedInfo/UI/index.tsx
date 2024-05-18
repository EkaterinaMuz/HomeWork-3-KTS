import * as React from 'react';
import { Product } from '@/entities/products/types';
import Slider from '@/features/ProductSlider/ui/Slider';
import Button from '@/shared/ui/Button';
import { useProductStore } from '@entities/products/models/store/context';
import s from './ProductDetailedInfo.module.scss';


const ProductDetailedInfo: React.FC<{ product: Product }> = ({ product }) => {
  const { shoppingCartStore } = useProductStore();
  if (shoppingCartStore.isInCart)
    return (
      <article className={s.card_wrapper}>
        <div className={s.card_gallery}>
          <Slider slides={product.images} />
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
              {shoppingCartStore.isInCart(product.id) === true
                ?
                'Added to Cart'
                :
                'Add to Cart'}
            </Button>
          </div>
        </div>
      </article>
    );
};

export default ProductDetailedInfo;
