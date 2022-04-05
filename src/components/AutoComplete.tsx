import React, { ChangeEvent, FocusEvent, FormEventHandler, useRef, useState } from 'react';

import '../components/Form.scss';

interface Props {
	setSelectId: React.Dispatch<React.SetStateAction<string>>;
	searchHandle: any;
	label?: string;
}

export default function AutoComplete({ setSelectId, searchHandle, label }: Props) {
	const [searchResult, setSearchResult] = useState<any[]>([]);
	const [dhead, setDhead] = useState('');
	const [toggle, setToggle] = useState(false);

	const timeOutId = useRef<number>();
	const onChangeDhead = (e: ChangeEvent<HTMLInputElement>) => {
		setDhead(e.currentTarget.value);

		if (e.target.value) setToggle(true);
		else return setToggle(false);
		clearTimeout(timeOutId.current);
		//@ts-ignore:next-line
		timeOutId.current = setTimeout(() => {
			searchHandle(dhead).then((res: any) => {
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
			{label && <label htmlFor="dhead">{label}</label>}
			<div className="search">
				<input
					type="text"
					name="dhead"
					id="dhead"
					onChange={onChangeDhead}
					onFocus={toggleResult}
					onBlur={toggleResult}
					value={dhead}
					style={{ marginBottom: 0 }}
				/>
				<ul className={`${toggle ? 'show' : ''}`}>
					{searchResult.map((x) => (
						<li
							key={x.id}
							onClick={(e) => {
								setDhead(x.name);
								setSelectId(x.id);
							}}>
							{x.name + ' | ' + x.email}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
