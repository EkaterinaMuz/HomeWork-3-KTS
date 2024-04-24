import * as React from 'react';
import Button from '@shared/UI/Button';
import Input from '@shared/UI/Input';
import MultiDropdown, { Option } from '@shared/UI/MultiDropdown';
import { mockOptions } from '@shared/UI/MultiDropdown/lib/mockOptions';
import styles from './Search.module.scss';

const Search = () => {
	const getTitle = (options: Option[]) => {
		if (options.length) {
			const result = options.reduce((acc, option) => {
				acc.push(option.value);
				return acc;
			}, [] as string[]);
			return result.join(', ');
		} else return 'Filter';
	};
	return (
		<div className={styles.searchbar_wrapper}>
			<div className={styles.search_wrapper}>
				<Input value='' placeholder='Search product' onChange={(value) => { console.log(value) }} />
				<Button>Find now</Button>
			</div>
			<div className={styles.dropdown_wrapper}>
				<MultiDropdown options={mockOptions} value={[]} getTitle={getTitle} onChange={(option: Option[]) => console.log(option)} />
			</div>
		</div>
	)
}

export default Search;
