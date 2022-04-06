import React, { ChangeEvent, FocusEvent, FormEventHandler, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import Card1 from '../components/Card1';
import Layout from '../components/Layout';
import '../components/Form.scss';
import { Col, notification } from 'antd';
import { addSubject, getDepartmentList } from '../api';
import Body from '../components/Body';

export default function SubjectAdd() {
	const [listDepartment, setListDepartment] = useState([]);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		addSubject(formData.get('id'), formData.get('name'), formData.get('did'))
			.then((res) =>
				notification['success']({
					message: 'Success',
					description: 'Subject information has been saved',
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
		getDepartmentList({}).then((res: any) => {
			setListDepartment(res);
		});
	}, []);

	return (
		<>
			<Helmet>
				<title>Add Subject</title>
			</Helmet>
			<Body
				title="add subject"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Subject', to: '/subject/' },
					{ title: 'Add', to: '/subject/add' },
				]}>
				<Card1>
					<form onSubmit={submit}>
						<Col xs={24} sm={12}>
							<label htmlFor="id">Subject ID</label>
							<input type="text" name="id" id="id" required />
						</Col>
						<Col xs={24} sm={12}>
							<label htmlFor="name">Subject Name</label>
							<input type="text" name="name" id="name" required />
						</Col>
						<Col xs={24} sm={12}>
							<label htmlFor="did">Department Name</label>
							<div className="select-custom">
								<select name="did" id="did">
									{listDepartment.map((x: any) => (
										<option value={x.id}>{x.dname}</option>
									))}
								</select>
								<span className="material-icons-outlined"> arrow_drop_down </span>
							</div>
						</Col>
						<button className="btn">Submit</button>
					</form>
				</Card1>
			</Body>
		</>
	);
}
