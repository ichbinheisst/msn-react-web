import React from "react";
import styles from "./styles.module.css";
import icon from "../../assets/tenor.gif";
export default function LoadingPage() {
  return (
    <div className={styles.container}>
     <img src={icon} style={{width:"100px"}}/>
    </div>
  );
}
