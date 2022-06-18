import React from 'react';
import User from './components/user';
import styles from './chatStyles.module.css';
import picture from '../../assets/avatar.jpeg';
import ChatForm from './components/form';
import messageAudio from '../../assets/audios/MS.mp3';
import alertAudio from '../../assets/audios/aten.mp3';
import NewUserOnlineAudio from '../../assets/audios/new.mp3';
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

  React.useEffect (() => {
    viewMessage ();
  }, []);

  React.useEffect (

    () => {

 
      console.log(messages[messages.length-1])

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

  //	😀
  return (
    <div className={styles.container}>

      <header className={styles.headingChat}>
        <div className={styles.avatarContainer}>
          <img
            src={data.thumbnail ? data.thumbnail : picture}
            alt="avatar"
            className={styles.avatar}
            style={{opacity: !UserStatus ? '0.4' : '1'}}
          />
        </div>

        <div>
          {data.name}
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

        <div className={styles.messages}>
          {JSON.parse (
            JSON.stringify (filterMessage)
          ).map ((element, index) => {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',

                  maxWidth: '190px',
                  padding: 5,
                  borderRadius: '8px',

                  margin: '5px',
                  alignSelf: 'flex-end',
                  fontFamily: 'cursive',
                  fontSize: '11pt',
                }}
              >
                <b
                  style={{
                    color: element.sender === user.name ? '#0D94FF' : 'purple',
                  }}
                >
                  {element.sender} diz:
                </b>

                {element.message}
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
