import { observer, useLocalStore } from 'mobx-react-lite';
import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsStore from '@entities/products/models/store';
import ButtonBack from '@shared/UI/ButtonBack';
import { Product } from '@shared/types/Products';
import Navigation from '@widgets/Navigation/UI';
import ProductDetailedInfo from '@widgets/ProductDetailedInfo';
import SkeletonProduct from '@widgets/ProductDetailedInfo/UI/Skeleton';
import RelatedItems from '@widgets/RelatedItems';

const ProductDetailed = () => {
	const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

	const productsStore = useLocalStore(() => new ProductsStore());

	const { id } = useParams();
	React.useEffect(() => {
		if (id) {
			productsStore.getProductById(id);
			// const relatedItems = await CatalogService.getProductsByCategory(result.category.id);
			// setCategoryProducts(relatedItems);
		}
	}, [id]);

	return (
		<>
			<Navigation />
			<main className='container'>
				<ButtonBack />
				{productsStore.product ? <ProductDetailedInfo product={productsStore.product} /> : <SkeletonProduct />}
				<RelatedItems products={categoryProducts} />
			</main>
		</>
	)
}

export default observer(ProductDetailed);