import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {autologin} from '../../redux/reducers/login';
import LoadingPage from '../loadingPage';
const Preload = () => {
  const {token, userId} = useSelector (state => state.login.token.data);
  const user = useSelector (state => state.login.user.data);

  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  React.useEffect (() => {
    if (token && userId) {
      dispatch (autologin ());
    } else {
      navigate ('login');
    }
  }, []);

  React.useEffect (
    () => {
      if (user?.email) {
        navigate ('home');
      }else{
        navigate ('login');
      }
    },
    [user]
  );

  
  return (
    <LoadingPage/>
  );
};
export default Preload;
