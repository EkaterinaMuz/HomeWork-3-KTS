import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@entities/products/models/store/context';
import Button from '@shared/ui/Button';
import Card from '@shared/ui/Card';
import SkeletonCard from '@shared/ui/Card/Skeleton';
import Loader from '@shared/ui/Loader';
import ROUTES from '@shared/routes';
import { Meta } from '@shared/types/Meta';
import { Product } from '@entities/products/Products';
import styles from './ProductsList.module.scss';
import { parseImageArray } from '../lib';



const ProductsList = () => {
  const productsStore = useProductStore();

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.quantity_wrapper}>
        <h2 className={styles.quatity_text}>Total Products</h2>
        <span className={styles.quatity_number}>{productsStore.list && productsStore.list.length}</span>
      </div>
      <InfiniteScroll
        dataLength={productsStore.list.length}
        next={productsStore.getMoreProducts}
        hasMore={productsStore.hasMore}
        style={{ overflowY: 'hidden', textAlign: 'center' }}
        loader={<Loader />}
        endMessage='You"ve reached the end of product list'
      >
        <div className={cn(styles.catalog_wrapper)}>
          {productsStore.meta === Meta.loading &&
            Array(6)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)}
          {productsStore.list.map((product: Product) => {
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
                  actionSlot={<Button color="accent">Add to Cart</Button>}
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
