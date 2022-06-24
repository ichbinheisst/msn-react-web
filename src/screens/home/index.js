import React from "react";
import Header from "./components/header/header";
import ToolBar from "./components/toolBar";
import ContactList from "./components/contactList";
import SearchBar from "./components/search";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../redux/reducers/contacts";
import { io } from "socket.io-client";
import Chat from "../chat";
import CardUserOnline from "../userAlertCard/cardUserOnline";
import messageAudio from "../../assets/audios/MS.mp3";
import alertAudio from "../../assets/audios/aten.mp3";
import styles from "./home.module.css";
import { connectSocket } from "./socket";
import { UpdateOrderContacts } from "./updateContactOrder";
import { OpenConnnectionNGetMessage } from "../../redux/reducers/socket";
const Home = () => {
  const [openChat, setOpenChat] = React.useState(false);
  const [chatwith, setChatWith] = React.useState({});
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.login);
  const [typing, setTyping] = React.useState({});
  const [newUserModal, setNewModalUser] = React.useState(false);
  const [Socket, setSocket] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState({});
  const [upDateContacts, setUpdateContacts] = React.useState([]);
  const UserContacts = useSelector((state) => state.contacts.data);
  const [userWhosentMessage, setUserWhosentMessage] = React.useState([]);
  const [newUserOnline, setNewUserOnline] = React.useState();
  const [isMobile, setMobile] = React.useState(false);

  React.useEffect(() => {
    if (window.screen.width < 600) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [handleChat]);

  let audio = new Audio(messageAudio);

  React.useEffect(() => {
    if (token.data.token) {
      dispatch(getContacts(token.data.token, token.data.userId));
    }

  
  }, []);



  React.useEffect(() => {
    setTimeout(() => {
      // setNewModalUser(true);
    }, 1000);
  }, []);

  React.useEffect(() => {
    // dispatch(OpenConnnectionNGetMessage(io, token.data.userId,token.data.token))
    connectSocket(
      io,
      setSocket,
      user,
      token,
      UserContacts,
      setMessages,
      messages,
      setTyping,
      setMessage,
      setNewUserOnline
    );
  }, [UserContacts]);

  React.useEffect(() => {
    if (message?.type === "message" ||message?.type =='image' ) {
      audio.play();
      setMessages([...messages, message]);
    }




    if (message?.type === "alert") {
      let alertaudio = new Audio(alertAudio).play();
      setMessages([...messages, message]);
    }
  }, [message]);





  React.useEffect(() => {
    if (Array.isArray(UserContacts)) {
      setUpdateContacts([...UserContacts]);
    }
  }, [UserContacts]);

  React.useEffect(() => {
    UpdateOrderContacts(
      messages,
      upDateContacts,
      setUpdateContacts,
      setUserWhosentMessage,
      userWhosentMessage
    );
  }, [messages]);

  function handleChat(data) {
    setOpenChat(true);
    setChatWith(data);
  }

  function closeChat() {
    setOpenChat(false);
  }

  function UpdateMessages(msg) {
    setMessages([...messages, msg]);
  }

  function setMobileVersion() {
    if (!openChat) {
      return false;
    }
    if (openChat && isMobile) {
      return true;
    }
    if (openChat && !isMobile) return false;
  }

  function mobileMain() {
    if (isMobile && openChat) {
      return {
        width: "0.1vw",
        height: "0vh",
        display: "none",
      };
    }

    if (!isMobile && openChat) {
      return {
        display: "show",
        width: "100vw",
        marginRight: "1%",
      };
    }

    if (isMobile && !openChat) {
      return {
        width: "100vh",
      };
    }

    if (!isMobile && !openChat) {
      return {
        display: "show",
        width: "100vw",
      };
    }
  }

  function ChatMobileDesk(isMobile) {
    if (isMobile) {
      return {
        position: "relative",
        width: setMobileVersion() ? "100vw" : "30vw",
   
        marginRight: isMobile ? "0" : "1%",
      
       
        
      };
    }
    return {
      position: "absolute",
      width: setMobileVersion() ? "100vw" : "360px",
  
      marginRight: isMobile ? "0" : "1%",
      right: "5vw",
      bottom:0, 
      borderRadius:"8px"
    };
  }

  function sendContactRequest(data) {
 

    // const { email,sendID,senderEmail,senderPicture,senderToken} = data
    Socket.emit("notification_client_to_server", data, function (res) {
    
    });
  }

  //1F600	😀
  return (
    <div>
      <div style={{ width: "100vw", display: "flex" }}>
        {
          <div style={{ ...mobileMain() }}>
            <Header
              user={user.data}
              newUserOnline={newUserOnline}
              contacts={UserContacts}
              message={message}
              sendContactRequest={sendContactRequest}
            />

            <ToolBar />
            <SearchBar sendContactRequest={sendContactRequest} />
            <ContactList
              title={"Conectados"}
              status={true}
              auth={token.data}
              handleChat={handleChat}
              contacts={upDateContacts}
              unViewedMessages={userWhosentMessage}
              setUnviewedMessaged={setUserWhosentMessage}
              message={message}
              messages={messages}
              Mobile={isMobile}
            />
          </div>
        }

        {openChat && (
          <div style={ChatMobileDesk(isMobile)}>
            <Chat
              socket={Socket}
              data={chatwith}
              closeChat={closeChat}
              messages={messages}
              changeChat={openChat}
              user={user.data}
              UpdateMessages={UpdateMessages}
              typing={typing}
              newUserOnline={newUserOnline}
              unViewedMessages={userWhosentMessage}
              setUnviewedMessaged={setUserWhosentMessage}
              isMobile={isMobile}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
