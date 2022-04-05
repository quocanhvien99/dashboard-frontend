import React from 'react';
import { Helmet } from 'react-helmet';
import Card1 from '../components/Card1';
import Layout from '../components/Layout';

export default function Score() {
	return (
		<>
			<Helmet>
				<title>Class View</title>
			</Helmet>
			<Layout
				title="Class View"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Departments', to: '/departments' },
				]}></Layout>
		</>
	);
}
