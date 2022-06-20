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
 const [isMobile,setMobile] = React.useState(false)


 React.useEffect(()=>{
 if(window.screen.width < 600){
    setMobile(true)
 }else{
  setMobile(false)
 }
 },[handleChat])
 

  let audio = new Audio(messageAudio);

  React.useEffect(() => {
    if (token.data.token) {
      console.log(token.data.userId);
      dispatch(getContacts(token.data.token, token.data.userId));
      console.log(token.data);
    }

    // console.log(token.data)
  }, []);

  // console.log(user)

  React.useEffect(() => {
    setTimeout(() => {
      setNewModalUser(true);
    }, 1000);
  }, []);

  function closeUserModal() {
    setNewModalUser(false);
  }

  React.useEffect(() => {
    if (Array.isArray(UserContacts) && UserContacts.length) {
      setUpdateContacts([...UserContacts]);
    }
  }, [UserContacts]);

  React.useEffect(() => {
    if (!Array.isArray(UserContacts) || !UserContacts.length) {
      console.log("loading");
    } else {
      setSocket(() => {
        const userId = user.data._id;
        const authToken = token.data.token;
        const socketIo = io("https://msnbr.herokuapp.com", {
          auth: {
            token: authToken,
            userId: userId,
          },
        });
        socketIo.on("connect", () => {
          console.log("socket is ready");
        });

        const Contacts = UserContacts.map((element) => element.email);

        socketIo.emit(
          "enroll",
          {
            id: user.data._id,
            email: user.data.email,
            token: authToken,
            contacts: Contacts,
          },
          () => {}
        );

        socketIo.on("messageReceivedOffline", (data, callback) => {
          setMessages([...messages, ...data]);
          callback();
        });
        socketIo.on("typing" + user.data.email, (params) => {
          setTyping(params.params);
        });
        socketIo.on(user.data.email, (response) => {
          if (response) {
            setMessage(response);

            console.log("aqui esta o type :" + response.type);

            if (response.type === "message" || response.type === "picture") {
            }
          }
        });

        socketIo.on("userIsOnline:" + user.data.email, (params) => {
          setNewUserOnline(params);
        });

        return socketIo;
      });
    }
  }, [UserContacts]);

  React.useEffect(() => {
    if (message?.type === "message") {
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
    if (messages.length && upDateContacts.length) {
      const last = messages[messages.length - 1];
      console.log("okay");

      let discoverContactsIndex = upDateContacts.find((el, index) => {
        if (el.email === last.email) {
          if (index > 0) {
            setUpdateContacts(() => {
              let copy = JSON.parse(JSON.stringify(upDateContacts));
              copy.splice(0, 0, copy.splice(index, 1)[0]);

              return copy;
            });
          }
        }

        return el.email === last.email;
      });
      if (discoverContactsIndex !== undefined) {
        setUserWhosentMessage([...userWhosentMessage, discoverContactsIndex]);
      }
    }
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

  function setMobileVersion(){
    if(!openChat){
        return  false
    }
     if(openChat && isMobile ){
      return true
     }
     if(openChat && !isMobile)
      return false


  }



  function mobileMain(){
    if(isMobile  && openChat){
      return {
        display:"none", 
        width:"0vh"

      }
    }

    if(!isMobile && openChat){
      return {
        display:"show", 
        width:"65vw",
        marginRight:"1%"
      }
    }
       
     if(isMobile && !openChat){
        return {
    
          width:"100vh",
         
          
        }
     }
     
     if(!isMobile && !openChat){
      return {
        display:"show", 
        width:"100vw", 
       
        
      }
     }
  }


  //1F600	😀
  return (
    <div>

      <div style={{ width: "100vw", display: "flex",}}>
        {
        
        
         <div style={{...mobileMain()}}>
       
      <Header
        user={user.data}
        newUserOnline={newUserOnline}
        contacts={UserContacts}
        message={message}
      />

          <ToolBar />
          <SearchBar />
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
          />
        </div>
}








        {openChat && (
          <div
            style={{
              position: "relative",
              width: setMobileVersion()? "100vw":"33vw",
              backgroundColor:"#fff", 
             
              marginRight:isMobile?"0": "1%"
              

            
             
          
              
         
           
            }}
          >
        
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
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
