import axios from 'axios';

// 모든 Axios 요청에 대해 쿠키를 포함하도록 설정합니다.
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8080';

export default axios;
