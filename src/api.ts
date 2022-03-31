import axios from 'axios';

const apiUrl = 'http://localhost:9000';

export function login(email: string, password: string) {
	return new Promise((resolve, reject) => {
		axios
			.post(apiUrl + '/user/login', { email, password }, { withCredentials: true })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data));
	});
}
export function register(name: string, email: string, password: string) {
	return new Promise((resolve, reject) => {
		axios
			.post(apiUrl + '/user/', { email, password, name, role_id: 3 })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.response.data));
	});
}
