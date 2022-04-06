import { Col, notification, Row } from 'antd';
import React, { FormEventHandler } from 'react';
import { Helmet } from 'react-helmet';
import Card1 from '../components/Card1';
import Layout from '../components/Layout';
import '../components/Form.scss';
import SC from '../components/Card1.module.scss';
import { addUser } from '../api';
import Body from '../components/Body';

export default function TeacherAdd() {
	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		if (formData.get('password') !== formData.get('confirm'))
			return notification['error']({
				message: 'Error',
				description: 'The two passwords that you entered do not match!',
			});

		formData.delete('confirm');
		addUser(formData, 'teacher')
			.then((res) =>
				notification['success']({
					message: 'Success',
					description: 'Teacher information has been saved',
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
				<title>Add Teachers</title>
			</Helmet>
			<Body
				title="add teachers"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Teachers', to: '/teachers/' },
					{ title: 'Add', to: '/teachers/add' },
				]}>
				<Card1>
					<form onSubmit={submit}>
						<h5 className={SC.title}>
							<span>Teacher Information</span>
						</h5>
						<Row gutter={24}>
							<Col xs={24} sm={12}>
								<label htmlFor="name">Name</label>
								<input type="text" name="name" id="name" required />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="gender">Gender</label>
								<div className="select-custom">
									<select name="gender" id="gender">
										<option value="">Select Gender</option>
										<option value="female">Female</option>
										<option value="male">Male</option>
										<option value="others">Others</option>
									</select>
									<span className="material-icons-outlined"> arrow_drop_down </span>
								</div>
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="dob">Date of Birth</label>
								<input type="date" name="dob" id="dob" />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="phone">Phone</label>
								<input type="text" name="phone" id="phone" />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="profile_pic">Teacher Image</label>
								<input type="file" name="profile_pic" id="profile_pic" />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="address">Address</label>
								<input type="text" name="address" id="address" />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="city">City</label>
								<input type="text" name="city" id="city" />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="state">State</label>
								<input type="text" name="state" id="state" />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="zip">Zip Code</label>
								<input type="text" name="zip" id="zip" />
							</Col>
							<Col xs={24} sm={12}>
								<label htmlFor="country">Country</label>
								<input type="text" name="country" id="country" />
							</Col>
						</Row>
						<h5 className={SC.title}>
							<span>Login Detail</span>
						</h5>
						<Col span={24} sm={12}>
							<label htmlFor="email">Email</label>
							<input type="email" name="email" id="email" required />
						</Col>
						<Col span={24} sm={12}>
							<label htmlFor="password">Password</label>
							<input type="password" name="password" id="password" required />
						</Col>
						<Col span={24} sm={12}>
							<label htmlFor="confirm">Confirm password</label>
							<input type="password" name="confirm" id="confirm" required />
						</Col>
						<button className="btn">Submit</button>
					</form>
				</Card1>
			</Body>
		</>
	);
}
