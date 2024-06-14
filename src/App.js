import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Main from './routes/Main';

function App() {



  return (
    <div className="App">
      <Routes>
        <Route path='/login'
        element={<Login/>}> 
        </Route>

        <Route path='/signup'
        element={<Signup/>}>
        </Route>

        <Route path='/main'
        element={<Main/>}>
        </Route>





      <Route path='*' element={<div>404page</div>}/>
      </Routes>


    </div>
  );
}

export default App;
