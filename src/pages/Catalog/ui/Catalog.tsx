import * as React from 'react';
import Search from '@/features/Search';
import { useQueryParams } from '@/shared/lib/hooks';
import CatalogIntro from '@/widgets/CatalogIntro';
import ProductsList from '@widgets/ProductsList';

const Catalog = () => {
  useQueryParams();

  return (
    <>
      <CatalogIntro />
      <Search />
      <ProductsList />
    </>
  );
};

export default Catalog;
