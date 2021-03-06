import React from "react";
import User from "./components/user";
import styles from "./chatStyles.module.css";
import picture from "../../assets/avatar.jpeg";
import ChatForm from "./components/form";
import messageAudio from "../../assets/audios/MS.mp3";
import alertAudio from "../../assets/audios/aten.mp3";
import NewUserOnlineAudio from "../../assets/audios/new.mp3";
import { useSpring, animated } from "react-spring";
import { MessageText, MessageImage } from "./components/messageBody";
import LoadingBar from "./components/loadingBar";
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
  isMobile,
}) => {
  const header = ["Fotos", "Arquivos", "videos", "chamadas"];
  const test = [1, 2, 3, 4, 5];

  const [message, setMessage] = React.useState({});
  const [messageInput, setMessageInput] = React.useState("");
  const [filterMessage, setFilterMessage] = React.useState([]);
  const [UserStatus, setUserStatus] = React.useState();
  const [animating, setAnimating] = React.useState(false);
  const [file, setFile] = React.useState();
  const [loadingFile, setLoadingFile] = React.useState(false);

  function Typing(status) {
    socket.emit("typing", {
      room: data.email,
      email: user.email,
      sender: user.name,
      status: status,
    });
  }

  // change colorback

  function DisplayMessage(message, user, index) {
    if (message.type === "image") {
    
      return MessageImage(message, user, index);
    }
    return MessageText(message, user, index);
  }

  function viewMessage() {
    if (unViewedMessages.length) {
      setUnviewedMessaged(() => {
        let newList = unViewedMessages.filter((el) => el.email !== data.email);
        return newList;
      });
    }
  }

  React.useEffect(() => {
    if (
      messages.length &&
      messages[messages.length - 1].type == "alert" &&
      messages[messages.length - 1].email == data.email
    ) {
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
      }, 2000);
    }
  }, [messages]);

  const styling = useSpring({
    config: { duration: 50 },
    to: [
      { marginLeft: "5px" },
      { marginLeft: "-5px" },
      { marginLeft: "5px" },
      { marginLeft: "-5px" },
      { marginLeft: "5px", opacity: 0.5 },
      { marginLeft: "5px", opacity: 0.5 },
      { marginLeft: "-5px", opacity: 1 },
      { marginLeft: "5px", opacity: 0.5 },
      { marginLeft: "-5px", opacity: 1 },
      { marginLeft: "5px" },
      { marginLeft: "5px" },
    ],
    from: { marginLeft: "5px" },
  });

  React.useEffect(() => {
    viewMessage();
  }, []);

  React.useEffect(() => {
    // filter the message that belong the user to be displayed in each user

    if (messages.length) {
      let novo = messages.filter((el) => {
        let x = el.email === data.email || el.room === data.email;
        return x;
      });

      setFilterMessage(novo);
    }
    return () => {};
  }, [messages, data]);

  console.log("Filtered:" + filterMessage.length);
  console.log("Messages:" + messages.length);

  React.useEffect(() => {
    socket.emit("checkUserOnline_client", { room: data.email });
    socket.on("checkUserOnline_server", (params) => {
      if (params.contact === data.email) {
        setUserStatus(params.status);
      }
    });
  }, [data, newUserOnline]);

  React.useEffect(() => {
    if (message.message) {
      UpdateMessages(message);
    }
  }, [message]);

  function handleNewMessage(event) {
    event.preventDefault();
    if (!messageInput.trim()) {
       alert("missing argument")
      return;

   
    }

     setLoadingFile(true)
    if (file) {
      setFile();
      socket.emit(
        "createMsg",
        {
          senderID: user._id,
          sender: user.name,
          email: user.email,
          room: data.email,
          message: "send a message",
          mimeType: file.type,
          file: file,
          fileName: file.name,
          size: file.size,
          time: "22:00",
          type: "image",
        },
        function (res) {
          setMessage(res);
          setLoadingFile(false)
          setFile();
        }
      );

      // setMessages ([...messages, msg]);
      setMessageInput("");

      return;
    }

    socket.emit(
      "createMsg",
      {
        senderID: user._id,
        sender: user.name,
        email: user.email,
        room: data.email,
        message: messageInput,
        time: "22:00",
        type: "message",
      },
      function (res) {
        setMessage(res);
        //setFile();
        setLoadingFile(false)
      }
    );

    // setMessages ([...messages, msg]);
    setMessageInput("");

    return;
  }

  function CallAttention() {
    socket.emit("callAttentionUser", {
      room: data.email,
      user: { name: user.name, id: user._id, email: user.email },
    });

    socket.emit(
      "createMsg",
      {
        senderID: user._id,
        sender: user.name,
        email: user.email,
        room: data.email,
        message: ` ${user.name} chamou aten????o ???? ????`,
        time: "22:00",
        type: "alert",
      },
      //
      function (res) {
        setMessage(res);

        new Audio(alertAudio).play();
        setAnimating(true);
        setTimeout(() => {
          setAnimating(false);
        }, 1000);
      }
    );
  }

  //   <LoadingBar />
  //	????
  return (
    <div
      className={styles.container}
      style={{ borderRadius: isMobile ? "0px" : "8px" }}
    >
      <header className={styles.headingChat}>
        <animated.div style={animating ? styling : {}}>
          <div className={styles.avatarContainer}>
            <img
              src={data.thumbnail ? data.thumbnail : picture}
              alt="avatar"
              className={styles.avatar}
              style={{ opacity: !UserStatus ? "0.4" : "1" }}
            />
          </div>
        </animated.div>

        <div>
          {data.name} - teste
          <br />
          {data.email}
        </div>
        <button
          onClick={()=> closeChat(data)}
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            paddingInline: 10,
            borderStyle: "none",
            fontSize: "12pt",
            backgroundColor: "#FF3F00",
            color: "#fff",
            borderRadius: "20%",
          }}
        >
          x
        </button>
      </header>

      {loadingFile && (
        <div
          style={{
            alignSelf: "center",
            left: "20%",
            position: "absolute",
            top: isMobile ? "90px" : "-20px",
          }}
        >
       <LoadingBar/>
        </div>
      )}

      <div
        style={{ alignSelf: "center", left: "20%", position: "absolute" }}
      >
        
      </div>
      <div className={isMobile ? styles.chatMain : styles.chatMainDeskTop}>
        <div className={styles.messages} style={{ width: "100%" }}>
          {filterMessage.map((element, index) =>
            DisplayMessage(element, user, index)
          )}
        </div>
      </div>
      <div
        style={{
          paddingInline: "20px",
          height: "20px",
          fontWeight: "bolder",
          fontFamily: "cursive",
          color: "#009FFF",
        }}
      >
        {typing.email === data.email &&
          typing.status &&
          data.name + " Typing..."}
      </div>

      <ChatForm
        handleNewMessage={handleNewMessage}
        setMessageInput={setMessageInput}
        messageInput={messageInput}
        Typing={Typing}
        viewMessage={viewMessage}
        CallAttention={CallAttention}
        file={file}
        setFile={setFile}
        loadingFile={loadingFile}
        setLoadingFile={setLoadingFile}
      />
    </div>
  );
};
export default Chat;
