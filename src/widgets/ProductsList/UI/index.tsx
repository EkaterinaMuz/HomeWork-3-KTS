import cn from 'classnames';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Pagination from '@features/Pagination';
import Button from '@shared/UI/Button';
import Card from '@shared/UI/Card';
import SkeletonCard from '@shared/UI/Card/Skeleton';
import CatalogService from "@shared/api/index";
import ROUTES from '@shared/routes';
import { Product } from '@shared/types';
import styles from './ProductsList.module.scss';

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CatalogService.getAllProducts();
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={styles.quantity_wrapper}>
        <h2 className={styles.quatity_text}>Total Products</h2>
        <span className={styles.quatity_number}>{products && products.length}</span>
      </div>
      <div className={cn(styles.catalog_wrapper)}>
        {
          !products.length && Array(6).fill(0).map(skeleton => <SkeletonCard key={skeleton} />)
        }
        {products && products.map((product: Product) => {
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
      <Pagination />
    </>
  )
}

export default ProductsList;
