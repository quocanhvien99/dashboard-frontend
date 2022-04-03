import React from 'react';
import SC from './Card1.module.scss';

interface Props {
	children: JSX.Element;
	title?: string;
}

export default function Card1({ children, title }: Props) {
	return <div className={SC.Card1}>{children}</div>;
}
