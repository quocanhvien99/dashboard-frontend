import React, { ChangeEvent, FormEventHandler, FocusEvent, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import Card1 from '../components/Card1';
import Layout from '../components/Layout';
import '../components/Form.scss';
import { Col, notification, Row } from 'antd';
import { editDepartment, editProfile, getDepartmentInfo, getUserInfo, searchUser } from '../api';
import { useParams } from 'react-router-dom';

export default function DepartmentList() {
	const { did } = useParams();
	const [dhead, setDhead] = useState('');
	const [dheadId, setDheadId] = useState('');
	const [dname, setDname] = useState('');
	const [toggle, setToggle] = useState(false);
	const [searchResult, setSearchResult] = useState<any[]>([]);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		if (!searchResult.length && dhead)
			return notification['error']({
				message: 'Error',
				description: 'User does not exist!',
			});
		let dHeadId = '';
		if (dhead) dHeadId = dheadId;
		editDepartment(parseInt(did as string), dname, dHeadId)
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
	useEffect(() => {
		getDepartmentInfo(parseInt(did as string)).then((res: any) => {
			setDhead(res.dhead);
			setDname(res.dname);
			setDheadId(res.dhead_id);
		});
	}, []);

	const timeOutId = useRef<number>();
	const onChangeDhead = (e: ChangeEvent<HTMLInputElement>) => {
		setDhead(e.currentTarget.value);

		if (e.target.value) setToggle(true);
		else return setToggle(false);
		clearTimeout(timeOutId.current);
		//@ts-ignore:next-line
		timeOutId.current = setTimeout(() => {
			searchUser('teacher', 0, 5, dhead).then((res: any) => {
				console.log(res);
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
				<title>Edit Department</title>
			</Helmet>
			<Layout
				title="edit departments"
				breadcrumb={[
					{ title: 'Departments', to: '/department/' },
					{ title: 'Edit', to: `/department/edit/${did}` },
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
			</Layout>
		</>
	);
}
