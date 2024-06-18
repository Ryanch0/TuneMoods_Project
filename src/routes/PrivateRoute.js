import React from 'react';
import { Route,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!Cookies.get('jwt'); // 쿠키에서 JWT 토큰을 확인합니다.
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          navigate('/login')
        )
      }
    />
  );
};

export default PrivateRoute;
