import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/entities/products/types';
import Button from '@/shared/ui/Button';
import Card from '@/shared/ui/Card';
import SkeletonCard from '@/shared/ui/Card/Skeleton';
import Loader from '@/shared/ui/Loader';
import { useProductStore } from '@entities/products/models/store/context';
import ROUTES from '@shared/routes';
import { Meta } from '@shared/types/Meta';
import { parseImageArray } from '../lib';
import s from './ProductsList.module.scss';

const ProductsList = () => {
  const { productStore, shoppingCartStore } = useProductStore();

  const navigate = useNavigate();

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.stopPropagation();
    shoppingCartStore.addToCart(product);
  };

  return (
    <>
      <div className={s.quantity_wrapper}>
        <h2 className={s.quatity_text}>Total Products</h2>
        <span className={s.quatity_number}>{productStore.list && productStore.list.length}</span>
      </div>
      <InfiniteScroll
        dataLength={productStore.list.length}
        next={productStore.getMoreProducts}
        hasMore={productStore.hasMore}
        style={{ overflowY: 'hidden', textAlign: 'center' }}
        loader={<Loader />}
        endMessage='You"ve reached the end of product list'
      >
        <div className={cn(s.catalog_wrapper)}>
          {productStore.meta === Meta.loading &&
            Array(6)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)}
          {productStore.list.map((product: Product) => {
            return (
              <Card
                key={product.id}
                captionSlot={product.category.name}
                contentSlot={product.price}
                title={product.title}
                subtitle={product.description}
                image={parseImageArray(product.images)}
                onClick={() => navigate(ROUTES.PRODUCT(String(product.id)))}
                actionSlot={
                  <Button color="accent" onClick={(e) => onButtonClick(e, product)}>
                    Add to Cart
                  </Button>
                }
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default observer(ProductsList);
