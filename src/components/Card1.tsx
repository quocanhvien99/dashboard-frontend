import React from 'react';
import SC from './Card1.module.scss';

interface Props {
	children: JSX.Element;
}

export default function Card1({ children }: Props) {
	return <div className={SC.Card1}>{children}</div>;
}
