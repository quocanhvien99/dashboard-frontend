import { Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getScoreList } from '../api';
import Body from '../components/Body';
import SC from './List.module.scss';

export default function Score() {
	const [limit, setLimit] = useState(2);
	const [skip, setSkip] = useState(0);
	const [total, setTotal] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [orderBy, setOrderBy] = useState('');
	const [sortBy, setSortBy] = useState('');

	const columns = [
		{
			title: 'Subject',
			dataIndex: 'subjectName',
			sorter: true,
		},
		{
			title: 'Semester',
			dataIndex: 'semester',
			sorter: true,
		},
		{
			title: 'Score',
			dataIndex: 'score',
			sorter: true,
		},
	];
	const tableChange = (pagination: any, filters: any, sorter: any) => {
		setSkip(pagination.current * limit - limit);
		if (sorter.hasOwnProperty('column')) {
			switch (sorter.order) {
				case 'ascend':
					setOrderBy('ASC');
					break;
				case 'descend':
					setOrderBy('DESC');
					break;
			}
			setSortBy(sorter.field);
		}
	};
	useEffect(() => {
		let params: any = { skip, limit };
		if (orderBy) params.orderby = orderBy;
		if (sortBy) params.sortby = sortBy;
		getScoreList(params).then((res: any) => {
			setTotal(res[0].total);
			setDataSource(res);
		});
	}, [limit, skip, orderBy, sortBy]);

	return (
		<>
			<Helmet>
				<title>Score</title>
			</Helmet>
			<Body
				title="Score"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Score', to: '/score' },
				]}>
				<>
					<div className={SC.Card}>
						<div>
							Show{' '}
							<Select defaultValue={2} onChange={(value) => setLimit(value)}>
								<Select.Option value={2}>{2}</Select.Option>
								<Select.Option value={10}>{10}</Select.Option>
								<Select.Option value={25}>{25}</Select.Option>
								<Select.Option value={50}>{50}</Select.Option>
								<Select.Option value={100}>{100}</Select.Option>
							</Select>{' '}
							entries
						</div>
					</div>
					<div className={SC.table}>
						<Table
							onChange={tableChange}
							pagination={{ total: total, pageSize: limit }}
							dataSource={dataSource}
							columns={columns}
							sticky
						/>
					</div>
				</>
			</Body>
		</>
	);
}
