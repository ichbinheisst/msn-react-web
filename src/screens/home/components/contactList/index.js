import React from "react";
import userIcon from "../../../../assets/greenAvatar.png";
import userOffline from "../../../../assets/avatarOffline.png";
import starIcon from "../../../../assets/star.png";
import styles from "./contacts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../../../redux/reducers/contacts";
import CardListContact from "./contactCard";
const ContactList = ({
  title,
  status,
  auth,
  handleChat,
  contacts,
  unViewedMessages,
  setUnviewedMessaged,
  message,
  messages,
  Mobile,
}) => {
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.login);

  function checkNotViewedMessage(email) {
    if (unViewedMessages.length) {
      let check = unViewedMessages.some((unviewedMsg) => {
        return unviewedMsg.email === email;
      });

      return check;
    }

    return false;
  }

  /*
  React.useEffect (() => {
    dispatch (getContacts (token.data.token, token.data.userId));
  }, []);
*/
  //const Contacts = useSelector (state => state.contacts.contacts.data);
  const [upDateContacts, setUpdateContacts] = React.useState([]);
  const [lastUserTosendMessage, setlastUserTosendMessage] = React.useState(0);
  const [colorItem, setColorItem] = React.useState("");
  const [lastMessageSent, setLastMessageSent] = React.useState({});
  React.useEffect(() => {
    if (contacts) {
      setUpdateContacts([...contacts]);
    }
  }, [contacts]);

  function viewMessage(data) {
    if (unViewedMessages.length) {
      setUnviewedMessaged(() => {
        let newList = unViewedMessages.filter((el) => el.email !== data.email);
        return newList;
      });
    }
  }

  function classifyMessage(email) {
    if (!messages.length) {
      return "transparent";
    }
    let lastIndexMessage = messages[messages.length - 1];

    if (lastIndexMessage.type == "alert" && lastIndexMessage.email == email) {
      return "#FF3F00";
    }

    return "#0D94FF";
  }

  function renderLastMessage(messages) {
    if (messages.length < 0) {
      console.log("okay");
    }
  }
  function renderLastMessage(messages, user) {
    if (messages.length > 0 && user.email == messages) {
    }
  }


 function OpenChat(item){
  viewMessage(item);
  handleChat(item);
 }


  return (
    <div style={{ margin: 10 }}>
      <h5>
        {" "}
        {title}
        {`(${contacts.length})`}{" "}
      </h5>

      {contacts.map((item, index) => {
        return <CardListContact
         user={item} 
         OpenChat={OpenChat}
          index={index} 
          key={index}
          checkNotViewedMessage={checkNotViewedMessage}
          classifyMessage={classifyMessage}
          
          
          />;
      })}
    </div>
  );
};
export default ContactList;

/*
  <div
            key={index}
            className={styles.container}
            style={{ paddingBlock: "15px", marginTop: "10px" }}
            onClick={() => {
              viewMessage(item);
              handleChat(item);
            }}
          >
            <div
              className={styles.container}
              style={{
                backgroundColor: checkNotViewedMessage(item.email)
                  ? classifyMessage(item.email)
                  : "transparent",
                width: "100%",
                color: checkNotViewedMessage(item.email) ? "#fff" : "#000",
                fontSize: Mobile ? "18px" : "14px",
                display: "flex",
                alignItems: "center",
                alignContent: "center",

                paddingBlock: "15px",
              }}
            >
              <div className={styles.iconbox}>
                <img
                  src={item?.thumbnail ? item.thumbnail : userIcon}
                  alt="user"
                  className={styles.iconUser}
                />
              </div>

              <div>
                <div>{item.email}</div>
                <div style={{ fontSize: "11px" }}>
                  {" "}
                 
                </div>
              </div>
            </div>
          </div>







*/
