import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/icon.png";
import styles from "./styles.module.css";
import { getToken } from "../../redux/reducers/login";
import { login, autologin } from "../../redux/reducers/login";
import { useNavigate } from "react-router-dom";
import { getContacts } from "../../redux/reducers/contacts";
import LoadingPage from "../loadingPage";
//

const Login = () => {
  const navigate = useNavigate();

  //Danilo@gmail.com

  const [select, setSelect] = useState("");
  const [selectAlternative] = useState([
    {
      status: "ocupado",
      id: "1",
    },
    {
      status: "disponível",
      id: "2",
    },
    {
      status: "indisponível",
      id: "3",
    },
  ]);
  const { user } = useSelector((state) => state.login);

  const [checkBox, setCheckBox] = useState("");
  const [checkBoxAlternative, setCheckBoxAlternative] = useState([{}]);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();

  const loadingToken = useSelector((state) => state.login.token.loading);
  const loadingUser = useSelector((state) => state.login.user.loading);

  const handleLogin = (event) => {
    event.preventDefault();
    if (password.trim() && userName.trim()) {
      const User = {
        email: userName,
        password: password,
      };
      dispatch(login(User));
    }
  };

  React.useEffect(() => {
    const { data } = user;

    //const isEmpty = Object.keys (data).length === 0;

    if (data) {
      navigate("/home");
    }

    //dispatch (autologin());
  }, [handleLogin]);

  if (loadingToken || loadingUser) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.loginBody}>
      <form className={styles.LoginForm} onSubmit={handleLogin}>
        <button className={styles.QuestionButton}>? </button>
        <div className={styles.TitleContainer}>
          Entrar no
          <br />
          Janela live <b> Messenger </b>
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
              onChange={(event) => setUserName(event.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              name="psw"
              className={styles.Input}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className={styles.box}>
              <span className={styles.psw} style={{ padding: "10%" }}>
                {" "}
                <a href="#">Esqueceu a senha</a>
                <br />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.BoxButton}>
          <button
            className={styles.Button}
            onClick={(event) => handleLogin(event)}
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
//

/*



  O msn-react não tem vínculo com a microsoft e não é o mesmo
                  produto, Caso sua intenção seja acessar a antiga rede social
                  da microsoft, pedimos desculpas mas não será possível,
                  infelizmente o Mensseger encerrou suas atividades. O msn-react
                  está sendo desenvolvido por fãs da rede social.





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
