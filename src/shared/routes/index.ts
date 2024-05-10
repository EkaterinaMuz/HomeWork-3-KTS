const ROUTES = {
  CATALOG: '/',
  CART: '/cart',
  PRODUCT: (id: string = ':id') => `/products/${id}`,
  NOTFOUND: '*',
};

export default ROUTES;
