import React from 'react';
import SC from './Card1.module.scss';

interface Props {
	children: JSX.Element;
	title?: string;
	style?: React.CSSProperties;
}

export default function Card1({ children, title, style }: Props) {
	return (
		<div className={SC.Card1} style={style}>
			{children}
		</div>
	);
}
