import { Modal, notification, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { SearchOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';
import SC from './List.module.scss';
import { getDepartmentList, removeDepartment } from '../api';
import { useNavigate } from 'react-router-dom';

export default function DepartmentList() {
	const navigate = useNavigate();
	const [limit, setLimit] = useState(2);
	const [skip, setSkip] = useState(0);
	const [s, setS] = useState('');
	const [total, setTotal] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [orderBy, setOrderBy] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentDid, setCurrentDid] = useState('');
	const [triggleReload, setTriggleReload] = useState(false);

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			sorter: true,
		},
		{
			title: 'Name',
			dataIndex: 'dname',
			sorter: true,
		},
		{
			title: 'HOD',
			dataIndex: 'dhead',
			sorter: true,
		},
		{
			title: 'Action',
			key: 'action',
			render: (text: any, record: any) => (
				<>
					<span className={`material-icons-outlined ${SC.edit}`} onClick={(e) => editHandle(record.id)}>
						{' '}
						edit{' '}
					</span>
					<span className={`material-icons-outlined ${SC.remove}`} onClick={(e) => removeHandle(record.id)}>
						{' '}
						delete{' '}
					</span>
				</>
			),
		},
	];

	const editHandle = (id: string) => {
		navigate('/department/edit/' + id);
	};
	const removeHandle = (id: string) => {
		setIsModalVisible(true);
		setCurrentDid(id);
	};
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
	const handleOk = () => {
		setIsModalVisible(false);
		setCurrentDid('');
		removeDepartment(currentDid)
			.then((res) => {
				notification['success']({
					message: 'Success',
					description: 'Department has been removed',
				});
				setTriggleReload(!triggleReload);
			})
			.catch((err) =>
				notification['error']({
					message: 'Error',
					description: err,
				})
			);
	};
	const handleCancel = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {
		let params: any = { skip, limit };
		if (s) params.s = s;
		if (orderBy) params.orderby = orderBy;
		if (sortBy) params.sortby = sortBy;
		getDepartmentList(params).then((res: any) => {
			setTotal(res[0].total);
			setDataSource(res);
		});
	}, [limit, skip, s, orderBy, sortBy, triggleReload]);

	return (
		<>
			<Helmet>
				<title>Department List</title>
			</Helmet>
			<Layout
				title="Department List"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Departments', to: '/departments' },
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
						<form className={SC.Search}>
							<button>
								<SearchOutlined />
							</button>
							<input type="text" name="search" id="search" value={s} onChange={(e) => setS(e.currentTarget.value)} />
						</form>
					</div>
					<Table
						onChange={tableChange}
						pagination={{ total: total, pageSize: limit }}
						dataSource={dataSource}
						columns={columns}
					/>
					<Modal title="Confirm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
						Are you sure want to delete this department information?
					</Modal>
				</>
			</Layout>
		</>
	);
}
