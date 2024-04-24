import * as React from 'react'
import { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
	const colors = {
		primary: '#000',
		secondary: '#afadb5',
		accent: '#518581'

	}
	return (
		<svg className={props.className}
			width={props.width ? props.width : '24'}
			height={props.height ? props.height : '24'}
			{...props}
			viewBox="0 0 24 24"
			fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z" fill={props.color ? colors[props.color] : 'inherit'} />
		</svg>
	)
}

export default ArrowDownIcon;

// yarn test:single ArrowDownIcon