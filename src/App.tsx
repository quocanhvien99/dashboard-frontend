import React from 'react';
import './App.scss';
import 'antd/dist/antd.min.css';
import routes from './config/routes.config';
import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Routes>
				{routes.map((route) => (
					<Route key={route.path} path={route.path} element={route.element} />
				))}
			</Routes>
		</div>
	);
}

export default App;
