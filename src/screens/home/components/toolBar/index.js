import React from 'react';
import styles from './styles.module.css';
import Icon from '../../../../assets/document.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../redux/reducers/login';
//import {AiOutlineMail, AiOutlineFolderOpen} from 'react-icons/ai';

const icons = [1, 2, 3, 4];
const icons2 = [1, 2];


 

/*
const iconLeft = [
  {
    icon: 'AiOutlineMail',
  },
  {
    icon: 'AiOutlineMail',
  },
  {
    icon: 'AiOutlineMail',
  },
  {
    icon: 'AiOutlineMail',
  },
];


function getIcon (key) {
  switch (key) {
    case 1:
      return <AiOutlineMail color="#000" size={30} />;
    case 2:
      return <AiOutlineFolderOpen color="#000" size={30} />;

    default:
      return;
  }
}

*/
const ToolBar = () => {
  const navigate = useNavigate();
 const dispatch = useDispatch()

   async function Logout() {
    try {
             window.localStorage.removeItem("Msn_token");
             window.localStorage.removeItem("userId");
             dispatch(logout())
     setTimeout(()=>{
      navigate("/login")
     },1000)
    ;
      return;
    } catch (error) {
      console.log("it was no possible logout ");
      return 
    }
  }


 function test(){
  console.log("test running")
 }

 function NavigateToNotification(){
    navigate("/notification")

 }

  const icon2= [
    {
      name:"", 
      action:NavigateToNotification
    },
    {
      name:"", 
      action:Logout
    },
   ]
  return (
    <div className={styles.container}>
      <div
        style={{
          display: 'flex',
        }}
      >
        {icons.map ((el, index) => {
          return (
            <button
          
              key={index}
              style={{
                marginInline: '5%',
                border: 'none',
                backgroundColor: 'transparent',
              }}
            >
              <img
                src={Icon}
                alt="icon"
                style={{
                  border: 'none',
                  width: '6vw',
                  maxWidth:"22px"
                  
                }}
              />

            </button>
          );
        })}

      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {icon2.map ((el, index) => {
          return (
            <button
            onClick={()=> el.action()}
              key={index}
              style={{
                marginInline: '10px',
                border: 'none',
                backgroundColor: 'transparent',
                
              }}
            >
              <img
                src={Icon}
                alt="icon"
                style={{
                  border: 'none',
                  width: '20px',
                  height: '20px',
                }}
              />

            </button>
          );
        })}

      </div>

    </div>
  );
};
export default ToolBar;
