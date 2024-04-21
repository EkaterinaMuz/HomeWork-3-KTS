import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonBack from '@shared/UI/ButtonBack';
import CatalogService from '@shared/api';
import { Product } from '@shared/types';
import Navigation from '@widgets/Navigation/UI';
import ProductDetailedInfo from '@widgets/ProductDetailedInfo';
import SkeletonProduct from '@widgets/ProductDetailedInfo/UI/Skeleton';
import RelatedItems from '@widgets/RelatedItems';

const ProductDetailed = () => {
	const [product, setProduct] = useState<Product>()
	const [categoryProducts, setCategoryProducts] = useState<Product[]>([])

	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id) {
					const result = await CatalogService.getProductById(id);
					const relatedItems = await CatalogService.getProductsByCategory(result.category.id);
					setProduct(result);
					setCategoryProducts(relatedItems);
				}
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		fetchData();
	}, [id]);

	return (
		<>
			<Navigation />
			<main className='container'>
				<ButtonBack />
				{product ? <ProductDetailedInfo product={product} /> : <SkeletonProduct />}
				<RelatedItems products={categoryProducts} />
			</main>
		</>
	)
}

export default ProductDetailed;