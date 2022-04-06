import { Modal, notification, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { SearchOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';
import SC from './List.module.scss';
import { getClassList, getDepartmentList, removeDepartment } from '../api';
import { useNavigate } from 'react-router-dom';
import Body from '../components/Body';

export default function Class() {
	const navigate = useNavigate();
	const [limit, setLimit] = useState(2);
	const [skip, setSkip] = useState(0);
	const [total, setTotal] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [orderBy, setOrderBy] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [triggerReload, setTriggerReload] = useState(false);

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			sorter: true,
		},
		{
			title: 'Subject',
			dataIndex: 'sname',
			sorter: true,
		},
		{
			title: 'Department',
			dataIndex: 'dname',
			sorter: true,
		},
		{
			title: 'Semester',
			dataIndex: 'semester',
			sorter: true,
		},
		{
			title: 'Action',
			key: 'action',
			render: (text: any, record: any) => (
				<>
					<span className={`material-icons-outlined ${SC.view}`} onClick={(e) => navigate('/class/' + record.id)}>
						{' '}
						visibility{' '}
					</span>
				</>
			),
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
		getClassList(params).then((res: any) => {
			setTotal(res[0].total);
			setDataSource(res);
		});
	}, [limit, skip, orderBy, sortBy, triggerReload]);

	return (
		<>
			<Helmet>
				<title>Class List</title>
			</Helmet>
			<Body
				title="Class List"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Classes', to: '/class' },
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
					<Table
						onChange={tableChange}
						pagination={{ total: total, pageSize: limit }}
						dataSource={dataSource}
						columns={columns}
					/>
				</>
			</Body>
		</>
	);
}
