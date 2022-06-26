import React from "react";
import styles from "./contacts.module.css";
import userIcon from "../../../../assets/profile.png";
function CardListContact({
  user,
  OpenChat,
  index,
  checkNotViewedMessage,
  classifyMessage,
}) {
  return (
    /*
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

                paddingBlock: "15px"




    */

    <div
      style={{
        backgroundColor: checkNotViewedMessage(user.email)
          ? classifyMessage(user.email)
          : "transparent",
          color: checkNotViewedMessage(user.email) ? "#fff" : "#000",
      }}
    >
      <div
        key={index}
        onClick={() => OpenChat(user)}
        className={styles.container}
        style={{
          width: "100%",
       
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          paddingBlock: "15px",
        }}
      >
        <div className={styles.iconbox}>
          <img
            src={user?.thumbnail ? user.thumbnail : userIcon}
            alt="user"
            className={styles.iconUser}
          />
        </div>

        <div>
          <div style={{ paddingBlock: "4px" }}>{user.email}</div>
          <div style={{ fontSize: "11px" }}> last message sent or received</div>
        </div>
      </div>
    </div>
  );
}

export default CardListContact;
