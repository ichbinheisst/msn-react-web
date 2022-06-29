import React from 'react';
import {autologin} from '../../redux/reducers/login';
import {useDispatch} from 'react-redux';
import LoadingPage from '../loadingPage';
const Notfound = () => {
  const [state, setState] = React.useState ('loading');

  const dispatch = useDispatch ();
  React.useEffect (() => {
    dispatch (autologin ());

  const user  = window.localStorage.getItem("userId")

 

  }, []);

  React.useEffect (() => {
    setTimeout (() => {
      setState ('not found');
    }, 5000);
    return () => {};
  }, []);

  return (
   <LoadingPage/>
  );
};
export default Notfound;
