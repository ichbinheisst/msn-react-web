import React from "react";
import style from "./style.module.css";
import Image from "./image";
import fatDudeShowBut from "../../../../assets/gifs/tenor (1).gif";
import throwWatterBalloon from "../../../../assets/gifs/tenor (2).gif";
import wreckingTheGuitar from "../../../../assets/gifs/tenor (3).gif";
import CatPlayTheGuitar from "../../../../assets/gifs/tenor (4).gif";
import Kiss from "../../../../assets/gifs/tenor (5).gif";
export function MessageText(message, user, index) {
  return (
    <div
      key={index}
      className={style.containermessagetext}
      style={{
        backgroundColor: user.email == message.email ? "#009FFF" : "#fff",
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
      key={index}
      className={style.containermessagetext}
      style={{
        backgroundColor: user.email == message.email ? "#009FFF" : "#fff",
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

export function MessageNativeGif(message, user, index) {
  return (
    <div
      key={index}
      className={style.containermessagetext}
      style={{
        backgroundColor: user.email == message.email ? "#009FFF" : "#fff",
      }}
    >
      <b
        style={{
          color: message.sender === user.name ? "#fff" : "#009FFF",
        }}
      >
        {message.sender} diz:
      </b>
      <img src={NativeGif(message.message)} />
    </div>
  );
}
//
function NativeGif(gif) {
  if (gif == 1) {
    return fatDudeShowBut;
  }
  if (gif == 2) {
    return throwWatterBalloon;
  }
  if (gif == 3) {
    return wreckingTheGuitar;
  }
  if (gif == 4) {
    return CatPlayTheGuitar;
  }
  if (gif == 5) {
    return Kiss;
  }
  return "";
}
