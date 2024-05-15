import * as React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { RouterProvider } from 'react-router-dom';
import { ProductStoreProvider } from '@/entities/products/models/store/context';
import Router from '@/pages';
import ErrorBoundary from '@/shared/ui/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ProductStoreProvider>
      <ErrorBoundary>
        <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e4e4e4">
          <RouterProvider router={Router} />
        </SkeletonTheme>
      </ErrorBoundary>
    </ProductStoreProvider>
  );
}

export default App;
