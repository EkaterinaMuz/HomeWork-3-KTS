const ROUTES = {
  CATALOG: '/',
  CART: '/cart',
  PRODUCT: (id: string = ':id') => `/products/${id}`,
  NOTFOUND: '/404',
};

export default ROUTES;
