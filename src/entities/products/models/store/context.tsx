import { createContext, ReactNode, useContext } from "react";
import useLocalStore from "@shared/libs/hooks/useLocalStore";
import ProductsStore from "./ProductsStore";

const context = createContext<ProductsStore | null>(null);

type Props = {
	children: ReactNode
}

export const useProductStore = () => {
	const store = useContext(context);
	if (!store) {
		throw new Error('Product Store is not found!')
	}
	return store;
}

export const ProductStoreProvider = ({ children }: Props) => {
	const productStore = useLocalStore(() => new ProductsStore());
	return (
		<context.Provider value={productStore}>
			{children}
		</context.Provider>
	)
}