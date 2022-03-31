import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Breadcrumb, Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import './Layout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { userType } from '../slices/user';
import { Link, useNavigate } from 'react-router-dom';
import nav from '../config/nav.config';
import { logout as logoutAction } from '../slices/user';
import Title from 'antd/lib/typography/Title';
import { Footer } from 'antd/lib/layout/layout';

const { Header, Sider, Content } = Layout;

interface Props {
	children: JSX.Element;
	title: string;
	breadcrumb: { title: string; to: string }[];
}

function LayoutCustom({ children, title, breadcrumb }: Props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const ref = useRef<HTMLDivElement>(null);

	const [collapsed, setCollapsed] = useState(false);
	const [collapsedWidth, setCollapsedWidth] = useState<undefined | number>(undefined);
	const [collapsedUser, setCollapsedUser] = useState(false);
	const userInfo = useSelector((state: RootState) => state.user.userInfo);

	const logout = () => {
		dispatch(logoutAction());
	};
	useEffect(() => {
		if (!userInfo) navigate('/signin');
	}, [userInfo, navigate]);
	useEffect(() => {
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
	}, []);

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
					<div ref={ref} className="user-management">
						<div onClick={() => setCollapsedUser(!collapsedUser)}>
							<Avatar icon={<UserOutlined />} src={(userInfo as userType).profile_pic} />
							<DownOutlined
								style={{ fontSize: 'small', marginLeft: '5px', color: '#18AEFB', transition: 'all 0.5s' }}
								className={collapsedUser ? 'collapsed' : ''}
							/>
						</div>
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
					<Breadcrumb className="breadcrumb">
						{breadcrumb.map((x, i) => (
							<Breadcrumb.Item key={i}>
								<Link to={x.to}>{x.title}</Link>
							</Breadcrumb.Item>
						))}
					</Breadcrumb>
					{children}
				</Content>
				<Footer style={{ textAlign: 'center' }}></Footer>
			</Layout>
		</Layout>
	);
}

export default LayoutCustom;
