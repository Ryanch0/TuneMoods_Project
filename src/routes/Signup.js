import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
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

        if (!formData.username || !formData.password || !formData.confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert(`Each password doesn't match`);
            return;
        }

        const { confirmPassword, ...submitData } = formData;

        try {
            const response = await axios.post('/api/users/signup', submitData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred. Please try again.');
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
                        <div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                    <p className="terms-text">
                        By creating an account, you agree to our<br />
                        <a href="#">Terms of Service</a> and <a href="#">Privacy & Cookie Statement</a>.
                    </p>
                    <p className="login-prompt">
                        Do you have an account? <span className="login-link" onClick={() => navigate('/login')}>Log in</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
