

import { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../App.css';

function Login({ setIsAuthenticated }) {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
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
            const response = await axios.post('/api/users/login', formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (response.status === 200) {
                Cookies.set('jwt', response.data.token, { path: '/', sameSite: 'None', secure: true });
                setIsAuthenticated(true);
                navigate('/music');
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Server error');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-image"></div>
            <div className="login-form-container">
                <div className="login-form">
                <h1 className="login-heading">Discover Music That Matches Your Mood</h1>
                <p className="login-subheading">Tune into Your Feelings with Personalized Music</p>
                    <div className="login-text">
                        <p>Welcome back! Please login to your account.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Login</button>
                        <button type="button" className="signup-button" onClick={() => navigate('/signup')}>
                            Sign Up
                        </button>
                    </form>
                    <p className="terms-text">
                        By creating an account, you agree to our<br />
                        <a href="#">Terms of Service</a> and <a href="#">Privacy & Cookie Statement</a>.
                    </p>
                </div>                
            </div>
        </div>
    );
}

export default Login;
