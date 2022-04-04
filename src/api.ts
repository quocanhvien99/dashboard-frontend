import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:9000',
	withCredentials: true,
});

export function login(email: string, password: string) {
	return new Promise((resolve, reject) => {
		instance
			.post('/user/login', { email, password })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data));
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
