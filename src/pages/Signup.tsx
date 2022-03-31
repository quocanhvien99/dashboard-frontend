import React, { useState } from 'react';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as api from '../api';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useEffect } from 'react';
import Title from 'antd/lib/typography/Title';

function Signup() {
	const [isFetching, setIsFetching] = useState(false);
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) navigate('/');
	}, []);

	function onFinish(values: { name: string; email: string; password: string }) {
		setIsFetching(true);
		api
			.register(values.name, values.email, values.password)
			.then((_) => {
				notification['success']({
					message: 'Thành công',
					description: 'Đăng ký thành công chuyển sang trang đăng nhập',
				});
				navigate('/login');
			})
			.catch((err) => {
				notification['error']({
					message: 'Lỗi',
					description: err,
				});
			})
			.finally(() => setIsFetching(false));
	}

	return (
		<>
			<Helmet>
				<title>Đăng ký</title>
			</Helmet>
			<Row justify="center" style={{ margin: '40px' }}>
				<Col md={6}>
					<Title style={{ textAlign: 'center' }}>Đăng ký</Title>
					<Form name="regster" onFinish={onFinish}>
						<Form.Item name="name" label="Họ tên" rules={[{ required: true, message: 'Xin hãy nhập họ tên!' }]}>
							<Input />
						</Form.Item>
						<Form.Item
							name="email"
							label="E-mail"
							rules={[
								{ type: 'email', message: 'Email không hợp lệ' },
								{ required: true, message: 'Xin hãy nhập email!' },
							]}
							hasFeedback>
							<Input />
						</Form.Item>
						<Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Xin hãy nhập mật khẩu!' }]}>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name="confirm"
							label="Xác nhận mật khẩu"
							dependencies={['password']}
							hasFeedback
							rules={[
								{ required: true, message: 'Xin xác nhận lại mật khẩu!' },
								//@ts-ignore
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error('Mật khẩu xác nhận không chính xác!'));
									},
								}),
							]}>
							<Input.Password />{' '}
						</Form.Item>
						<Form.Item>
							<Button disabled={isFetching} type="primary" htmlType="submit" className="login-form-button">
								Đăng ký
							</Button>{' '}
							Hoặc <Link to="/signin">đăng nhập!</Link>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</>
	);
}

export default Signup;
