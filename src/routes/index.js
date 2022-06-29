import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../screens/login/index.js';
import Home from '../screens/home/index.js';
import Notfound from '../screens/notFound/index.js';
import Preload from '../screens/preload/index.js';
import Notification from '../screens/notification/index.js';
import {useSelector, useDispatch} from 'react-redux';
import LoadingPage from '../screens/loadingPage/index.js';

const Routers = () => {
  const user = useSelector (state => state.login.user.data);
  

   

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Preload />} />
        {user && <Route path="/home" element={<Home />} />}
        
        <Route path="/login" element={<Login />} />
        
        <Route path="/notification" element={<Notification />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routers;
