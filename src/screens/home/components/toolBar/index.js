import React from "react";
import styles from "./styles.module.css";
import Icon from "../../../../assets/document.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/reducers/login";

const icons = [1, 2, 3, 4];

const ToolBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function Logout() {
    try {
      window.localStorage.removeItem("Msn_token");
      window.localStorage.removeItem("userId");
      dispatch(logout());
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    } catch (error) {
      console.log("it was no possible logout ");
      return;
    }
  }

  function NavigateToNotification() {
    navigate("/notification");
  }

  const icon2 = [
    {
      name: "",
      action: NavigateToNotification,
    },
    {
      name: "",
      action: Logout,
    },
  ];
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
        }}
      >
        {icons.map((el, index) => {
          return (
            <button key={index} className={styles.toolbarbutton}>
              <img src={Icon} alt="icon" className={styles.thumbnailbutton} />
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {icon2.map((el, index) => {
          return (
            <button
              onClick={() => el.action()}
              key={index}
              className={styles.toolbarbutton}
              style={{
                marginInline: "10px",
              }}
            >
              <img src={Icon} alt="icon" className={styles.thumbnailbutton} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default ToolBar;
