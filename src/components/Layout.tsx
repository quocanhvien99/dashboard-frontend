import React, { ReactChildren, useEffect, useState } from 'react';
import { Avatar, Breadcrumb, Layout, Menu } from 'antd';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	DownOutlined,
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import './Layout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { userType } from '../slices/user';
import { Link, useNavigate } from 'react-router-dom';
import nav from '../config/nav.config';
import { logout as logoutAction } from '../slices/user';
import Title from 'antd/lib/typography/Title';

const { Header, Sider, Content } = Layout;

interface Props {
	children: JSX.Element;
	title: string;
	breadcrumb: { title: string; to: string }[];
}

function LayoutCustom({ children, title, breadcrumb }: Props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [collapsed, setCollapsed] = useState(false);
	const [collapsedWidth, setCollapsedWidth] = useState<undefined | number>(undefined);
	const [collapsedUser, setCollapsedUser] = useState(false);
	const userInfo = useSelector((state: RootState) => state.user.userInfo);

	const logout = () => {
		dispatch(logoutAction());
	};
	useEffect(() => {
		if (!userInfo) navigate('/signin');
	}, [userInfo]);

	return (
		<Layout>
			<Sider
				collapsible
				collapsed={collapsed}
				trigger={null}
				breakpoint="md"
				collapsedWidth={collapsedWidth}
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
										<Menu.Item key={`${i}${iy}`}>{y.title}</Menu.Item>
									))}
								</SubMenu>
							);
						return (
							<Menu.Item key={i} icon={<x.icon />}>
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
					<div className="user-management" onClick={() => setCollapsedUser(!collapsedUser)}>
						<Avatar icon={<UserOutlined />} src={(userInfo as userType).profile_pic} />
						<DownOutlined
							style={{ fontSize: 'small', marginLeft: '5px', color: '#18AEFB', transition: 'all 0.5s' }}
							className={collapsedUser ? 'collapsed' : ''}
						/>
						<ul className="drop-down" style={{ display: collapsedUser ? 'block' : 'none' }}>
							<li>
								<Avatar size="large" icon={<UserOutlined />} src={(userInfo as userType).profile_pic}></Avatar>
								<div>
									<span className="name">{'Quoc Anh'}</span>
									<br />
									<span className="role">{'Teacher'}</span>
								</div>
							</li>
							<li onClick={() => navigate('/')}>My profile</li>
							<li onClick={() => navigate('/')}>Inbox</li>
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
					<Title>{title}</Title>
					<Breadcrumb>
						{breadcrumb.map((x) => (
							<Breadcrumb.Item>
								<Link to={x.to}>{x.title}</Link>
							</Breadcrumb.Item>
						))}
					</Breadcrumb>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
}

export default LayoutCustom;
