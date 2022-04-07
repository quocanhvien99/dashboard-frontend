import React, { FormEventHandler, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Card1 from '../components/Card1';
import '../components/Form.scss';
import { Col, notification, Row } from 'antd';
import { editProfile, getUserInfo } from '../api';
import { useParams } from 'react-router-dom';
import Body from '../components/Body';

export default function UserEdit() {
	const { uid } = useParams();
	const [userInfo, setUserInfo] = useState<any>({});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		editProfile(userInfo.id, formData)
			.then((res) => {
				notification['success']({
					message: 'success',
					description: 'successful',
				});
			})
			.catch((err) => {
				notification['error']({
					message: 'error',
					description: err,
				});
			});
	};
	useEffect(() => {
		getUserInfo(parseInt(uid as string)).then((res: any) => {
			let dob = new Date(res.dob);
			res.dob = `${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`;
			setUserInfo(res);
		});
	}, []);

	return (
		<>
			<Helmet>
				<title>Edit User</title>
			</Helmet>
			<Body
				title="edit users"
				breadcrumb={[
					{ title: 'Users', to: '/users/' },
					{ title: 'Edit', to: `/users/edit/${uid}` },
				]}>
				<Card1>
					<form onSubmit={submit}>
						<Row gutter={24}>
							<Col xs={24} sm={12}>
								<label htmlFor="name">Name</label>
								<input type="text" name="name" id="name" defaultValue={userInfo.name} />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="dob">Date of birth</label>
								<input type="text" name="dob" id="dob" defaultValue={userInfo.dob} />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="gender">Gender</label>
								<div className="select-custom">
									<select name="gender" id="gender">
										<option value="female" selected={userInfo.gender === 'female'}>
											Female
										</option>
										<option value="male" selected={userInfo.gender === 'male'}>
											Male
										</option>
										<option value="others" selected={userInfo.gender === 'others'}>
											Others
										</option>
									</select>
									<span className="material-icons-outlined"> arrow_drop_down </span>
								</div>
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="role">Role</label>
								<div className="select-custom">
									<select name="role" id="role">
										<option value="admin" selected={userInfo.role === 'admin'}>
											Admin
										</option>
										<option value="teacher" selected={userInfo.role === 'teacher'}>
											Teacher
										</option>
										<option value="student" selected={userInfo.role === 'student'}>
											Student
										</option>
									</select>
									<span className="material-icons-outlined"> arrow_drop_down </span>
								</div>
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="phone">Phone</label>
								<input type="text" name="phone" id="phone" defaultValue={userInfo.phone} />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="avatar">Avatar</label>
								<input type="file" name="avatar" id="avatar" />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="address">Address</label>
								<input type="text" name="address" id="address" defaultValue={userInfo.address} />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="city">City</label>
								<input type="text" name="city" id="city" defaultValue={userInfo.city} />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="state">State</label>
								<input type="text" name="state" id="state" defaultValue={userInfo.state} />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="zip">Zip Code</label>
								<input type="text" name="zip" id="zip" defaultValue={userInfo.zip} />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="country">Country</label>
								<input type="text" name="country" id="country" defaultValue={userInfo.country} />
							</Col>
						</Row>
						<button className="btn">Submit</button>
					</form>
				</Card1>
			</Body>
		</>
	);
}
