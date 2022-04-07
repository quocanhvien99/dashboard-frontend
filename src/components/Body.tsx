import { Breadcrumb } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
	children: JSX.Element;
	title: string;
	breadcrumb: { title: string; to: string }[];
}

export default function Body({ children, title, breadcrumb }: Props) {
	return (
		<>
			<Title style={{ textTransform: 'capitalize' }}>{title}</Title>
			<Breadcrumb className="breadcrumb">
				{breadcrumb.map((x, i) => (
					<Breadcrumb.Item key={i}>
						<Link to={x.to} key={i}>
							{x.title}
						</Link>
					</Breadcrumb.Item>
				))}
			</Breadcrumb>
			{children}
		</>
	);
}
