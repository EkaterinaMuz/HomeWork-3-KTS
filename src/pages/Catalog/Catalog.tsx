import * as React from 'react'
import Search from '@features/Search';
import CatalogIntro from '@widgets/CatalogIntro';
import Navigation from '@widgets/Navigation/UI';
import ProductsList from '@widgets/ProductsList';

const Catalog = () => {
	return (
		<>
			<Navigation />
			<div className='container'>
				<CatalogIntro />
				<Search />
				<ProductsList />
			</div>
		</>
	)
}

export default Catalog;
