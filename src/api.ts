import axios, { AxiosError, AxiosResponse } from 'axios';
import { logout as logoutAction } from './slices/user';
import store from './app/store';

const instance = axios.create({
	baseURL: 'http://localhost:9000',
	withCredentials: true,
});
instance.interceptors.response.use(
	(res: AxiosResponse<any, any>) => res,
	(err: AxiosError) => {
		if (err.response?.status === 401) {
			store.dispatch(logoutAction());
		}
		return Promise.reject(err);
	}
);

export function login(email: string, password: string) {
	return new Promise((resolve, reject) => {
		instance
			.post('/user/login', { email, password })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function register(name: string, email: string, password: string) {
	return new Promise((resolve, reject) => {
		instance
			.post('/user/', { email, password, name, role: 'student' })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function changePassword(oldPassword: string, password: string, uid: string) {
	return new Promise((resolve, reject) => {
		instance
			.put(`/user/${uid}`, {
				oldPassword,
				password,
			})
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function editProfile(uid: number, data: FormData) {
	return new Promise((resolve, reject) => {
		instance
			.put(`/user/${uid}`, data, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			})
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data));
	});
}
export function getUserInfo(uid: number) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/user/${uid}`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data));
	});
}
export function addUser(data: FormData, role: 'admin' | 'teacher' | 'student') {
	return new Promise((resolve, reject) => {
		data.append('role', role);
		instance
			.post(`/user/`, data, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			})
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function removeUser(uid: string) {
	return new Promise((resolve, reject) => {
		instance
			.delete(`/user/${uid}`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function addTeacher(data: FormData) {
	return new Promise((resolve, reject) => {
		data.append('role', 'teacher');
		instance
			.post(`/user/`, data, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			})
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function searchUser(role?: string, skip?: number, limit?: number, s?: string) {
	let params: any = {};
	if (role) params.role = role;
	if (skip) params.skip = skip;
	if (limit) params.limit = limit;
	if (s) params.s = s;

	return new Promise((resolve, reject) => {
		instance
			.get(`/user/`, {
				params,
			})
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function getUserList(params: any) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/user/`, { params })
			.then((res) => {
				let data = res.data.map((x: any) => {
					const date = new Date(x.dob);
					x.dob = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
					return x;
				});
				resolve(data);
			})
			.catch((err) => reject(err.response.data.msg));
	});
}
export function addDepartment(dname: string, dhead_id: string) {
	return new Promise((resolve, reject) => {
		instance
			.post(`/department/`, { dname, dhead_id })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function getDepartmentList(params: any) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/department/`, { params })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function getDepartmentInfo(did: number) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/department/${did}`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data));
	});
}
export function removeDepartment(did: string) {
	return new Promise((resolve, reject) => {
		instance
			.delete(`/department/${did}`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function editDepartment(did: number, dname: string, dhead_id: string) {
	const data: any = { dname };
	if (dhead_id) data.dhead_id = dhead_id;
	return new Promise((resolve, reject) => {
		instance
			.put(`/department/${did}`, data)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data));
	});
}
export function addSubject(
	id: FormDataEntryValue | null,
	name: FormDataEntryValue | null,
	did: FormDataEntryValue | null
) {
	return new Promise((resolve, reject) => {
		instance
			.post(`/subject/`, { id, name, did })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function getSubjectList(params: any) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/subject/`, { params })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function getSubjectInfo(sid: string) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/subject/${sid}`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data));
	});
}
export function removeSubject(sid: string) {
	return new Promise((resolve, reject) => {
		instance
			.delete(`/subject/${sid}`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function editSubject(
	sid: FormDataEntryValue | null,
	name: FormDataEntryValue | null,
	did: FormDataEntryValue | null
) {
	return new Promise((resolve, reject) => {
		instance
			.put(`/subject/${sid}`, { name, did })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data));
	});
}
export function getClassList(params: any) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/class/`, { params })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function removeClass(cid: string) {
	return new Promise((resolve, reject) => {
		instance
			.delete(`/class/${cid}`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function addClass(sid: string, teacher_id: string, semester: string) {
	return new Promise((resolve, reject) => {
		instance
			.post(`/class/`, { sid, teacher_id, semester })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function removeMember(cid: string, sid: string) {
	return new Promise((resolve, reject) => {
		instance
			.delete(`/class/${cid}/member/${sid}`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function getClassMemberList(params: any, cid: string) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/class/${cid}/member`, { params })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function addMember(cid: string, sid: string) {
	return new Promise((resolve, reject) => {
		instance
			.post(`/class/${cid}/member`, { sid })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function getTimeList(params: any, cid: string) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/class/${cid}/time`, { params })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function addTime(cid: string, start: string, end: string) {
	return new Promise((resolve, reject) => {
		instance
			.post(`/class/${cid}/time`, { start, end })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function removeTime(cid: string, tid: string) {
	return new Promise((resolve, reject) => {
		instance
			.delete(`/class/${cid}/time/${tid}`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function getScoreList(params: any) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/score`, { params })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function updateScore(cid: string, uid: string, score: number) {
	return new Promise((resolve, reject) => {
		instance
			.put(`/score`, { cid, uid, score })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function getStatistic() {
	return new Promise((resolve, reject) => {
		instance
			.get(`/statistic`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function getActivityStatistic(year: string) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/statistic/activity?year=` + year)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function getTimetable() {
	return new Promise((resolve, reject) => {
		instance
			.get(`/timetable`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function sendCode(email: string) {
	return new Promise((resolve, reject) => {
		instance
			.post(`/user/forget`, { email })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
export function resetPass(email: string, password: string, code: string) {
	return new Promise((resolve, reject) => {
		instance
			.post(`/user/reset`, { email, password, code })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data.msg));
	});
}
