import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/entities/products/models/store/context';
import ROUTES from '@/shared/routes';
import { Product } from '@/shared/types/Products';
import Button from '@/shared/ui/Button';
import Card from '@/shared/ui/Card';
import SkeletonCard from '@/shared/ui/Card/Skeleton';
import s from './RelatedItems.module.scss';

const RelatedItems: React.FC<{ products: Product[] }> = ({ products }) => {
  const { shoppingCartStore } = useProductStore();
  const navigate = useNavigate();
  return (
    <section>
      <h2 className={s.title}>Related Items</h2>
      <div className={s.related_wrapper}>
        {!products.length &&
          Array(3)
            .fill(0)
            .map((_, index) => <SkeletonCard key={index} />)}
        {products.map((product) => {
          return (
            <Card
              title={product.title}
              subtitle={product.description}
              key={product.id}
              image={product.images[0]}
              captionSlot={product.category.name}
              contentSlot={product.price}
              actionSlot={
                <Button
                  onClick={() => shoppingCartStore.addToCart(product)}
                >
                  Add to Cart
                </Button>}
              onClick={() => navigate(ROUTES.PRODUCT(String(product.id)))}
            />
          );
        })}
      </div>
    </section>
  );
};

export default RelatedItems;
