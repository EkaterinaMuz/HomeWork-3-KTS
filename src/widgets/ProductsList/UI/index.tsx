import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@entities/products/models/store/context';
import Button from '@shared/UI/Button';
import Card from '@shared/UI/Card';
import SkeletonCard from '@shared/UI/Card/Skeleton';
import Loader from '@shared/UI/Loader';
import ROUTES from '@shared/routes';
import { Meta } from '@shared/types/Meta';
import { Product } from '@shared/types/Products';
import { parseImageArray } from '../lib';
import s from './ProductsList.module.scss';

const ProductsList = () => {
  const { productStore, shoppingCartStore } = useProductStore();

  const navigate = useNavigate();
  console.log(shoppingCartStore.cartItems);

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
              <>
                <Card
                  key={product.id}
                  captionSlot={product.category.name}
                  contentSlot={product.price}
                  title={product.title}
                  subtitle={product.description}
                  image={parseImageArray(product.images)}
                  onClick={() => navigate(ROUTES.PRODUCT(String(product.id)))}
                  actionSlot={
                    <Button
                      color="accent"
                      onClick={() => shoppingCartStore.addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  }
                />
              </>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default observer(ProductsList);
