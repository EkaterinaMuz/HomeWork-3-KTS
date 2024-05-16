import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ButtonBack from '@/shared/ui/ButtonBack';
import Navigation from '@/widgets/Navigation/ui';
import SkeletonProduct from '@/widgets/ProductDetailedInfo/UI/Skeleton';
import { useProductStore } from '@entities/products/models/store/context';
import ProductDetailedInfo from '@widgets/ProductDetailedInfo';
import RelatedItems from '@widgets/RelatedItems';

const ProductDetailed = () => {
  const { productStore } = useProductStore();
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      productStore.getProductById(id);
    }
  }, [id, productStore]);

  return (
    <>
      <Navigation />
      <main className="container">
        <ButtonBack />
        {productStore.product ? <ProductDetailedInfo product={productStore.product} /> : <SkeletonProduct />}
        <RelatedItems products={productStore.relatedItems} />
      </main>
    </>
  );
};

export default observer(ProductDetailed);
