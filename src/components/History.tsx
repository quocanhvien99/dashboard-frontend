import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import SC from './History.module.scss';

export default function History() {
	const schedule = useSelector((state: RootState) => state.schedule.data);
	const scheduleData = schedule.map((x: any) => ({
		id: x.id,
		Subject: x.sname,
		StartTime: new Date(x.start),
		EndTime: new Date(x.end),
	}));

	const now = new Date();
	const upcoming = scheduleData
		.filter((x) => {
			return x.StartTime <= now;
		})
		.sort((a, b) => b.StartTime.getTime() - a.StartTime.getTime());

	return (
		<div>
			<div className={SC.head}>
				<span>Teaching History</span>
			</div>
			<ul>
				{upcoming.map((x) => (
					<li>
						<p>{timeFormat(x.StartTime, x.EndTime)}</p>
						<p>{x.Subject}</p>
						<p>{x.EndTime > new Date() ? 'In Progress' : 'Completed'}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

function timeFormat(start: Date, end: Date) {
	return start.getHours() + '.' + start.getMinutes() + '-' + end.getHours() + '.' + end.getMinutes();
}
