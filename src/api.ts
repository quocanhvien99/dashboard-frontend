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
			.post('/user/', { email, password, name, role_id: 3 })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data));
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
export function getNewUserInfo(uid: number) {
	return new Promise((resolve, reject) => {
		instance
			.get(`/user/${uid}`)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data));
	});
}
