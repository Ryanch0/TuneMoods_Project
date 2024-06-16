import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';



// 예외처리 필요
function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''

    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('/api/users/signup', formData);
            if (response.status === 201) {
                // 회원가입 성공 시 메인 페이지로 이동
                navigate('/login');
                console.log(formData);
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data) {
                alert(error.response.data);
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange} />
            </div>
            <div style={{ height: '20px' }}></div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange} />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup