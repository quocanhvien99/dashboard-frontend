import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';
import SC from './Upcoming.module.scss';

export default function Upcoming() {
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
			return x.StartTime > now;
		})
		.sort((a, b) => a.StartTime.getTime() - b.StartTime.getTime());
	return (
		<div>
			<ul className={SC.body}>
				{upcoming.map((x, i) => (
					<li key={i}>
						<div>
							<p>{moment(x.StartTime).format('MMM D, ddd')}</p>
							<p>{`${moment(x.StartTime).format('h.mma')} - ${moment(x.EndTime).format('h.mma')}`}</p>
						</div>
						<p>{x.Subject}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

function timeFormat(start: Date, end: Date) {
	return (
		start.getHours() +
		'.' +
		start.getMinutes() +
		' - ' +
		end.getHours() +
		'.' +
		end.getMinutes() +
		' (' +
		(end.valueOf() - start.valueOf()) / (60 * 1000) +
		'min' +
		')'
	);
}
