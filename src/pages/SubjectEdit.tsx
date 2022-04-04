import { Col, notification } from 'antd';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { editSubject, getDepartmentList, getSubjectInfo } from '../api';
import Card1 from '../components/Card1';
import Layout from '../components/Layout';

export default function SubjectEdit() {
	const { id } = useParams();
	const [listDepartment, setListDepartment] = useState([]);
	const [initValue, setInit] = useState<any>({});
	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		editSubject(id as string, formData.get('name'), formData.get('did'))
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
		getSubjectInfo(id as string).then((res) => setInit(res));
	}, []);

	return (
		<>
			<Helmet>
				<title>Edit Subject</title>
			</Helmet>
			<Layout
				title="edit subjects"
				breadcrumb={[
					{ title: 'Subjects', to: '/subject/' },
					{ title: 'Edit', to: `/subject/edit/${id}` },
				]}>
				<Card1>
					<form onSubmit={submit}>
						<Col xs={24} sm={12}>
							<label htmlFor="name">Subject Name</label>
							<input type="text" name="name" id="name" required defaultValue={initValue.name} />
						</Col>
						<Col xs={24} sm={12}>
							<label htmlFor="did">Department Name</label>
							<div className="select-custom">
								<select name="did" id="did">
									{listDepartment.map((x: any) => (
										<option value={x.id} selected={x.dname === initValue.dname}>
											{x.dname}
										</option>
									))}
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
