import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import SC from '../components/Card1.module.scss';
import Card1 from '../components/Card1';
import { getSubjectInfo } from '../api';
import { Select } from 'antd';

export default function SubjectView() {
	const { id } = useParams();
	const [subjectInfo, setSubjectInfo] = useState<any>();
	const navigate = useNavigate();
	const [limit, setLimit] = useState(2);
	const [skip, setSkip] = useState(0);
	const [s, setS] = useState('');
	const [total, setTotal] = useState(0);
	const [dataSource, setDataSource] = useState([]);
	const [orderBy, setOrderBy] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentUid, setCurrentUid] = useState('');
	const [triggerReload, setTriggerReload] = useState(false);

	useEffect(() => {
		getSubjectInfo(id as string).then((res) => setSubjectInfo(res));
	}, []);

	return (
		<>
			<Helmet>
				<title>Subject - {id as string}</title>
			</Helmet>
			<Layout
				title={`Subject - ${id}`}
				breadcrumb={[
					{ title: 'Dashboard', to: '/' },
					{ title: 'Subjects', to: '/subject' },
					{ title: 'View', to: `/subject/${id}` },
				]}>
				<>
					<Card1>
						<>
							<h5 className={SC.title}>
								<span>Basic Information</span>
							</h5>
							<p style={{ fontWeight: '500', fontSize: '16px' }}>ID</p>
							<p>{subjectInfo && subjectInfo.id}</p>
							<p style={{ fontWeight: '500', fontSize: '16px' }}>Subject Name</p>
							<p>{subjectInfo && subjectInfo.name}</p>
							<p style={{ fontWeight: '500', fontSize: '16px' }}>Department Name</p>
							<p>{subjectInfo && subjectInfo.dname}</p>
						</>
					</Card1>
					<Card1>
						<>
							<h5 className={SC.title}>
								<span>Classes</span>
							</h5>
							<div className={SC.Card}>
								<div>
									Show{' '}
									<Select defaultValue={2} onChange={(value) => setLimit(value)}>
										<Select.Option value={2}>{2}</Select.Option>
										<Select.Option value={10}>{10}</Select.Option>
										<Select.Option value={25}>{25}</Select.Option>
										<Select.Option value={50}>{50}</Select.Option>
										<Select.Option value={100}>{100}</Select.Option>
									</Select>{' '}
									entries
								</div>
								<button>
									<span className="material-icons-outlined"> add </span>
								</button>
							</div>
						</>
					</Card1>
				</>
			</Layout>
		</>
	);
}
