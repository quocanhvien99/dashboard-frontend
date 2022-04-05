import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import ProtectedRoute from '../components/ProtectedRoute';
import Profile from '../pages/Profile';
import StudentList from '../pages/StudentList';
import StudentAdd from '../pages/StudentAdd';
import TeacherAdd from '../pages/TeacherAdd';
import DepartmentAdd from '../pages/DepartmentAdd';
import UserEdit from '../pages/UserEdit';
import TeacherList from '../pages/TeacherList';
import DepartmentList from '../pages/DepartmentList';
import DepartmentEdit from '../pages/DepartmentEdit';
import SubjectAdd from '../pages/SubjectAdd';
import SubjectList from '../pages/SubjectList';
import SubjectEdit from '../pages/SubjectEdit';
import Class from '../pages/Class';
import SubjectView from '../pages/SubjectView';
import ClassView from '../pages/ClassView';

const routes = [
	{
		path: '/signin',
		element: <Signin />,
	},
	{
		path: '/signup',
		element: <Signup />,
	},
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
	},
	{
		path: '/profile',
		element: (
			<ProtectedRoute>
				<Profile />
			</ProtectedRoute>
		),
	},
	{
		path: '/students',
		element: (
			<ProtectedRoute>
				<StudentList />
			</ProtectedRoute>
		),
	},
	{
		path: '/students/add',
		element: (
			<ProtectedRoute>
				<StudentAdd />
			</ProtectedRoute>
		),
	},
	{
		path: '/teachers',
		element: (
			<ProtectedRoute>
				<TeacherList />
			</ProtectedRoute>
		),
	},
	{
		path: '/teachers/add',
		element: (
			<ProtectedRoute>
				<TeacherAdd />
			</ProtectedRoute>
		),
	},
	{
		path: '/department',
		element: (
			<ProtectedRoute>
				<DepartmentList />
			</ProtectedRoute>
		),
	},
	{
		path: '/department/add',
		element: (
			<ProtectedRoute>
				<DepartmentAdd />
			</ProtectedRoute>
		),
	},
	{
		path: '/department/edit/:uid',
		element: (
			<ProtectedRoute>
				<DepartmentEdit />
			</ProtectedRoute>
		),
	},
	{
		path: '/users/edit/:uid',
		element: (
			<ProtectedRoute>
				<UserEdit />
			</ProtectedRoute>
		),
	},
	{
		path: '/subject/add',
		element: (
			<ProtectedRoute>
				<SubjectAdd />
			</ProtectedRoute>
		),
	},
	{
		path: '/subject/',
		element: (
			<ProtectedRoute>
				<SubjectList />
			</ProtectedRoute>
		),
	},
	{
		path: '/subject/edit/:id',
		element: (
			<ProtectedRoute>
				<SubjectEdit />
			</ProtectedRoute>
		),
	},
	{
		path: '/subject/:id',
		element: (
			<ProtectedRoute>
				<SubjectView />
			</ProtectedRoute>
		),
	},
	{
		path: '/class',
		element: (
			<ProtectedRoute>
				<Class />
			</ProtectedRoute>
		),
	},
	{
		path: '/class/:id',
		element: (
			<ProtectedRoute>
				<ClassView />
			</ProtectedRoute>
		),
	},
];
export default routes;
