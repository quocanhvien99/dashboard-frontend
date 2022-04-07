import React, { useState } from 'react';
import { Alert, Button, Col, Form, Input, notification, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as api from '../api';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useEffect } from 'react';
import Title from 'antd/lib/typography/Title';

function Signup() {
	const [isFetching, setIsFetching] = useState(false);
	const [alert, setAlert] = useState('');
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) navigate('/');
	}, [isLoggedIn, navigate]);

	function onFinish(values: { name: string; email: string; password: string }) {
		setIsFetching(true);
		api
			.register(values.name, values.email, values.password)
			.then((_) => {
				notification['success']({
					message: 'Success',
					description: 'Your account has been successfully created!',
				});
				navigate('/signin');
			})
			.catch((err) => {
				setAlert(err);
			})
			.finally(() => setIsFetching(false));
	}

	return (
		<>
			<Helmet>
				<title>Sign up</title>
			</Helmet>
			<Row justify="center" style={{ margin: '40px' }}>
				<Col xs={24} sm={12} md={10} lg={8} xl={6}>
					<Title style={{ textAlign: 'center' }}>Sign Up</Title>
					{alert && <Alert message={alert} type="error" showIcon closable />}
					<Form layout="vertical" name="regster" onFinish={onFinish} style={{ marginTop: '30px ' }}>
						<Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
							<Input />
						</Form.Item>
						<Form.Item
							name="email"
							label="E-mail"
							rules={[
								{
									type: 'email',
									message: 'The input is not valid E-mail!',
								},
								{
									required: true,
									message: 'Please input your E-mail!',
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							name="password"
							label="Password"
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
							hasFeedback>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name="confirm"
							label="Confirm Password"
							dependencies={['password']}
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Please confirm your password!',
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error('The two passwords that you entered do not match!'));
									},
								}),
							]}>
							<Input.Password />
						</Form.Item>
						<Form.Item>
							<Button disabled={isFetching} type="primary" htmlType="submit" className="login-form-button">
								Sign up
							</Button>{' '}
							Or <Link to="/signin">sign in now!</Link>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</>
	);
}

export default Signup;
