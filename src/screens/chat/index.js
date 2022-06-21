import React from 'react';
import User from './components/user';
import styles from './chatStyles.module.css';
import picture from '../../assets/avatar.jpeg';
import ChatForm from './components/form';
import messageAudio from '../../assets/audios/MS.mp3';
import alertAudio from '../../assets/audios/aten.mp3';
import NewUserOnlineAudio from '../../assets/audios/new.mp3';
import { useSpring,animated } from 'react-spring';
const Chat = ({
  data,
  messages,
  closeChat,
  socket,
  user,
  UpdateMessages,
  typing,
  newUserOnline,
  unViewedMessages,
  setUnviewedMessaged,
}) => {
  const header = ['Fotos', 'Arquivos', 'videos', 'chamadas'];
  const test = [1, 2, 3, 4, 5];
  const [message, setMessage] = React.useState ({});
  const [messageInput, setMessageInput] = React.useState ('');
  const [filterMessage, setFilterMessage] = React.useState ([]);
  const [UserStatus, setUserStatus] = React.useState ();
  const [animating,setAnimating] = React.useState(false)
  function Typing (status) {
    socket.emit ('typing', {
      room: data.email,
      email: user.email,
      sender: user.name,
      status: status,
    });
  }

  // change colorback

  function viewMessage () {
    if (unViewedMessages.length) {
      setUnviewedMessaged (() => {
        let newList = unViewedMessages.filter (el => el.email !== data.email);
        return newList;
      });
    }
  }

  React.useEffect(()=>{
    if(messages.length && messages[messages.length-1].type =="alert" &&messages[messages.length-1].email == data.email ){
     setAnimating(true)
      setTimeout(()=>{
      setAnimating(false)
      },2000)
    } 
   
 
  },[messages])

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

  React.useEffect (() => {
    viewMessage ();
  }, []);

  React.useEffect (

    () => {

 
 

      // filter the message that belong the user to be displayed in each user
      if (messages) {
        let novo = messages.filter (el => {
          let x = el.email === data.email || el.room === data.email;
          return x;
        });
        setFilterMessage (novo);
      }
      return () => {};



    },
    [messages, data]
  );

  React.useEffect (
    () => {
      socket.emit ('checkUserOnline_client', {room: data.email});
      socket.on ('checkUserOnline_server', params => {
        if (params.contact === data.email) {
          console.log ('will set Status' + params.status);

          setUserStatus (params.status);
        }
      });
    },
    [data, newUserOnline]
  );

  React.useEffect (
    () => {
      if (message) {
        UpdateMessages (message);
      }
    },
    [message]
  );

  function handleNewMessage (event) {
    event.preventDefault ();
    if (!messageInput.trim ()) {
      return;
    }

    socket.emit (
      'createMsg',
      {
        senderID: user._id,
        sender: user.name,
        email: user.email,
        room: data.email,
        message: messageInput,
        time: '22:00',
        type: 'message',
      },
      function (res) {
        setMessage (res);
      }
    );

    // setMessages ([...messages, msg]);
    setMessageInput ('');
  }

  function CallAttention () {
    socket.emit ('callAttentionUser', {
      room: data.email,
      user: {name: user.name, id: user._id, email: user.email},
    });

    socket.emit (
      'createMsg',
      {  senderID: user._id,
        sender: user.name,
        email: user.email,
        room: data.email,
        message: ` ${user.name} chamou atenção 😖 😖`,
        time: '22:00',
        type: 'alert',
      },
      // 
      function (res) {
        console.log ('call attention');
        setMessage (res);
      }
    );
  }



   console.log(message)
  //	😀
  return (
    <div className={styles.container}>

      <header className={styles.headingChat}>
      <animated.div style={animating? styling:{}}>
        <div className={styles.avatarContainer}>
          <img
            src={data.thumbnail ? data.thumbnail : picture}
            alt="avatar"
            className={styles.avatar}
            style={{opacity: !UserStatus ? '0.4' : '1'}}
          />
        </div>
        </animated.div>

        <div>
          {data.name} - teste 
          <br />
          {data.email}
        </div>
        <button
          onClick={closeChat}
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            paddingInline: 10,
            borderStyle: 'none',
            fontSize: '12pt',
            backgroundColor: '#FF3F00',
            color: '#fff',
            borderRadius: '20%',
         
          }}
        >

          x
        </button>

      </header>

      <div className={styles.chatMain}>

        <div className={styles.messages} style={{width:"100%"}}>
          {JSON.parse (
            JSON.stringify (filterMessage)
          ).map ((element, index) => {
            return (
              <div
              className={styles.msg}
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  
                  backgroundColor: user.email == element.email ?"#009FFF":"#fff",
                  
                  padding: "8px",
                  
                  borderRadius: '10px',

                  margin: '5px',
                  alignSelf: 'flex-end',
                  marginLeft:user.email == element.email? "0px":"60%",
                  paddingLeft:"16px",
                  fontSize: '14px',

                
                }}
              >
                <b
                  style={{
                    color: element.sender === user.name ? '#fff' : '#009FFF',
                  }}
                >
                  {element.sender} diz:
                </b>



                <div style={{paddingBlock:"3px", color: element.sender === user.name ? '#fff' : '#009FFF'}}> 
      {element.message}
                    </div>
            
              </div>
            );
          })}

        </div>
      </div>
      <div
        style={{
          paddingInline: '20px',
          height: '20px',
        }}
      >
        {typing.email === data.email &&
          typing.status &&
          data.name + ' Typing...'}
      </div>

      <ChatForm
        handleNewMessage={handleNewMessage}
        setMessageInput={setMessageInput}
        messageInput={messageInput}
        Typing={Typing}
        viewMessage={viewMessage}
        CallAttention={CallAttention}
      />
    </div>
  );
};
export default Chat;
