import React from "react";
import User from "./components/user";
import styles from "./chatStyles.module.css";
import picture from "../../assets/avatar.jpeg";
import ChatForm from "./components/form";
import messageAudio from "../../assets/audios/MS.mp3";
import alertAudio from "../../assets/audios/aten.mp3";
import NewUserOnlineAudio from "../../assets/audios/new.mp3";
import { useSpring, animated } from "react-spring";
import ModalGIF from "./components/modalGif";
import {
  MessageText,
  MessageImage,
  MessageNativeGif,
} from "./components/messageBody";
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
  const [message, setMessage] = React.useState({});
  const [messageInput, setMessageInput] = React.useState("");
  const [filterMessage, setFilterMessage] = React.useState([]);
  const [UserStatus, setUserStatus] = React.useState();
  const [animating, setAnimating] = React.useState(false);
  const [file, setFile] = React.useState();
  const [loadingFile, setLoadingFile] = React.useState(false);
  const [showGifOptions, setShowGifOptions] = React.useState(false);

  function Typing(status) {
    socket.emit("typing", {
      room: data.email,
      email: user.email,
      sender: user.name,
      status: status,
    });
  }

  function DisplayMessage(message, user, index) {
    if (message.type === "image") {
      return MessageImage(message, user, index);
    }
    if (message.type === "gif") {
      return MessageNativeGif(message, user, index);
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
    if (messages.length) {
      let novo = messages.filter((el) => {
        let x = el.email === data.email || el.room === data.email;
        return x;
      });

      setFilterMessage(novo);
    }
    return () => {};
  }, [messages, data]);

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
      alert("missing argument");
      return;
    }

    setLoadingFile(true);
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
          setLoadingFile(false);
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
        setLoadingFile(false);
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
        message: ` ${user.name} chamou atenção 😖 😖`,
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

  function sendGifMessage(index) {
    socket.emit(
      "createMsg",
      {
        senderID: user._id,
        sender: user.name,
        email: user.email,
        room: data.email,
        message: String(index),
        time: "22:00",
        type: "gif",
      },
      function (res) {
        setMessage(res);
        //setFile();
        setLoadingFile(false);
      }
    );
  }

  function displayGIFModal() {
    setShowGifOptions(!showGifOptions);
  }
  return (
    <div
      className={styles.container}
      style={{ borderRadius: isMobile ? "0px" : "8px" }}
    >
      <div>
        <button onClick={() => closeChat(data)} className={styles.closeButton}>
          x
        </button>

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
        </header>
      </div>

      {loadingFile && (
        <div
          className={styles.oadingfilecontainer}
          style={{
            top: isMobile ? "90px" : "-20px",
          }}
        >
          <LoadingBar />
        </div>
      )}

      <div
        style={{ alignSelf: "center", left: "20%", position: "absolute" }}
      ></div>
      <div className={isMobile ? styles.chatMain : styles.chatMainDeskTop}>
        <div className={styles.messages} style={{ width: "100%" }}>
          {filterMessage.map((element, index) =>
            DisplayMessage(element, user, index)
          )}
        </div>
      </div>

      <div className={styles.typingcontainer}>
        {typing.email === data.email &&
          typing.status &&
          data.name + " Typing..."}
      </div>
      {showGifOptions && (
        <div className={styles.giftmodalcontainer}>
          <ModalGIF sendGifMessage={sendGifMessage} />
        </div>
      )}
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
        displayGIFModal={displayGIFModal}
      />
    </div>
  );
};
export default Chat;
