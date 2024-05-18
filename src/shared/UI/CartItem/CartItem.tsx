import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useProductStore } from '@/entities/products/models/store/context';
import { CartProduct } from '@/entities/products/types';
import { parseImageArray } from '@widgets/ProductsList/lib';
import Text from '../Text';
import DeleteIcon from '../icons/DeleteIcon';
import s from './CartItem.module.scss';

const CartItem: React.FC<{ product: CartProduct }> = ({ product }) => {
	const { shoppingCartStore } = useProductStore();

	const deleteItem = () => {
		shoppingCartStore.deleteFromCart(product);
	}
	return (
		<article className={s.card_wrapper}>
			<DeleteIcon className={s.delete_icon} onClick={deleteItem} />
			<div className={s.card_right}>
				<img src={parseImageArray(product.images)} className={s.card_img} alt={product.title} />
				<Text view='p-16'>{product.title}</Text>
			</div>
			<div className={s.card_left}>
				<Text view='p-20'>${product.price}</Text>
				<Text view='p-20'>{product.quantity}</Text>
				<Text view='p-20' weight='bold'>${product.price * product.quantity}</Text>
			</div>
		</article>
	);
};

export default observer(CartItem);
