import { Alert, Avatar, Modal, notification } from 'antd';
import React, { FormEventHandler, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { userType } from '../slices/user';
import SC from './Profile.module.scss';
import { changePassword as changePassApi, editProfile, getUserInfo } from '../api';
import { update as updateAction } from '../slices/user';
import Body from '../components/Body';

export default function Profile() {
	const dispatch = useDispatch();
	const ref = useRef<HTMLFormElement>(null);

	const userInfoState = useSelector((state: RootState) => state.user.userInfo);
	const userInfo = userInfoState as userType;
	const [showAbout, setShowAbout] = useState(true);
	const [alert, setAlert] = useState('');
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [isFetching, setIsFetching] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleOk = () => {
		const formData = new FormData(ref.current as HTMLFormElement);
		// ename && formData.append('name', ename);
		// edob && formData.append('dob', edob);
		// egender && formData.append('gender', egender);
		// ephone && formData.append('phone', ephone);
		// avatar && formData.append('profile_pic', avatar as Blob);

		editProfile(userInfo.id, formData)
			.then((res) => {
				notification['success']({
					message: 'success',
					description: 'successful',
				});
				getUserInfo(userInfo.id).then((res) => dispatch(updateAction(res)));
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
			<Body
				title="Profile"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Profile', to: '/profile' },
				]}>
				<>
					<div className={SC.userInfo}>
						<div className={SC.content}>
							<Avatar
								className={SC.avatar}
								size={100}
								icon={<UserOutlined />}
								src={'http://localhost:9000' + userInfo.profile_pic}></Avatar>
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
								<div className={SC.col}>{userInfo.dob?.split('T')[0] || 'null'}</div>
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
						<form ref={ref}>
							<label htmlFor="name">Name</label>
							<input type="text" name="name" id="name" defaultValue={userInfo.name} />
							<label htmlFor="dob">Date of birth</label>
							<input
								type="date"
								name="dob"
								id="dob"
								defaultValue={new Date(userInfo.dob as string).toISOString().split('T')[0]}
							/>
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
							<label htmlFor="phone">Phone</label>
							<input type="text" name="phone" id="phone" defaultValue={userInfo.phone as string} />
							<label htmlFor="avatar">Avatar</label>
							<input type="file" name="avatar" id="avatar" />
							<label htmlFor="address">Address</label>
							<input type="text" name="address" id="address" defaultValue={userInfo.address as string} />
							<label htmlFor="city">City</label>
							<input type="text" name="city" id="city" defaultValue={userInfo.city as string} />
							<label htmlFor="state">State</label>
							<input type="text" name="state" id="state" defaultValue={userInfo.state as string} />
							<label htmlFor="zip">Zip Code</label>
							<input type="text" name="zip" id="zip" defaultValue={userInfo.zip as string} />
							<label htmlFor="country">Country</label>
							<input type="text" name="country" id="country" defaultValue={userInfo.country as string} />
						</form>
					</Modal>
				</>
			</Body>
		</>
	);
}
