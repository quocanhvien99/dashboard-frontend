import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import './Layout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { userType } from '../slices/user';
import { Outlet, useNavigate } from 'react-router-dom';
import nav from '../config/nav.config';
import { logout as logoutAction } from '../slices/user';
import { setData as setScheduleData } from '../slices/schedule';
import { Footer } from 'antd/lib/layout/layout';
import { getTimetable } from '../api';

const { Header, Sider, Content } = Layout;

function LayoutCustom() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const ref = useRef<HTMLDivElement>(null);

	const [collapsed, setCollapsed] = useState(false);
	const [collapsedWidth, setCollapsedWidth] = useState<undefined | number>(undefined);
	const [collapsedUser, setCollapsedUser] = useState(false);
	const userInfoState = useSelector((state: RootState) => state.user.userInfo);
	const userInfo = userInfoState as userType;

	console.log('sdfsdfsdf');

	const logout = () => {
		dispatch(logoutAction());
	};
	useEffect(() => {
		getTimetable().then((res: any) => {
			dispatch(setScheduleData(res));
		});

		//Xử lý collapse chỗ user
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setCollapsedUser(false);
			}
		}
		// Bind
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// dispose
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dispatch]);

	useEffect(() => {
		if (!userInfoState) navigate('/signin');
	}, [userInfoState, navigate]);

	return (
		<Layout>
			<Sider
				collapsible
				collapsed={collapsed}
				trigger={null}
				breakpoint="md"
				collapsedWidth={collapsedWidth}
				width={300}
				onBreakpoint={(broken) => {
					setCollapsed(broken);
					if (broken) setCollapsedWidth(0);
					else setCollapsedWidth(undefined);
				}}
				className="sider-menu">
				{collapsed ? (
					<div className="logo" style={{ display: 'flex', justifyContent: 'center' }}>
						<img src="/logo-small.png" alt="logo" />
					</div>
				) : (
					<div className="logo">
						<img src="/logo.png" alt="logo" />
					</div>
				)}
				<Menu theme="light" className="sider-menu" defaultSelectedKeys={['0']} mode="inline">
					{nav[(userInfo as userType).role].map((x: any, i: string) => {
						if (x.submenu)
							return (
								<SubMenu key={i} icon={<x.icon />} title={x.title}>
									{x.submenu.map((y: any, iy: string) => (
										<Menu.Item key={`${i}${iy}`} onClick={() => navigate(y.to)}>
											{y.title}
										</Menu.Item>
									))}
								</SubMenu>
							);
						return (
							<Menu.Item key={i} icon={<x.icon />} onClick={() => navigate(x.to)}>
								{x.title}
							</Menu.Item>
						);
					})}
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Header className="layout-background header" style={{ padding: '0 16px' }}>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: () => setCollapsed(!collapsed),
					})}
					<div ref={ref} className="user-management">
						<div onClick={() => setCollapsedUser(!collapsedUser)}>
							<Avatar icon={<UserOutlined />} src={'http://localhost:9000' + (userInfo as userType).profile_pic} />
							<DownOutlined
								style={{ fontSize: 'small', marginLeft: '5px', color: '#18AEFB', transition: 'all 0.5s' }}
								className={collapsedUser ? 'collapsed' : ''}
							/>
						</div>
						<ul className="drop-down" style={{ display: collapsedUser ? 'block' : 'none' }}>
							<li>
								<Avatar
									size="large"
									icon={<UserOutlined />}
									src={'http://localhost:9000' + (userInfo as userType).profile_pic}></Avatar>
								<div>
									<span className="name">{userInfo.name}</span>
									<br />
									<span className="role">{userInfo.role}</span>
								</div>
							</li>
							<li onClick={() => navigate('/profile')}>My profile</li>
							{/* <li onClick={() => navigate('/')}>Inbox</li> */}
							<li onClick={logout}>Logout</li>
						</ul>
					</div>
				</Header>
				<Content
					className="layout-background"
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
					}}>
					<Outlet />
				</Content>
				<Footer style={{ textAlign: 'center' }}></Footer>
			</Layout>
		</Layout>
	);
}

export default LayoutCustom;
