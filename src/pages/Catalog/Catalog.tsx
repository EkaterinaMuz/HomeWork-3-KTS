import * as React from 'react';
import Search from '@/features/Search';
import { useQueryParams } from '@/shared/lib/hooks';
import CatalogIntro from '@/widgets/CatalogIntro';
import Navigation from '@/widgets/Navigation/ui';
import ProductsList from '@widgets/ProductsList';

const Catalog = () => {
  useQueryParams();

  return (
    <>
      <Navigation />
      <div className="container">
        <CatalogIntro />
        <Search />
        <ProductsList />
      </div>
    </>
  );
};

export default Catalog;
