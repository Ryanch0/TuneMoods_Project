import { useState } from "react"
import axios from "../axiosConfig"
import { useNavigate } from 'react-router-dom';

function Login() {
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
          const response = await axios.post('http://localhost:8080/api/users/login', formData);
          if (response.status === 200) {
            // 로그인 성공 시 메인 페이지로 이동
            navigate('/main');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Invalid username or password');
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
        </form>
    
    )
}

export default Login