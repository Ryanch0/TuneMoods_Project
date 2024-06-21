import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // 이 URL이 올바른지 확인
    headers: {
        'Content-Type': 'application/json',
        withCredentials: true, // 쿠키를 포함한 요청을 보내기 위해 설정
    },
});

export default instance;
