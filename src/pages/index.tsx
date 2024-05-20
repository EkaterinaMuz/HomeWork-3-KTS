import * as React from 'react';
import { createHashRouter } from 'react-router-dom';
import ErrorBoundary from '@/shared/ui/ErrorBoundary/ErrorBoundary';
import ROUTES from '@shared/routes';
import Layout from '@shared/ui/Layout';
import Cart from './Cart';
import Catalog from './Catalog';
import NotFound from './NotFound';
import ProductDetailed from './ProductDetailed';

const Router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Catalog />,
      },
      {
        path: ROUTES.CART,
        element: <Cart />,
      },
      {
        path: ROUTES.PRODUCT(),
        element: <ProductDetailed />,
      },
      {
        path: ROUTES.NOTFOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export default Router;
