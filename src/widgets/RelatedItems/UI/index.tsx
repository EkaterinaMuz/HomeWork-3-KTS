import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@shared/UI/Button';
import Card from '@shared/UI/Card';
import SkeletonCard from '@shared/UI/Card/Skeleton';
import ROUTES from '@shared/routes';
import { Product } from '@shared/types';
import styles from './RelatedItems.module.scss';


const RelatedItems: React.FC<{ products: Product[] }> = ({ products }) => {
	const navigate = useNavigate();
	return (
		<section>
			<h2 className={styles.title}>Related Items</h2>
			<div className={styles.related_wrapper}>
				{
					!products.length && Array(3).fill(0).map(skeleton => <SkeletonCard key={skeleton} />)
				}
				{
					products.map((product) => {
						return (
							<Card
								title={product.title}
								subtitle={product.description}
								key={product.id}
								image={product.images[0]}
								captionSlot={product.category.name}
								contentSlot={product.price}
								actionSlot={<Button>Add to Cart</Button>}
								onClick={() => navigate(ROUTES.PRODUCT(String(product.id)))}
							/>
						)

					})
				}
			</div>
		</section>
	)
}

export default RelatedItems;
