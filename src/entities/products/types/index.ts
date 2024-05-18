export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt: string;
  updatedAt: string;
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  images: string;
  creationAt: string;
  updatedAt: string;
}
