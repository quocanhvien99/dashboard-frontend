import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';

export default function StudentAdd() {
	return (
		<>
			<Helmet>
				<title>Add Students</title>
			</Helmet>
			<Layout
				title="add students"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Students', to: '/students/' },
					{ title: 'Add', to: '/students/add' },
				]}>
				<></>
			</Layout>
		</>
	);
}
