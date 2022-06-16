import React from 'react';
import {autologin} from '../../redux/reducers/login';
import {useDispatch} from 'react-redux';
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
    }, 3000);
    return () => {};
  }, []);

  return (
    <div>
      {state}
    </div>
  );
};
export default Notfound;
