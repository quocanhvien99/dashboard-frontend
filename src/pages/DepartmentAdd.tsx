import React, { ChangeEvent, FocusEvent, FormEventHandler, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Card1 from '../components/Card1';
import '../components/Form.scss';
import { Col, notification } from 'antd';
import { addDepartment, searchUser } from '../api';
import Body from '../components/Body';

export default function DepartmentAdd() {
	const [searchResult, setSearchResult] = useState<any[]>([]);
	const [dhead, setDhead] = useState('');
	const [dheadId, setDheadId] = useState('');
	const [dname, setDname] = useState('');
	const [toggle, setToggle] = useState(false);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		if (!searchResult.length)
			return notification['error']({
				message: 'Error',
				description: 'User does not exist!',
			});
		let dhead_id: string;
		if (!dheadId) dhead_id = searchResult[0].id;
		else dhead_id = dheadId;
		addDepartment(dname, dhead_id)
			.then((res) =>
				notification['success']({
					message: 'Success',
					description: 'Department information has been saved',
				})
			)
			.catch((err) =>
				notification['error']({
					message: 'Error',
					description: err,
				})
			);
	};

	const timeOutId = useRef<number>();
	const onChangeDhead = (e: ChangeEvent<HTMLInputElement>) => {
		setDhead(e.currentTarget.value);

		if (e.target.value) setToggle(true);
		else return setToggle(false);
		clearTimeout(timeOutId.current);
		//@ts-ignore:next-line
		timeOutId.current = setTimeout(() => {
			searchUser('teacher', 0, 5, dhead).then((res: any) => {
				setSearchResult(res);
			});
		}, 1000);
	};
	const toggleResult = (event: FocusEvent<HTMLInputElement>) => {
		if (!event.target.value) return;
		setToggle(!toggle);
	};

	return (
		<>
			<Helmet>
				<title>Add Department</title>
			</Helmet>
			<Body
				title="add department"
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Department', to: '/department/' },
					{ title: 'Add', to: '/department/add' },
				]}>
				<Card1>
					<form onSubmit={submit}>
						<Col xs={24} sm={12}>
							<label htmlFor="dname">Department Name</label>
							<input
								type="text"
								name="dname"
								id="dname"
								required
								value={dname}
								onChange={(e) => setDname(e.currentTarget.value)}
							/>
						</Col>
						<Col xs={24} sm={12}>
							<label htmlFor="dhead">Head of Department</label>
							<div className="search">
								<input
									type="text"
									name="dhead"
									id="dhead"
									onChange={onChangeDhead}
									onFocus={toggleResult}
									onBlur={toggleResult}
									value={dhead}
								/>
								<ul className={`${toggle ? 'show' : ''}`}>
									{searchResult.map((x) => (
										<li
											key={x.id}
											onClick={(e) => {
												setDhead(x.name);
												setDheadId(x.id);
											}}>
											{x.name + ' | ' + x.email}
										</li>
									))}
								</ul>
							</div>
						</Col>
						<button className="btn">Submit</button>
					</form>
				</Card1>
			</Body>
		</>
	);
}
