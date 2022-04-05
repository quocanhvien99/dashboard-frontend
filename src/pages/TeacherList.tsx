import { Modal, notification, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { SearchOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';
import SC from './List.module.scss';
import { getUserList, removeUser } from '../api';
import { useNavigate } from 'react-router-dom';

export default function TeacherList() {
	const navigate = useNavigate();
	const [limit, setLimit] = useState(2);
	const [skip, setSkip] = useState(0);
	const [s, setS] = useState('');
	const [total, setTotal] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [orderBy, setOrderBy] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentUid, setCurrentUid] = useState('');
	const [triggerReload, setTriggerReload] = useState(false);

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			sorter: true,
		},
		{
			title: 'Name',
			dataIndex: 'name',
			sorter: true,
		},
		{
			title: 'DOB',
			dataIndex: 'dob',
			sorter: true,
		},
		{
			title: 'Mobile Number',
			dataIndex: 'phone',
			sorter: true,
		},
		{
			title: 'Address',
			dataIndex: 'address',
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
		navigate('/users/edit/' + id);
	};
	const removeHandle = (id: string) => {
		setIsModalVisible(true);
		setCurrentUid(id);
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
		setCurrentUid('');
		removeUser(currentUid)
			.then((res) => {
				notification['success']({
					message: 'Success',
					description: 'Teacher information has been removed',
				});
				setTriggerReload(!triggerReload);
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
		let params: any = { skip, limit, role: 'teacher' };
		if (s) params.s = s;
		if (orderBy) params.orderby = orderBy;
		if (sortBy) params.sortby = sortBy;
		getUserList(params).then((res: any) => {
			setTotal(res[0].total);
			setDataSource(res);
		});
	}, [limit, skip, s, orderBy, sortBy, triggerReload]);

	return (
		<>
			<Helmet>
				<title>Student List</title>
			</Helmet>
			<Layout
				title="Teacher List"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Teachers', to: '/teachers' },
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
					<div className={SC.table}>
						<Table
							onChange={tableChange}
							pagination={{ total: total, pageSize: limit }}
							dataSource={dataSource}
							columns={columns}
							sticky
						/>
					</div>
					<Modal title="Confirm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
						Are you sure want to delete this teacher information?
					</Modal>
				</>
			</Layout>
		</>
	);
}
