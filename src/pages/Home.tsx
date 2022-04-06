import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Card from '../components/Card';
import Body from '../components/Body';
import { getActivityStatistic, getStatistic } from '../api';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { userType } from '../slices/user';

function Home() {
	const [data, setData] = useState<any>();
	const [dataChart, setDataChart] = useState<any>();
	const [selectedYear, setSelectedYear] = useState('2022');
	const userInfo = useSelector((state: RootState) => state.user.userInfo) as userType;

	useEffect(() => {
		getStatistic().then((res: any) => {
			setData(res);
		});
		getActivityStatistic(selectedYear).then((res: any) => {
			setDataChart(res);
		});
	}, []);
	useEffect(() => {
		getActivityStatistic(selectedYear).then((res: any) => {
			setDataChart(res);
		});
	}, [selectedYear]);

	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<Body title="Welcome" breadcrumb={[{ title: 'Dashboard', to: '/' }]}>
				<Row gutter={[8, 8]}>
					{userInfo.role === 'admin' && data && (
						<>
							<Col span={24} sm={12} lg={6}>
								<Card
									type="warning"
									total={data[2].total}
									title="Students"
									icon={<span className="material-icons-outlined"> school </span>}
								/>
							</Col>
							<Col span={24} sm={12} lg={6}>
								<Card
									type="alert"
									total={data[1].total}
									title="Teachers"
									icon={<span className="material-icons-outlined"> psychology </span>}
								/>
							</Col>
							<Col span={24} sm={12} lg={6}>
								<Card
									type="primary"
									total={data[3].total}
									title="Department"
									icon={<span className="material-icons-outlined"> castle </span>}
								/>
							</Col>
							<Col span={24} sm={12} lg={6}>
								<Card
									type="secondary"
									total={data[4].total}
									title="Subject"
									icon={<span className="material-icons-outlined"> import_contacts </span>}
								/>
							</Col>
						</>
					)}
					{userInfo.role === 'teacher' && data && (
						<>
							<Col span={24} sm={12} lg={6}>
								<Card
									type="warning"
									total={data[0].student}
									title="Total Students"
									icon={<span className="material-icons-outlined"> school </span>}
								/>
							</Col>
							<Col span={24} sm={12} lg={6}>
								<Card
									type="alert"
									total={data[0].total_hour}
									title="Total Hours"
									icon={<span className="material-icons-outlined"> schedule </span>}
								/>
							</Col>
							<Col span={24} sm={12} lg={6}>
								<Card
									type="primary"
									total={data[0].class}
									title="Total Classes"
									icon={<span className="material-icons-outlined"> calendar_today </span>}
								/>
							</Col>
							<Col span={24} sm={12} lg={6}>
								<Card
									type="secondary"
									total={data[0].lesson}
									title="Total Lessons"
									icon={<span className="material-icons-outlined"> library_books </span>}
								/>
							</Col>
						</>
					)}
				</Row>
			</Body>
		</>
	);
}

export default Home;
