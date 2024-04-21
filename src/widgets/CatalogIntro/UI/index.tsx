import React from 'react';
import styles from './CatalogInfo.module.scss';

const CatalogIntro = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.info}>
				<h1 className={styles.title}>Products</h1>
				<div className={styles.subtitle}>We display products based on the latest products we have, if you want
					to see our old products please enter the name of the item</div>
			</div>
		</div>
	)
}

export default CatalogIntro;
