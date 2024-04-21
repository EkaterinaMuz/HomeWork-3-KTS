import * as React from 'react'
import Skeleton from 'react-loading-skeleton';
import styles from './ProductDetailedInfo.module.scss';

const SkeletonProduct = () => {
	return (
		<article className={styles.card_wrapper}>
			<div className={styles.card_gallery}>
				<Skeleton width={'100%'} height={'100%'} />
			</div>
			<div className={styles.product_info}>
				<div className={styles.product_description}>
					<h1 className={styles.title}><Skeleton width={'100%'} height={50} /></h1>
					<div className={styles.subtitle}><Skeleton width={'100%'} height={200} /></div>
				</div>
				<div className={styles.price}><Skeleton width={150} height={40} /></div>
				<div className={styles.buttons_wrapper}>
					<Skeleton width={150} height={50} />
					<Skeleton width={150} height={50} />
				</div>
			</div>
		</article>
	)
}

export default SkeletonProduct;
