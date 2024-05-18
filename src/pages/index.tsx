import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '@/shared/ui/ErrorBoundary/ErrorBoundary';
import ROUTES from '@shared/routes';
import Cart from './Cart';
import Catalog from './Catalog';
import NotFound from './NotFound';
import ProductDetailed from './ProductDetailed';

const Router = createBrowserRouter([
  {
    path: ROUTES.CATALOG,
    element: <Catalog />,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: ROUTES.CART,
    element: <Cart />,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: ROUTES.PRODUCT(),
    element: <ProductDetailed />,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: ROUTES.NOTFOUND,
    element: <NotFound />,
    ErrorBoundary: ErrorBoundary,
  },
]);

export default Router;
