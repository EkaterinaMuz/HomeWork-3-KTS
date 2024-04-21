import * as React from 'react'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import s from './Card.module.scss';


const SkeletonCard = () => {
	return (
		<div className={s.card} style={{ display: 'block' }}>
			<Skeleton height={260} width={360} />
			<div className={s.info}>
				<div className={s.text}>
					<Skeleton height={10} width={130} />
					<Skeleton height={24} width={330} />
					<Skeleton height={50} width={330} />
				</div>
				<div className={s['card-footer']}>
					<Skeleton height={25} width={70} />
					<Skeleton height={52} width={155} />
				</div>
			</div>
		</div>

	)
}
export default SkeletonCard;
