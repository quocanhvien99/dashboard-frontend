import React, { ChangeEvent, FocusEvent, FormEventHandler, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import Card1 from '../components/Card1';
import Layout from '../components/Layout';
import '../components/Form.scss';
import { Col, notification } from 'antd';
import { addSubject, getDepartmentList } from '../api';

export default function DepartmentAdd() {
	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		addSubject(sid, sname, parseFloat(did))
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

	return (
		<>
			<Helmet>
				<title>Add Subject</title>
			</Helmet>
			<Layout
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
							<input
								type="text"
								name="id"
								id="id"
								required
								value={sid}
								onChange={(e) => setSid(e.currentTarget.value)}
							/>
						</Col>
						<Col xs={24} sm={12}>
							<label htmlFor="name">Subject Name</label>
							<input
								type="text"
								name="name"
								id="name"
								required
								value={sname}
								onChange={(e) => setSname(e.currentTarget.value)}
							/>
						</Col>
						<Col xs={24} sm={12}>
							<label htmlFor="dname">Department Name</label>
							<div className="select-custom">
								<select name="dname" id="dname">
									<option value="female">Female</option>
									<option value="male">Male</option>
									<option value="others">Others</option>
								</select>
								<span className="material-icons-outlined"> arrow_drop_down </span>
							</div>
						</Col>
						<button className="btn">Submit</button>
					</form>
				</Card1>
			</Layout>
		</>
	);
}
