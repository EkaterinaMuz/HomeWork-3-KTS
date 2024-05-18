import * as React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from '@/shared/UI/ErrorBoundary/ErrorBoundary';
import { ProductStoreProvider } from '@entities/products/models/store/context';
import Router from '../pages';

function App() {
  return (
    <ProductStoreProvider>
      <ErrorBoundary>
        <SkeletonTheme baseColor="#c2c2c2" highlightColor="#e4e4e4">
          <RouterProvider router={Router} />
          <ToastContainer />
        </SkeletonTheme>
      </ErrorBoundary>
    </ProductStoreProvider>
  );
}

export default App;
