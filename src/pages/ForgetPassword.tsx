import { Col, notification, Row } from 'antd';
import React, { FormEventHandler, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { resetPass, sendCode as sendCodeAPI } from '../api';
import '../components/Form.scss';

export default function ForgetPassword() {
	const navigate = useNavigate();
	const ref = useRef<HTMLButtonElement>(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		//@ts-ignore
		resetPass(email, password, code)
			.then((res) => {
				notification['success']({
					message: 'Success',
					description: 'Success',
				});
				navigate('/signin');
			})
			.catch((err) =>
				notification['error']({
					message: 'Error',
					description: err,
				})
			);
	};
	const sendCode = () => {
		sendCodeAPI(email)
			.then((res) =>
				notification['success']({
					message: 'Success',
					description: 'Success',
				})
			)
			.catch((err) =>
				notification['error']({
					message: 'Error',
					description: err,
				})
			);
		const btn = ref.current;
		let time = 30;
		btn!.disabled = true;
		const intervalId = setInterval(() => {
			time--;
			btn!.innerText = time.toString();
			if (time === 0) {
				clearInterval(intervalId);
				btn!.disabled = false;
				btn!.innerText = 'send';
			}
		}, 1000);
	};

	return (
		<>
			<Helmet>
				<title>Forget Password</title>
			</Helmet>
			<Row justify="center" style={{ margin: '40px' }}>
				<Col xs={24} sm={12} md={10} lg={8} xl={6}>
					<form onSubmit={onSubmit} className="forget">
						<input
							type="email"
							placeholder="Input your email"
							required
							value={email}
							onChange={(e) => setEmail(e.currentTarget.value)}
						/>
						<input
							type="password"
							placeholder="Input your new password"
							required
							value={password}
							onChange={(e) => setPassword(e.currentTarget.value)}
						/>
						<div className="sendCode">
							<input type="text" placeholder="code" value={code} onChange={(e) => setCode(e.currentTarget.value)} />
							<button ref={ref} onClick={sendCode}>
								send
							</button>
						</div>
						<button type="submit">Submit</button>
					</form>
				</Col>
			</Row>
		</>
	);
}
