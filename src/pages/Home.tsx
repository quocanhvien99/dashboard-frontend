import { Col, Row } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	DownOutlined,
} from '@ant-design/icons';
import Card from '../components/Card';
import Layout from '../components/Layout';

function Home() {
	return (
		<>
			<Helmet></Helmet>
			<Layout title="Welcome" breadcrumb={[{ title: 'Dashboard', to: '/' }]}>
				<div>
					<Row gutter={{ md: 8 }}>
						<Col md={12}>
							<Card type="primary" total={50000} title="Students" icon={<UserOutlined />} />
						</Col>
						<Col md={12}>
							<Card type="warning" total={50000} title="Students" icon={<UserOutlined />} />
						</Col>
					</Row>
				</div>
			</Layout>
		</>
	);
}

export default Home;
