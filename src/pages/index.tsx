import * as React from 'react';
import { createBrowserRouter } from "react-router-dom";
import ROUTES from '@shared/routes';
import Catalog from "./Catalog";
import NotFound from './NotFound';
import ProductDetailed from './ProductDetailed';


const Router = createBrowserRouter([
	{
		path: ROUTES.CATALOG,
		element: <Catalog />,
		children: [
			{
				path: ROUTES.PRODUCT,
				element: <ProductDetailed />
			}
		]
	},
	{
		path: ROUTES.NOTFOUND,
		element: <NotFound />
	}
]);

export default Router;