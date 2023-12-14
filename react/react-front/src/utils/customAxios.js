import axios from 'axios'

const timeout = 100 * 1000

const customAxios = axios.create({
	baseURL: 'http://localhost:4000',
	timeout,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
	paramSerializer: paramObj => {
		const params = new URLSearchParams()
		for (const key in paramObj) {
			if (Array.isArray(paramObj[key]) && paramObj[key].length === 0) {
				continue
			}

			params.append(key, paramObj[key])
		}
		return params.toString()
	},
})

customAxios.interceptors.request.use(config => {
	const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken')
	const langCd = localStorage.getItem('langCd') || 'KO'

	if (accessToken) {
		config.headers['authorization'] = 'Bearer ' + accessToken
		config.headers['langCd'] = langCd
	}

	return config
}, (error) => {
	return Promise.reject(error)
})

customAxios.interceptors.response.use(response => {
	customAxios.defaults.timeout = timeout
	return response
}, (error) => {

	customAxios.defaults.timeout = timeout // 타임아웃 제한시간 초기화
	if (error.response === undefined || error.response.status === undefined) {
		return Promise.reject(error)
	}

	if (error.response.status === 401) {
		window.location.href = '/signIn'
	}
	else if (error.response.status === 403 && error.response.data.code === 'TOKEN_EXPIRED') {
		sessionStorage.removeItem('accessToken')
		localStorage.removeItem('accessToken')
		document.location.href = '/signIn'
	}
	else if (error.response.status === 500) {
		alert('작업중 오류가 발생하였습니다.')
	}
	else {
		return Promise.reject(error)
	}
})

export default customAxios