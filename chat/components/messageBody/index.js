import React from "react";
import styles from "../../chatStyles.module.css";
import imageTest from "../../../../assets/meme.jpeg";
import Image from "./image";
import teste from "../.././../../assets/w.png";
export function MessageText(message, user, index) {
  return (
    <div
      className={styles.msg}
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",

        backgroundColor: user.email == message.email ? "#009FFF" : "#fff",

        padding: "8px",

        borderRadius: "10px",

        margin: "5px",
        alignSelf: "flex-end",
        paddingLeft: "16px",
        fontSize: "14px",
      }}
    >
      <b
        style={{
          color: message.sender === user.name ? "#fff" : "#009FFF",
        }}
      >
        {message.sender} diz:
      </b>

      <div
        style={{
          paddingBlock: "3px",
          color: message.sender === user.name ? "#fff" : "#009FFF",
        }}
      >
        {message.message}
      </div>
    </div>
  );
}

export function MessageImage(message, user, index) {
  const blob = new Blob([message.file], { type: message.mimeType });

  return (
    <div
      className={styles.msg}
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: user.email == message.email ? "#009FFF" : "#fff",
        padding: "2px",
        borderRadius: "10px",
        margin: "5px",
        alignSelf: "flex-end",
        fontSize: "14px",
      }}
    >
      <b
        style={{
          color: message.sender === user.name ? "#fff" : "#009FFF",
        }}
      >
        {message.sender} diz:
      </b>
      <Image fileName={message.fileName} blob={blob} />
    </div>
  );
}
//
