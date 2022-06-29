import React from "react";
import fatDudeShowBut from "../../../../assets/gifs/tenor (1).gif";
import throwWatterBalloon from "../../../../assets/gifs/tenor (2).gif";
import wreckingTheGuitar from "../../../../assets/gifs/tenor (3).gif";
import CatPlayTheGuitar from "../../../../assets/gifs/tenor (4).gif";
import Kiss from "../../../../assets/gifs/tenor (5).gif";
import styles from "./styles.module.css";
function ModalGIF({ sendGifMessage }) {
  const gifs = [
    fatDudeShowBut,
    throwWatterBalloon,
    wreckingTheGuitar,
    CatPlayTheGuitar,
    Kiss,
  ];
  return (
    <div className={styles.container}>
      {gifs.map((el, index) => {
        return (
          <img
            src={el}
            style={{ height: "40px", marginRight: "15px" }}
            key={index}
            onClick={() => sendGifMessage(index + 1)}
          />
        );
      })}
    </div>
  );
}
export default ModalGIF;
