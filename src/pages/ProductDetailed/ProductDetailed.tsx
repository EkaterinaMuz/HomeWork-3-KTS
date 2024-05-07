import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useProductStore } from '@entities/products/models/store/context';
import ButtonBack from '@shared/UI/ButtonBack';
import Navigation from '@widgets/Navigation/UI';
import ProductDetailedInfo from '@widgets/ProductDetailedInfo';
import SkeletonProduct from '@widgets/ProductDetailedInfo/UI/Skeleton';
import RelatedItems from '@widgets/RelatedItems';

const ProductDetailed = () => {
	const productsStore = useProductStore();
	const { id } = useParams();

	React.useEffect(() => {
		if (id) {
			productsStore.getProductById(id);
		}
	}, [id, productsStore]);

	return (
		<>
			<Navigation />
			<main className='container'>
				<ButtonBack />
				{productsStore.product ? <ProductDetailedInfo product={productsStore.product} /> : <SkeletonProduct />}
				<RelatedItems products={productsStore.relatedItems} />
			</main>
		</>
	)
}

export default observer(ProductDetailed);