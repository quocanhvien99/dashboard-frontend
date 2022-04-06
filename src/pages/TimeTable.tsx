import { Agenda, Day, Inject, Month, ScheduleComponent, Week } from '@syncfusion/ej2-react-schedule';
import React from 'react';
import { Helmet } from 'react-helmet';
import Body from '../components/Body';
import Layout from '../components/Layout';

export default function TimeTable() {
	return (
		<>
			<Helmet>
				<title>Schedule</title>
			</Helmet>
			<Body
				title="Schedule"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Schedule', to: '/schedule' },
				]}>
				<div className="schedule">
					<ScheduleComponent>
						<Inject services={[Week]} />
					</ScheduleComponent>
				</div>
			</Body>
		</>
	);
}
