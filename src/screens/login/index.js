import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import avatar from '../../assets/icon.png';
import styles from './styles.module.css';
import {getToken} from '../../redux/reducers/login';
import {login,autologin} from '../../redux/reducers/login';
import { useNavigate } from 'react-router-dom'
import { getContacts } from '../../redux/reducers/contacts';

//





const Login = () => {

const navigate =useNavigate(); 




     
 //Danilo@gmail.com


  const [select, setSelect] = useState ('');
  const [selectAlternative] = useState ([
    {
      status: 'ocupado',
      id: '1',
    },
    {
      status: 'disponível',
      id: '2',
    },
    {
      status: 'indisponível',
      id: '3',
    },
  ]);
  const {user}= useSelector (state => state.login);

    console.log(user)

  const [checkBox, setCheckBox] = useState ('');
  const [checkBoxAlternative, setCheckBoxAlternative] = useState ([{}]);
  const [userName,setUserName] = React.useState('')
  const [password,setPassword] = React.useState('')
  const dispatch = useDispatch ();

  




  const handleLogin=(event)=> {
   event.preventDefault()
 if(password.trim() && userName.trim()){
  const User = {
    email: userName,
    password: password,
  };
  dispatch(login(User))
  
 }
 
  }
 
  React.useEffect (() => {
    const {data} = user
    

    
   //const isEmpty = Object.keys (data).length === 0;


    if(data){
        console.log(data)
      navigate('/home')
    }
      


    //dispatch (autologin());
  }, [handleLogin]);





  return (
  
    <div
     className={styles.loginBody}
    >
      <form className={styles.LoginForm} >
        <button className={styles.QuestionButton}>
          ?{' '}
        </button>
        <div className={styles.TitleContainer}>
          Entrar no
          <br />
          Windows live <b> Messenger </b>
        </div>

        <div className={styles.containerMother}>
          <div className={styles.imgcontainer}>
            <img src={avatar} alt="Avatar" className={styles.imgAvatar} />
          </div>
          <div className={styles.container}>
            <input
              type="text"
              placeholder="exemplo555@hotmail.com"
              name="username"
              value={userName}
              className={styles.Input}
              onChange={(event)=> setUserName(event.target.value) }
            />
            <input
            
              type="password"
              placeholder="Senha"
              name="psw"
              className={styles.Input}
              value={password}
              onChange={(event)=> setPassword(event.target.value) }
            />
            <div className={styles.box}>
              <span className={styles.psw} style={{padding: '10%'}}>
                {' '}<a href="#">Esqueceu a senha</a>
              </span>
              <div>
                <label htmlFor="status">
                  Entrar como
                  <select
                    id="status"
                    style={{marginLeft: '10px', border: 'none'}}
                    onChange={({target}) => setSelect (target.value)}
                  >
                    {selectAlternative.map ((el, index) => {
                      return (
                        <option value={el.status} key={el.id}>
                          {el.status}
                        </option>
                      );
                    })}

                  </select>
                </label>

              </div>

              <div
                style={{
                  marginTop: '20px',
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                <label>
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="algo"
                    value="Bike"
                  />
                  Lembrar minha senha{' '}
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="algo"
                    name="vehicle1"
                    value="Bike"
                    style={{marginTop: '10px'}}
                  />
                  Entrar automáticamente
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.BoxButton}>
          <button className={styles.Button} onClick={(event)=> handleLogin(event)}>Entrar</button>
         
        </div>
        <span className="psw">
          {' '}Não possui um Windows Live ID? <a href="#">Inscreva-se</a>
        </span>
        {user?.data?.name}
      </form>
     
    </div>

  

   
  );
};

export default Login;
//

/*
<div className="container">
        <label htmlFor="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" />

        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" />
        <button type="submit">Login</button>
      </div>


      <div className="container" style="background-color:#f1f1f1">
        <button type="button" className="cancelbtn">Cancel</button>
        <span className="psw">Forgot <a href="#">password?</a></span>
      </div>


*/
