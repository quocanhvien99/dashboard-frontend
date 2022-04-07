import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
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
import Score from '../pages/Score';
import TimeTable from '../pages/TimeTable';

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
		element: <Home />,
	},
	{
		path: '/profile',
		element: <Profile />,
	},
	{
		path: '/students',
		element: <StudentList />,
	},
	{
		path: '/students/add',
		element: <StudentAdd />,
	},
	{
		path: '/teachers',
		element: <TeacherList />,
	},
	{
		path: '/teachers/add',
		element: <TeacherAdd />,
	},
	{
		path: '/department',
		element: <DepartmentList />,
	},
	{
		path: '/department/add',
		element: <DepartmentAdd />,
	},
	{
		path: '/department/edit/:did',
		element: <DepartmentEdit />,
	},
	{
		path: '/users/edit/:uid',
		element: <UserEdit />,
	},
	{
		path: '/subject/add',
		element: <SubjectAdd />,
	},
	{
		path: '/subject/',
		element: <SubjectList />,
	},
	{
		path: '/subject/edit/:id',
		element: <SubjectEdit />,
	},
	{
		path: '/subject/:id',
		element: <SubjectView />,
	},
	{
		path: '/class',
		element: <Class />,
	},
	{
		path: '/class/:id',
		element: <ClassView />,
	},
	{
		path: '/score',
		element: <Score />,
	},
	{
		path: '/schedule',
		element: <TimeTable />,
	},
];
export default routes;
