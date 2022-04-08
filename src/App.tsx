import React from 'react';
import './App.scss';
import 'antd/dist/antd.min.css';
import routes from './config/routes.config';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	return (
		<div className="App">
			<Routes>
				{routes.map((route) => {
					if (route.noLayout) return <Route key={route.path} path={route.path} element={route.element} />;
					return false;
				})}
				<Route
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}>
					<>
						{routes.map((route) => {
							if (!route.noLayout) return <Route key={route.path} path={route.path} element={route.element} />;
							return false;
						})}
					</>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
