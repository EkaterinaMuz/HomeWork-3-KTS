export interface Product {
	id: number,
	title: string,
	price: number,
	description: string,
	images: string[],
	category: Category
	// "creationAt": "2024-04-16T19:58:02.000Z",
	// "updatedAt": "2024-04-17T13:36:34.000Z",
}

export interface Category {
	id: number,
	name: string,
	images: string,
}