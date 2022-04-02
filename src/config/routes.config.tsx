import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import ProtectedRoute from '../components/ProtectedRoute';
import Profile from '../pages/Profile';
import StudentList from '../pages/StudentList';
import StudentAdd from '../pages/StudentAdd';

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
];
export default routes;
