import React from 'react';
import userIcon from '../../../../assets/greenAvatar.png';
import userOffline from '../../../../assets/avatarOffline.png';
import starIcon from '../../../../assets/star.png';
import styles from './contacts.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getContacts} from '../../../../redux/reducers/contacts';

const ContactList = ({
  title,
  status,
  auth,
  handleChat,
  contacts,
  unViewedMessages,
  setUnviewedMessaged,
  message,
}) => {
  const dispatch = useDispatch ();

  const {token, user} = useSelector (state => state.login);

  function checkNotViewedMessage (email) {
    if (unViewedMessages.length) {
      let check = unViewedMessages.some (unviewedMsg => {
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
  const [upDateContacts, setUpdateContacts] = React.useState ([]);
  const [lastUserTosendMessage, setlastUserTosendMessage] = React.useState (0);

  React.useEffect (
    () => {
      if (contacts) {
        setUpdateContacts ([...contacts]);
      }
    },
    [contacts]
  );



  function viewMessage (data) {
    if (unViewedMessages.length) {
      setUnviewedMessaged (() => {
        let newList = unViewedMessages.filter (el => el.email !== data.email);
        return newList;
      });
    }
  }

  return (
    <div style={{margin: 10}}>
      <h5> {title}{`(${contacts.length})`} </h5>
      {contacts.map ((item, index) => {
        return (
          <div
            key={index}
            className={styles.container}
            onClick={() => {
              viewMessage (item);
              handleChat (item);
            }}
          >
            <div
              className={styles.container}
              style={{
                backgroundColor: checkNotViewedMessage (item.email)
                  ?  message?.type ==="alert" && message.email ===item.email ? "#FF3F00":'#0D94FF'
                  : 'transparent',
                width: '100%',
                color: checkNotViewedMessage (item.email) ? '#fff' : '#000',
              }}
            >

              {index % 2 === 0 &&
                <img src={starIcon} alt="start" className={styles.iconStar} />}

              <img
                src={status ? userIcon : userOffline}
                alt="user"
                className={styles.iconUser}
              />
              {item.email}
            </div>
          </div>
        );
      })}

    </div>
  );
};
export default ContactList;
