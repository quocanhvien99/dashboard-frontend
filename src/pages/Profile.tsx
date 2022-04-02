import { Alert, Avatar, Modal, notification } from 'antd';
import React, { FormEventHandler, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { userType } from '../slices/user';
import SC from './Profile.module.scss';
import { changePassword as changePassApi, editProfile, getNewUserInfo } from '../api';
import { update as updateAction } from '../slices/user';

export default function Profile() {
	const dispatch = useDispatch();
	const userInfoState = useSelector((state: RootState) => state.user.userInfo);
	const userInfo = userInfoState as userType;
	const [showAbout, setShowAbout] = useState(true);
	const [alert, setAlert] = useState('');
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [isFetching, setIsFetching] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [ename, setEname] = useState<string>(userInfo.name);
	const [edob, setEdob] = useState<string>(userInfo.dob as string);
	const [egender, setEgender] = useState<string>(userInfo.gender as string);
	const [ephone, setEphone] = useState<string>(userInfo.phone as string);
	const [avatar, setAvatar] = useState<Blob | null>(null);

	const handleOk = () => {
		const formData = new FormData();
		ename && formData.append('name', ename);
		edob && formData.append('dob', edob);
		egender && formData.append('gender', egender);
		ephone && formData.append('phone', ephone);
		avatar && formData.append('profile_pic', avatar as Blob);

		editProfile(userInfo.id, formData)
			.then((res) => {
				notification['success']({
					message: 'success',
					description: 'successful',
				});
				getNewUserInfo(userInfo.id).then((res) => dispatch(updateAction(res)));
				setIsModalVisible(false);
			})
			.catch((err) => {
				notification['error']({
					message: 'error',
					description: err,
				});
			});
	};

	const changePassword: FormEventHandler = (e) => {
		e.preventDefault();
		switch ('') {
			case oldPass:
				return setAlert('Old password is empty!');
			case newPass:
				return setAlert('New password is empty!');
			case confirmPass:
				return setAlert('Confirm password is empty!');
		}
		if (newPass !== confirmPass) return setAlert('Passwords do not match!');
		setIsFetching(true);
		changePassApi(oldPass, newPass, userInfo.id.toString())
			.then((res) => {
				notification['success']({
					message: 'success',
					description: 'successful',
				});
			})
			.catch((err) => {
				setAlert(err);
			})
			.finally(() => setIsFetching(false));
	};

	return (
		<>
			<Helmet>
				<title>Profile</title>
			</Helmet>
			<Layout
				title="Profile"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Profile', to: '/profile' },
				]}>
				<>
					<div className={SC.userInfo}>
						<div className={SC.content}>
							<Avatar className={SC.avatar} size={100} icon={<UserOutlined />} src={userInfo.profile_pic}></Avatar>
							<div className={SC.center}>
								<p className={SC.name}>{userInfo.name}</p>
								<p className={SC.role}>{userInfo.role}</p>
							</div>
							<button className={SC.btn} style={{ background: '#FFBC53' }} onClick={() => setIsModalVisible(true)}>
								Edit
							</button>
						</div>
						<div className={SC.footer}>
							<div className={showAbout ? SC.active : ''} onClick={() => setShowAbout(true)}>
								About
							</div>
							<div className={!showAbout ? SC.active : ''} onClick={() => setShowAbout(false)}>
								Password
							</div>
						</div>
					</div>
					{showAbout && (
						<div className={SC.detail + ' ' + SC.Card}>
							<div className={SC.row}>
								<p className={SC.title}>personal detail</p>
								<div onClick={() => setIsModalVisible(true)}>
									<EditOutlined /> Edit
								</div>
							</div>
							<div className={SC.row}>
								<div className={SC.col}>Name</div>
								<div className={SC.col}>{userInfo.name}</div>
							</div>
							<div className={SC.row}>
								<div className={SC.col}>Date of Birth</div>
								<div className={SC.col}>{userInfo.dob || 'null'}</div>
							</div>
							<div className={SC.row}>
								<div className={SC.col}>Gender</div>
								<div className={SC.col}>{userInfo.gender || 'null'}</div>
							</div>
							<div className={SC.row}>
								<div className={SC.col}>Email</div>
								<div className={SC.col}>{userInfo.email}</div>
							</div>
							<div className={SC.row}>
								<div className={SC.col}>Mobile</div>
								<div className={SC.col}>{userInfo.phone || 'null'}</div>
							</div>
						</div>
					)}
					{!showAbout && (
						<form className={SC.Card + ' ' + SC.password} onSubmit={changePassword}>
							<div className={SC.title}>Change Password</div>
							{alert && (
								<Alert
									message={alert}
									type="error"
									style={{ marginBottom: '10px' }}
									showIcon
									closable
									onClose={() => setAlert('')}
								/>
							)}
							<label htmlFor="old">Old Password</label>
							<input type="password" name="old" id="old" value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
							<label htmlFor="new">New Password</label>
							<input type="password" name="new" id="new" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
							<label htmlFor="confirm">Confirm Password</label>
							<input
								type="password"
								name="confirm"
								id="confirm"
								value={confirmPass}
								onChange={(e) => setConfirmPass(e.target.value)}
							/>
							<button disabled={isFetching} className={SC.btn} style={{ background: '#FFBC53' }}>
								Save Changes
							</button>
						</form>
					)}
					<Modal
						className={SC.editprofile}
						title="Edit Profile"
						visible={isModalVisible}
						onOk={handleOk}
						onCancel={() => setIsModalVisible(false)}>
						<label htmlFor="ename">Name</label>
						<input type="text" name="ename" id="ename" value={ename} onChange={(e) => setEname(e.target.value)} />
						<label htmlFor="edob">Date of birth</label>
						<input
							type="text"
							name="edob"
							id="edob"
							value={edob?.toString()}
							onChange={(e) => setEdob(e.target.value)}
						/>
						<label htmlFor="egender">Gender</label>
						<input
							type="text"
							name="egender"
							id="egender"
							value={egender?.toString()}
							onChange={(e) => setEgender(e.target.value)}
						/>
						<label htmlFor="ephone">Phone</label>
						<input
							type="text"
							name="ephone"
							id="ephone"
							value={ephone?.toString()}
							onChange={(e) => setEphone(e.target.value)}
						/>
						<label htmlFor="eavatar">Avatar</label>
						<input
							type="file"
							name="eavatar"
							id="eavatar"
							onChange={(e) => {
								//@ts-ignore
								setAvatar(e.target.files[0]);
							}}
						/>
					</Modal>
				</>
			</Layout>
		</>
	);
}
