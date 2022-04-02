import { Select } from 'antd';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import SC from './List.module.scss';

export default function StudentList() {
	const [value, setValue] = useState(10);

	return (
		<>
			<Helmet>
				<title>Student List</title>
			</Helmet>
			<Layout
				title="Student List"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Students', to: '/students' },
				]}>
				<div className={SC.Card}>
					Show{' '}
					<Select defaultValue={10} onChange={(value) => setValue(value)}>
						<Select.Option>{10}</Select.Option>
						<Select.Option>{25}</Select.Option>
						<Select.Option>{50}</Select.Option>
						<Select.Option>{100}</Select.Option>
					</Select>{' '}
					entries
				</div>
			</Layout>
		</>
	);
}
