import React from 'react';
import Icon from '../../../../assets/avatar.jpeg';
import styles from './userStyles.module.css';
import { useSpring,animated } from 'react-spring';
const User = ({message}) => {
 const [animating,setAnimating] = React.useState(false)

 React.useEffect(()=>{
   if(message?.type =="alert"){
    setAnimating(true)
     setTimeout(()=>{
     setAnimating(false)
     },2000)
   } 

 },[message])


  const styling = useSpring({
    config: { duration: 50 },
    to: [
      { marginLeft:"5px"},
      { marginLeft:"-5px"},
      { marginLeft:"5px"},
      { marginLeft:"-5px", }, 
      { marginLeft:"5px" ,opacity:0.5},
      { marginLeft:"5px",opacity:0.5 },
      { marginLeft:"-5px",opacity:1 },
      { marginLeft:"5px",opacity:0.5 },
      { marginLeft:"-5px",opacity:1 }, 
      { marginLeft:"5px" ,},
      { marginLeft:"5px",}
    ],
    from: {marginLeft:"5px"},
  })
  return (
    <div
      style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}
    >
      <animated.div style={animating? styling:{}}>
        <div className={styles.pictureBox}>
        <img src={Icon} alt="icon" style={{width: '90%', height: '90%', }} />
      </div>
      </animated.div>
      

      <div style={{marginInline: '20px'}}>
        <div style={{fontSize: '20px', fontFamily: 'serif'}}>
          {' '}Users name (available){' '}
        </div>
        <div style={{fontSize: '14px'}}>
          {' '}random quoting to make look smarter than you actualy are{' '}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#009FFF',
            borderBottomStyle: 'solid',
            borderWidth: '0.4px',
          }}
        >
          {' '}
          another stupid saying{' '}
        </div>
      </div>

    </div>
  );
};
export default User;
