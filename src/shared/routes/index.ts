const ROUTES = {
	CATALOG: '/',
	PRODUCT: (id: string = ':id') => `/products/${id}`,
	NOTFOUND: '*',
}

export default ROUTES;