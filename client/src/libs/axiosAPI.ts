import axios from 'axios';

const url = 'http://localhost:3000';
export const axiosAPI = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json',
	},
});
axiosAPI.interceptors.request.use(
	(config) => {
		// 요청을 보내기 전에 토큰을 로컬 스토리지에서 가져옴
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		// 요청 오류가 있는 경우 처리
		return Promise.reject(error);
	},
);
axiosAPI.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.error(error);
		if (error.response.status === 401) {
			localStorage.removeItem('token');
			// window.location.href = '/login';
		}
		return Promise.reject(error);
	},
);
