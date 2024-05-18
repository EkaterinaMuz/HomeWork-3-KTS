import * as React from 'react';
import CartProductList from '@/features/CartProductList';
import Navigation from '@/widgets/Navigation/UI';

const Catalog = () => {
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