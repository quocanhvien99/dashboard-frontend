import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import SC from '../components/Card1.module.scss';
import Card1 from '../components/Card1';
import { addClass, getClassList, getSubjectInfo, removeClass, searchUser } from '../api';
import { Modal, notification, Select, Table } from 'antd';
import AutoComplete from '../components/AutoComplete';

export default function SubjectView() {
	const { id } = useParams();
	const [subjectInfo, setSubjectInfo] = useState<any>();
	const [limit, setLimit] = useState(2);
	const [skip, setSkip] = useState(0);
	const [s, setS] = useState('');
	const [total, setTotal] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [orderBy, setOrderBy] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisible1, setIsModalVisible1] = useState(false);
	const [currentCid, setCurrentCid] = useState('');
	const [triggerReload, setTriggerReload] = useState(false);
	const [addTeacherId, setAddTeacherId] = useState('');
	const [semester, setSemester] = useState('');

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			sorter: true,
		},
		{
			title: 'Teacher',
			dataIndex: 'tname',
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
					<span className={`material-icons-outlined ${SC.remove}`} onClick={(e) => removeHandle(record.id)}>
						{' '}
						delete{' '}
					</span>
				</>
			),
		},
	];

	useEffect(() => {
		getSubjectInfo(id as string).then((res) => setSubjectInfo(res));
		let params: any = { skip, limit, sid: id };
		if (s) params.s = s;
		if (orderBy) params.orderby = orderBy;
		if (sortBy) params.sortby = sortBy;
		getClassList(params).then((res: any) => {
			setTotal(res[0].total);
			setDataSource(res);
		});
	}, [limit, skip, s, orderBy, sortBy, triggerReload]);

	const removeHandle = (id: string) => {
		setIsModalVisible(true);
		setCurrentCid(id);
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
		setCurrentCid('');
		removeClass(currentCid)
			.then((res) => {
				notification['success']({
					message: 'Success',
					description: 'Class has been removed',
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
	const addClassHandle = () => {
		addClass(id as string, addTeacherId, semester)
			.then((res) => {
				notification['success']({
					message: 'Success',
					description: 'Class has been added',
				});
				setTriggerReload(!triggerReload);
			})
			.catch((err) =>
				notification['error']({
					message: 'Error',
					description: err,
				})
			)
			.finally(() => setIsModalVisible1(false));
	};

	return (
		<>
			<Helmet>
				<title>Subject - {id as string}</title>
			</Helmet>
			<Layout
				title={`Subject - ${id}`}
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Subjects', to: '/subject' },
					{ title: 'View', to: `/subject/${id}` },
				]}>
				<>
					<Card1>
						<>
							<h5 className={SC.title}>
								<span>Basic Information</span>
							</h5>
							<p style={{ fontWeight: '500', fontSize: '16px' }}>ID</p>
							<p>{subjectInfo && subjectInfo.id}</p>
							<p style={{ fontWeight: '500', fontSize: '16px' }}>Subject Name</p>
							<p>{subjectInfo && subjectInfo.name}</p>
							<p style={{ fontWeight: '500', fontSize: '16px' }}>Department Name</p>
							<p>{subjectInfo && subjectInfo.dname}</p>
						</>
					</Card1>
					<Card1>
						<>
							<h5 className={SC.title}>
								<span>Classes</span>
							</h5>
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
								<button onClick={() => setIsModalVisible1(true)}>
									<span className="material-icons-outlined"> add </span>
								</button>
							</div>
							<Table
								onChange={tableChange}
								pagination={{ total: total, pageSize: limit }}
								dataSource={dataSource}
								columns={columns}
							/>
							<Modal
								title="Confirm"
								visible={isModalVisible}
								onOk={handleOk}
								onCancel={(e) => setIsModalVisible(false)}>
								Are you sure want to delete this department information?
							</Modal>
							<Modal
								title="Add Class"
								visible={isModalVisible1}
								onOk={addClassHandle}
								onCancel={(e) => setIsModalVisible1(false)}>
								<AutoComplete
									label="Teacher"
									setSelectId={setAddTeacherId}
									searchHandle={(dhead: string) => searchUser('teacher', 0, 5, dhead)}></AutoComplete>
								<label htmlFor="semester">Semester</label>
								<input
									type="text"
									name="semester"
									id="semester"
									value={semester}
									onChange={(e) => setSemester(e.currentTarget.value)}
								/>
							</Modal>
						</>
					</Card1>
				</>
			</Layout>
		</>
	);
}
