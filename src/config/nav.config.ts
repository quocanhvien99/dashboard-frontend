import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

const nav: { [key: string]: any } = {
	admin: [
		{ title: 'dashboard', to: '/', icon: DashboardOutlined },
		{
			title: 'students',
			submenu: [
				{ title: 'student list', to: '/students' },
				{ title: 'student add', to: '/students/add' },
			],
			icon: UserOutlined,
		},
		{
			title: 'teachers',
			submenu: [
				{ title: 'teacher list', to: '/teachers' },
				{ title: 'teacher add', to: '/teachers/add' },
			],
			icon: UserOutlined,
		},
		{
			title: 'department',
			submenu: [
				{ title: 'department list', to: '/department' },
				{ title: 'department add', to: '/department/add' },
			],
			icon: UserOutlined,
		},
	],
	teacher: [
		{
			title: 'dashboard',
			to: '/',
			icon: UserOutlined,
		},
		{
			title: 'subjects',
			submenu: [
				{ title: 'subject list', to: '/subject' },
				{ title: 'subject add', to: '/subject/add' },
			],
			icon: UserOutlined,
		},
		{
			title: 'classes',
			submenu: [
				{ title: 'class list', to: '/class' },
				{ title: 'class add', to: '/class/add' },
			],
			icon: UserOutlined,
		},
		{
			title: 'schedule',
			to: '/schedule',
			icon: UserOutlined,
		},
	],
	student: [
		{
			title: 'schedule',
			to: '/schedule',
			icon: UserOutlined,
		},
		{
			title: 'score',
			to: '/score',
			icon: UserOutlined,
		},
	],
};

export default nav;
