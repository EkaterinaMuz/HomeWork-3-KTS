import cn from 'classnames';
import * as React from 'react';
import styles from './Pagination.module.scss';


const Pagination = () => {
	const pagesQnty = Array.from(Array(10).keys());
	return (
		<div className={styles.pagination_wrapper}>
			<div className={cn(styles.nav_left, {
				[styles.disabled]: true
			})}>
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44" stroke="#AFADB5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
				</svg>

			</div>
			<div className={styles.pagination_pages}>
				{
					pagesQnty.map(page => {
						return (
							<span className={cn(styles.page, {
								[styles.active]: page === 0
							})}
								key={page}
							>
								{page + 1}</span>
						)
					})
				}
			</div>
			<div className={cn(styles.nav_right)}>
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
				</svg>

			</div>
		</div>
	)
}

export default Pagination;
