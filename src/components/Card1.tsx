import React from 'react';
import SC from './Card1.module.scss';

interface Props {
	children: JSX.Element;
	style?: React.CSSProperties;
	header?: JSX.Element;
}

export default function Card1({ children, style, header }: Props) {
	return (
		<div className={SC.Card1} style={style}>
			{header && <div className={SC.header}>{header}</div>}
			<div className={SC.body}>{children}</div>
		</div>
	);
}
