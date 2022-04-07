import { Inject, ScheduleComponent, ViewDirective, ViewsDirective, Week } from '@syncfusion/ej2-react-schedule';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Body from '../components/Body';

export default function TimeTable() {
	const scheduleData = useSelector((state: RootState) => state.schedule.data);
	const data = scheduleData.map((x: any) => ({
		id: x.id,
		Subject: x.sname,
		StartTime: new Date(x.start),
		EndTime: new Date(x.end),
	}));
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
					<ScheduleComponent eventSettings={{ dataSource: data }} readonly={true}>
						<ViewsDirective>
							<ViewDirective option="Week" startHour="06:00" endHour="20:00" />
						</ViewsDirective>
						<Inject services={[Week]} />
					</ScheduleComponent>
				</div>
			</Body>
		</>
	);
}
