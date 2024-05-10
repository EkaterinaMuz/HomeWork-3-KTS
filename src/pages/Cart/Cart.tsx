import * as React from 'react';
import CartProductList from '@features/CartProductList';
import { useQueryParams } from '@shared/libs/hooks';
import Navigation from '@widgets/Navigation/UI';

const Catalog = () => {
	useQueryParams();
	return (
		<>
			<Navigation />
			<div className="container">
				<CartProductList />
			</div>
		</>
	);
};

export default Catalog;
