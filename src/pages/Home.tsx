import '../components/Form.scss';
import './Home.scss';
import { Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Card from '../components/Card';
import Body from '../components/Body';
import { getActivityStatistic, getStatistic } from '../api';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { userType } from '../slices/user';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Card1 from '../components/Card1';
import Title from 'antd/lib/typography/Title';
import Upcoming from '../components/Upcoming';
import History from '../components/History';
import { Link } from 'react-router-dom';
Chart.register(...registerables);

function Home() {
	const [data, setData] = useState<any>();
	const [dataChart, setDataChart] = useState<any>({ teacher: [], student: [] });
	const [selectedYear, setSelectedYear] = useState('2022');
	const userInfo = useSelector((state: RootState) => state.user.userInfo) as userType;

	useEffect(() => {
		getStatistic().then((res: any) => {
			setData(res);
		});
	}, []);
	useEffect(() => {
		userInfo.role === 'admin' &&
			getActivityStatistic(selectedYear).then((res: any) => {
				setDataChart(res);
			});
	}, [selectedYear, userInfo.role]);
	const currentYear = useRef(new Date().getFullYear());

	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<Body title="Welcome" breadcrumb={[{ title: 'Dashboard', to: '/' }]}>
				<>
					<Row gutter={[24, 24]}>
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
										total={Math.floor(data[0].total_hour)}
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
					{userInfo.role === 'admin' && (
						<Row gutter={[24, 24]} style={{ marginTop: '30px' }}>
							<Col span={24} md={12}>
								<Card1
									style={{ marginTop: 0 }}
									header={
										<>
											<Title level={4}>Activity</Title>
											<div className="select-custom">
												<select name="gender" id="gender" onChange={(e) => setSelectedYear(e.currentTarget.value)}>
													<option
														value={(currentYear.current - 1).toString()}
														selected={selectedYear === (currentYear.current - 1).toString()}>
														{currentYear.current - 1}
													</option>
													<option
														value={currentYear.current.toString()}
														selected={selectedYear === currentYear.current.toString()}>
														{currentYear.current}
													</option>
													<option
														value={(currentYear.current + 1).toString()}
														selected={selectedYear === (currentYear.current + 1).toString()}>
														{currentYear.current + 1}
													</option>
												</select>
												<span className="material-icons-outlined"> arrow_drop_down </span>
											</div>
										</>
									}>
									<Line
										data={{
											labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
											datasets: [
												{
													label: 'Teacher',
													borderColor: 'rgb(255, 99, 132)',
													data: dataChart.teacher,
												},
												{
													label: 'Student',
													borderColor: 'rgb(24, 144, 255)',
													data: dataChart.student,
												},
											],
										}}
									/>
								</Card1>
							</Col>
						</Row>
					)}
					{userInfo.role !== 'admin' && (
						<Row gutter={[24, 24]} style={{ marginTop: '30px' }}>
							<Col span={24} md={12}>
								<Card1
									header={
										<>
											<Title level={4}>Upcoming Lesson</Title>
											{userInfo.role === 'teacher' && (
												<Link to="/class" style={{ fontWeight: '500', fontSize: '16px' }}>
													View all course
												</Link>
											)}
										</>
									}>
									<Upcoming />
								</Card1>
							</Col>
							<Col span={24} md={12}>
								<Card1
									header={
										<>
											<Title level={4}>{userInfo.role === 'teacher' ? 'Teaching' : 'Learning'} History</Title>
										</>
									}>
									<History />
								</Card1>
							</Col>
						</Row>
					)}
				</>
			</Body>
		</>
	);
}

export default Home;
