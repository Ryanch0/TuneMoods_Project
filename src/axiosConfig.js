import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // 이 URL이 올바른지 확인
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
