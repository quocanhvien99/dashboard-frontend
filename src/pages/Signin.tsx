import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import { Helmet } from 'react-helmet';
import * as api from '../api';
import { login } from '../slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';

function Signin() {
	const [isFetching, setIsFetching] = useState(false);

	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/');
		}
	}, [isLoggedIn]);

	function onFinish(values: { email: string; password: string; remember: true }) {
		setIsFetching(true);
		api
			.login(values.email, values.password)
			.then((res) => {
				dispatch(login(res));
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
				<title>Đăng nhập</title>
			</Helmet>
			<Row justify="center" style={{ margin: '40px' }}>
				<Col md={6}>
					<Title style={{ textAlign: 'center' }}>Đăng nhập</Title>
					<Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
						<Form.Item
							name="email"
							rules={[
								{ type: 'email', message: 'Email không hợp lệ' },
								{ required: true, message: 'Hãy nhập email!' },
							]}>
							<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
						</Form.Item>
						<Form.Item name="password" rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}>
							<Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Mật khẩu" />
						</Form.Item>
						<Form.Item>
							<Form.Item name="remember" valuePropName="checked" noStyle>
								<Checkbox>Ghi nhớ</Checkbox>
							</Form.Item>

							<Link className="login-form-forgot" to="/">
								Quên mật khẩu
							</Link>
						</Form.Item>

						<Form.Item>
							<Button disabled={isFetching} type="primary" htmlType="submit" className="login-form-button">
								Đăng nhập
							</Button>{' '}
							Hoặc <Link to="/signup">đăng ký!</Link>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</>
	);
}

export default Signin;
