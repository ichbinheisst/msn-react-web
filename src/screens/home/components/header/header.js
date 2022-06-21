import React from "react";
import styles from "./headerStyles.module.css";
import microsoftIcon from "../../../../assets/microsoft.png";
import avatar from "../../../../assets/icon.png";
import { animated, useSpring, useTransition } from "@react-spring/web";
import CardUserOnline from "../../../userAlertCard/cardUserOnline";
import OnlineAudio from "../../../../assets/audios/new.mp3";
import { useNavigate } from "react-router-dom";

const Header = ({ user, newUserOnline, contacts, message }) => {
  const [newUserOnlineModal, setNewUserOnlineModal] = React.useState(false);
  const [newUser, setNewUser] = React.useState();
  const [animating, setAnimating] = React.useState(false);
  const navigate = useNavigate();

  function NewUserEnter() {
    let audio = new Audio(OnlineAudio);
    audio.play();
    setNewUserOnlineModal(true);
    setTimeout(() => {
      setNewUserOnlineModal(false);
    }, [6000]);
  }

  React.useEffect(() => {
    if (newUserOnline?.status === "online") {
      if (!newUserOnlineModal) {
        NewUserEnter();
        let thumbNail = contacts.find((el, index) => {
          return el.email === newUserOnline.contact;
        });
        setNewUser(thumbNail);
      }
    }
  }, [newUserOnline]);

  

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
    if (message?.type === "alert") {
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
      }, 2222);
    }
  }, [message]);

  return (
    <header className={styles.container}>
      {newUserOnlineModal && (
        <div
          className={styles.newUserOnlineBox}
          style={{ left: window.screen.width < 1100 ? "1vw" : "40vw" }}
        >
          <CardUserOnline data={newUser} />
        </div>
      )}

      <div className={styles.boxIcon}>
        <div className={styles.cicleIcon}>
          <img
            src={microsoftIcon}
            alt="icon"
            style={{ height: "12px", width: "12px" }}
          />
        </div>
        windows Live Messanger
      </div>
      <div className={styles.NameBioBox}>
        <animated.div style={animating ? styling : {}}>
          <div className={styles.avatarContainer}>
            <img
              src={!user.thumb ? avatar : user.thumb}
              alt="avatar"
              className={styles.avatar}
            />
          </div>
        </animated.div>

        <div>
          <b>
            {" "}
            {user?.name}
            {user?.lastName}
          </b>{" "}
          (connectado)
          <br />
          <div style={{ marginTop: "4px" }}>{user?.email}</div>
          <div style={{ marginTop: "4px" }}>
            whatever happens in Vegas,stay in Vegas!
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
