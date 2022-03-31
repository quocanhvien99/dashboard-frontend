import { Col, Row } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { UserOutlined } from '@ant-design/icons';
import Card from '../components/Card';
import Layout from '../components/Layout';

function Home() {
	return (
		<>
			<Helmet></Helmet>
			<Layout title="Welcome" breadcrumb={[{ title: 'Dashboard', to: '/' }]}>
				<div>
					<Row gutter={[8, 8]}>
						<Col span={24} sm={12} lg={6}>
							<Card type="warning" total={50000} title="Students" icon={<UserOutlined />} />
						</Col>
						<Col span={24} sm={12} lg={6}>
							<Card type="alert" total={50000} title="Students" icon={<UserOutlined />} />
						</Col>
						<Col span={24} sm={12} lg={6}>
							<Card type="primary" total={50000} title="Students" icon={<UserOutlined />} />
						</Col>
						<Col span={24} sm={12} lg={6}>
							<Card type="secondary" total={50000} title="Students" icon={<UserOutlined />} />
						</Col>
					</Row>
				</div>
			</Layout>
		</>
	);
}

export default Home;
