import { useState } from "react"
import axios from "../axiosConfig"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Login({setIsAuthenticated}) {

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
            console.log(formData)
            const response = await axios.post('/api/users/login', formData, {
                headers : {'Content-Type': 'application/json'},
                withCredentials: true
            });
            if (response.status === 200) {
                Cookies.set('jwt', response.data.token, { path: '/', sameSite: 'None', secure: true });
                console.log(response.data)
                setIsAuthenticated(true)
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
            }        }
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
                    onChange={handleChange}
                />
            </div>
            <div style={{ height: '20px' }}></div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div style={{ height: '20px' }}></div>
            <button type="submit">Login</button>
            <button onClick={()=>{
                navigate('/signup')
            }}>signup</button>
        </form>

    )
}

export default Login