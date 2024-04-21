import * as React from 'react'
import { IconProps } from '../Icon';
import { ReactComponent as ArrowDownSVG } from '../../../assets/ArrowDown.svg';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
	return (
		<svg className={props.className}
			width={props.width ? props.width : '24'}
			height={props.height ? props.height : '24'}
			{...props}
			viewBox="0 0 24 24"
			fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z" fill={props.color === 'accent' ? '#518581' : props.color === 'secondary' ? '#afadb5' : props.color === 'primary' ? '#000' : 'inherit'} />
		</svg>
	)
}

export default ArrowDownIcon;

// yarn test:single ArrowDownIcon