import React, { ChangeEvent, FormEventHandler, FocusEvent, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Card1 from '../components/Card1';
import '../components/Form.scss';
import { Col, notification } from 'antd';
import { editDepartment, getDepartmentInfo, searchUser } from '../api';
import { useParams } from 'react-router-dom';
import Body from '../components/Body';
import AutoComplete from '../components/AutoComplete';

export default function DepartmentEdit() {
	const { did } = useParams();
	const [dhead, setDhead] = useState('');
	const [dheadId, setDheadId] = useState('');
	const [dname, setDname] = useState('');

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		let dHeadId = '';
		if (dhead) dHeadId = dheadId;
		editDepartment(parseInt(did as string), dname, dHeadId)
			.then((res) =>
				notification['success']({
					message: 'Success',
					description: 'Department information has been saved',
				})
			)
			.catch((err) =>
				notification['error']({
					message: 'Error',
					description: err,
				})
			);
	};
	useEffect(() => {
		getDepartmentInfo(parseInt(did as string)).then((res: any) => {
			setDhead(res.dhead);
			setDname(res.dname);
			setDheadId(res.dhead_id);
		});
	}, []);

	return (
		<>
			<Helmet>
				<title>Edit Department</title>
			</Helmet>
			<Body
				title="edit departments"
				breadcrumb={[
					{ title: 'Departments', to: '/department/' },
					{ title: 'Edit', to: `/department/edit/${did}` },
				]}>
				<Card1>
					<form onSubmit={submit}>
						<Col xs={24} sm={12}>
							<label htmlFor="dname">Department Name</label>
							<input
								type="text"
								name="dname"
								id="dname"
								required
								value={dname}
								onChange={(e) => setDname(e.currentTarget.value)}
							/>
						</Col>
						<Col xs={24} sm={12}>
							<AutoComplete
								setSelectId={setDheadId}
								searchHandle={(dhead: string) => searchUser('teacher', 0, 5, dhead)}
								label="Head of Department"
							/>
						</Col>
						<button className="btn" style={{ marginTop: '20px' }}>
							Submit
						</button>
					</form>
				</Card1>
			</Body>
		</>
	);
}
