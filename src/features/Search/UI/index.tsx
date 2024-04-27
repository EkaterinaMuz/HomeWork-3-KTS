import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsListStore from '@entities/products/models/store';
import rootStore from '@shared/RootStore/instance';
import Button from '@shared/UI/Button';
import Input from '@shared/UI/Input';
import MultiDropdown, { Option } from '@shared/UI/MultiDropdown';
import { mockOptions } from '@shared/UI/MultiDropdown/lib/mockOptions';
import { ProductApiOptions } from '@shared/api/ApiService';
import useLocalStore from '@shared/libs/hooks/useLocalStore';
import useDebounce from '../libs/hooks/useDebounce';
import styles from './Search.module.scss';
import { Meta } from '@shared/types/Meta';

const Search = () => {
	const productsStore = useLocalStore(() => new ProductsListStore());
	const [searchParams, setSearchParams] = useSearchParams();
	const title = rootStore.query.getParam('search') || '';
	const searchQuery = useDebounce(title, 1000);

	const getTitle = (options: Option[]) => {
		if (options.length) {
			const result = options.reduce((acc, option) => {
				acc.push(option.value);
				return acc;
			}, [] as string[]);
			return result.join(', ');
		} else return 'Filter';
	};

	const handleChange = (value: string) => {
		const search = value || null;
		setSearchParams({ ...(search && { search }) });
	}

	React.useEffect(() => {
		console.log(searchQuery, 'searchQuery');
		console.log(title, 'title');
		const params: ProductApiOptions = { title, limit: 10, offset: 0 }
		productsStore.getProductsList('/products', params)
	}, [searchQuery])


	return (
		<div className={styles.searchbar_wrapper}>
			<div className={styles.search_wrapper}>
				<Input value='' placeholder='Search product' onChange={handleChange} />
				<Button loading={productsStore.meta === Meta.loading}>Find now</Button>
			</div>
			<div className={styles.dropdown_wrapper}>
				<MultiDropdown options={mockOptions} value={[]} getTitle={getTitle} onChange={(option: Option[]) => console.log(option)} />
			</div>
		</div>
	)
}

export default observer(Search);
