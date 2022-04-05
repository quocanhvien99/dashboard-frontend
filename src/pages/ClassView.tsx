import { Collapse, Modal, notification, Table } from 'antd';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import {
	addMember,
	addTime,
	getClassMemberList,
	getScoreList,
	getTimeList,
	removeMember,
	removeTime,
	searchUser,
	updateScore,
} from '../api';
import AutoComplete from '../components/AutoComplete';
import Layout from '../components/Layout';
import SC from './List.module.scss';
import './ClassView.scss';

export default function ClassView() {
	const { id } = useParams();

	const [dataSource, setDataSource] = useState([]);
	const [orderBy, setOrderBy] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [isModalVisible, setIsModalVisible] = useState<any>({});
	const [currentUid, setCurrentUid] = useState('');
	const [triggerReload, setTriggerReload] = useState(false);
	const [addStudentId, setAddStudentId] = useState('');

	const [dataSource1, setDataSource1] = useState([]);
	const [orderBy1, setOrderBy1] = useState('');
	const [sortBy1, setSortBy1] = useState('');
	const [currentTid, setCurrentTid] = useState('');
	const [triggerReload1, setTriggerReload1] = useState(false);

	const updateScoreHandle = (e: React.FormEvent<HTMLFormElement>, cid: string, uid: string, score: any) => {
		e.preventDefault();
		e.currentTarget.querySelector('input')!.value = '';
		updateScore(cid, uid, score)
			.then((res) => {
				notification['success']({
					message: 'Success',
					description: 'Ok',
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

	const columnsMember = [
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
			title: 'Gender',
			dataIndex: 'gender',
			sorter: true,
		},
		{
			title: 'Score',
			dataIndex: 'score',
			sorter: true,
			render: (text: any, record: any) => (
				<>
					<form
						className="score"
						onSubmit={(e) => updateScoreHandle(e, id as string, record.id, new FormData(e.currentTarget).get('score'))}>
						<input type="number" name="score" placeholder={record.score} min={0} max={10} />
					</form>
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (text: any, record: any) => (
				<>
					<span className={`material-icons-outlined ${SC.remove}`} onClick={(e) => removeHandle(record.id, 0)}>
						delete
					</span>
				</>
			),
		},
	];
	const columnsTimetable = [
		{
			title: 'ID',
			dataIndex: 'id',
			sorter: true,
		},
		{
			title: 'Start  ',
			dataIndex: 'start',
			sorter: true,
		},
		{
			title: 'End',
			dataIndex: 'end',
			sorter: true,
		},
		{
			title: 'Action',
			key: 'action',
			render: (text: any, record: any) => (
				<>
					<span className={`material-icons-outlined ${SC.remove}`} onClick={(e) => removeHandle(record.id, 1)}>
						{' '}
						delete{' '}
					</span>
				</>
			),
		},
	];

	const removeHandle = (id: string, type: number) => {
		setIsModalVisible({ ...isModalVisible, [type]: true });
		if (type === 0) {
			setCurrentUid(id);
		}
		if (type === 1) {
			setCurrentTid(id);
		}
	};
	const tableChange = (pagination: any, filters: any, sorter: any) => {
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
	const handleOk = (type: number) => {
		setIsModalVisible({ ...isModalVisible, [type]: false });
		if (type === 0) {
			setCurrentUid('');
			removeMember(id as string, currentUid)
				.then((res) => {
					notification['success']({
						message: 'Success',
						description: 'Student has been removed',
					});
					setTriggerReload(!triggerReload);
				})
				.catch((err) =>
					notification['error']({
						message: 'Error',
						description: err,
					})
				);
		}
		if (type === 1) {
			setCurrentTid('');
			removeTime(id as string, currentTid)
				.then((res) => {
					notification['success']({
						message: 'Success',
						description: 'Lesson has been removed',
					});
					setTriggerReload1(!triggerReload1);
				})
				.catch((err) =>
					notification['error']({
						message: 'Error',
						description: err,
					})
				);
		}
	};
	const handleCancel = (type: number) => {
		setIsModalVisible({ ...isModalVisible, [type]: false });
	};
	const addMemberHandle: FormEventHandler = (e) => {
		e.preventDefault();
		addMember(id as string, addStudentId)
			.then((res) => {
				notification['success']({
					message: 'Success',
					description: 'Student has been added',
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

	const tableChange1 = (pagination: any, filters: any, sorter: any) => {
		if (sorter.hasOwnProperty('column')) {
			switch (sorter.order) {
				case 'ascend':
					setOrderBy1('ASC');
					break;
				case 'descend':
					setOrderBy1('DESC');
					break;
			}
			setSortBy1(sorter.field);
		}
	};
	const addTimeHandle: FormEventHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		addTime(id as string, formData.get('start') as string, formData.get('end') as string)
			.then((res) => {
				notification['success']({
					message: 'Success',
					description: 'Lesson has been added',
				});
				setTriggerReload1(!triggerReload1);
			})
			.catch((err) =>
				notification['error']({
					message: 'Error',
					description: err,
				})
			);
	};

	useEffect(() => {
		let params: any = {};
		if (orderBy) params.orderby = orderBy;
		if (sortBy) params.sortby = sortBy;
		getClassMemberList(params, id as string).then((res: any) => {
			setDataSource(res);
		});
	}, [orderBy, sortBy, triggerReload]);
	useEffect(() => {
		let params: any = {};
		if (orderBy1) params.orderby = orderBy1;
		if (sortBy1) params.sortby = sortBy1;
		getTimeList(params, id as string).then((res: any) => {
			setDataSource1(res);
		});
	}, [orderBy1, sortBy1, triggerReload1]);

	return (
		<>
			<Helmet>
				<title>Class View</title>
			</Helmet>
			<Layout
				title="Class View"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Departments', to: '/departments' },
				]}>
				<>
					<Collapse defaultActiveKey={['1']}>
						<Collapse.Panel header="Members" key="1">
							<form className="addForm" onSubmit={addMemberHandle} autoComplete="off">
								<button className="btn">
									<span className="material-icons-outlined"> add </span>
								</button>
								<AutoComplete
									setSelectId={setAddStudentId}
									searchHandle={(dhead: string) => searchUser('student', 0, 5, dhead)}
								/>
							</form>
							<div className={SC.table}>
								<Table onChange={tableChange} dataSource={dataSource} columns={columnsMember} sticky />
							</div>
							<Modal
								title="Confirm"
								visible={isModalVisible[0]}
								onOk={() => handleOk(0)}
								onCancel={() => handleCancel(0)}>
								Are you sure want to remove this student?
							</Modal>
						</Collapse.Panel>
						<Collapse.Panel header="Timetable" key="2">
							<div>
								<form className="addForm1" onSubmit={addTimeHandle}>
									<div>
										<label htmlFor="start">Start</label>
										<input type="datetime-local" name="start" id="start" />
									</div>
									<div>
										<label htmlFor="end">End</label>
										<input type="datetime-local" name="end" id="end" />
									</div>
									<button className="btn">ADD</button>
								</form>
							</div>
							<div className={SC.table}>
								<Table onChange={tableChange1} dataSource={dataSource1} columns={columnsTimetable} sticky />
							</div>
							<Modal
								title="Confirm"
								visible={isModalVisible[1]}
								onOk={() => handleOk(1)}
								onCancel={() => handleCancel(1)}>
								Are you sure want to remove this lesson?
							</Modal>
						</Collapse.Panel>
					</Collapse>
				</>
			</Layout>
		</>
	);
}
