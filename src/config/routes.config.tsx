import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import ProtectedRoute from '../components/ProtectedRoute';

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
];
export default routes;
