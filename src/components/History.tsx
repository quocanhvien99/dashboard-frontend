import moment from 'moment';
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
			<ul className={SC['actitvity-feed']}>
				{upcoming.map((x, i) => (
					<li className={`${SC['feed-item']} ${i === upcoming.length - 1 ? SC['feed-last-item'] : ''}`}>
						<p className={SC.time}>{`${moment(x.StartTime).format('MMM D, hh.mma')} - ${moment(x.EndTime).format(
							'hh.mma'
						)}`}</p>
						<p className={SC.subject}>{x.Subject}</p>
						<p className={`${SC.state} ${x.EndTime > new Date() ? SC.inprogress : ''}`}>
							{x.EndTime > new Date() ? 'In Progress' : 'Completed'}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}
