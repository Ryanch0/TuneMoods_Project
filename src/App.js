import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Main from './routes/Main';
import EmotionAnalyzer from './routes/EmotionAnalyzer';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';




function App() {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('jwt'));

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get('jwt'));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />

      <Route path='/login'
        element={<Login setIsAuthenticated={setIsAuthenticated} />}>
      </Route>

      <Route path='/signup'
        element={<Signup />}>
      </Route>

      <Route path='/main'
        element={<Main />}>
      </Route>

      <Route path='/music'
        element={isAuthenticated ? <EmotionAnalyzer /> : <Login />}>
      </Route>



      <Route path='*' element={<div>404page</div>} />
    </Routes>


    </div >
  );
}

export default App;
