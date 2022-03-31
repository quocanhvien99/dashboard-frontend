import React from 'react';
import SC from './Card.module.scss';

interface Props {
	type: 'primary' | 'secondary' | 'alert' | 'warning';
	icon: JSX.Element;
	total: number;
	title: string;
}

function Card(props: Props) {
	return (
		<div className={`${SC.Card} ${SC[props.type]}`}>
			{props.icon}
			<div>
				<p className={SC.total}>{props.total}</p>
				<p className={SC.title}>{props.title}</p>
			</div>
		</div>
	);
}

export default Card;
