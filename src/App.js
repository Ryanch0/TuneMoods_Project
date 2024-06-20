import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';
import Signup from './routes/Signup';
import EmotionAnalyzer from './routes/EmotionAnalyzer';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

function App() {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const checkAuth = () => {
        const jwt = Cookies.get('jwt');
        console.log(jwt); // 디버깅 로그 추가
        
        if(jwt){
         setIsAuthenticated(true)
        }else{
          setIsAuthenticated(false)
        }
        setLoading(false); // 로딩 상태 종료

    };
    console.log('Checking authentication...');

    checkAuth();
}, []);

if (loading) {
  return <div>Loading...</div>; // 로딩 중일 때 표시할 컴포넌트
}

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to={isAuthenticated ? '/music' : '/login'} />}  />

      <Route path='/login'
        element={<Login setIsAuthenticated={setIsAuthenticated} />}>
      </Route>

      <Route path='/signup'
        element={<Signup />}>
      </Route>
{/* 
      <Route path='/main'
        element={<Main />}>
      </Route> */}

      <Route path='/music'
        element={isAuthenticated ? <EmotionAnalyzer /> : <Navigate to ='/login'/>}>
      </Route>



      <Route path='*' element={<div>404page</div>} />
    </Routes>


    </div >
  );
}

export default App;
