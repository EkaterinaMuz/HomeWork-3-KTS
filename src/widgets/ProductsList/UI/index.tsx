import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import ProductsListStore from '@entities/products/models/store';
import rootStore from '@shared/RootStore/instance';
import Button from '@shared/UI/Button';
import Card from '@shared/UI/Card';
import SkeletonCard from '@shared/UI/Card/Skeleton';
import Loader from '@shared/UI/Loader';
import useLocalStore from '@shared/libs/hooks/useLocalStore';
import ROUTES from '@shared/routes';
import { Product } from '@shared/types/Products';
import styles from './ProductsList.module.scss';
import { Meta } from '@shared/types/Meta';

const ProductsList = () => {

  const productsStore = useLocalStore(() => new ProductsListStore());

  const navigate = useNavigate();

  const title = rootStore.query.getParam('search');
  const params = { limit: 10, offset: 0, title }

  React.useEffect(() => {
    productsStore.getProductsList('/products', params);

  }, [productsStore]);

  console.log(productsStore.list);

  const list = productsStore.list;


  return (
    <>
      <div className={styles.quantity_wrapper}>
        <h2 className={styles.quatity_text}>Total Products</h2>
        <span className={styles.quatity_number}>{productsStore.list && productsStore.list.length}</span>
      </div>
      <InfiniteScroll
        dataLength={list.length}
        next={() => productsStore.getProductsList('/products', params)}
        hasMore={false}
        style={{ overflowY: 'hidden', textAlign: 'center' }}
        loader={<Loader />}

      >
        <div className={cn(styles.catalog_wrapper)}>
          {
            productsStore.meta === Meta.loading && Array(6).fill(0).map((_, index) => <SkeletonCard key={index} />)
          }
          {list.map((product: Product) => {
            return (
              <Card
                key={product.id}
                captionSlot={product.category.name}
                contentSlot={product.price}
                title={product.title}
                subtitle={product.description}
                image={product.images[0]}
                onClick={() => navigate(ROUTES.PRODUCT(String(product.id)))}
                actionSlot={<Button color='accent'>Add to Cart</Button>}
              />
            )
          })}
        </div>
      </InfiniteScroll>
    </>
  )
}

export default observer(ProductsList);
