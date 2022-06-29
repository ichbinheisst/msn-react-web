import React from "react";
import style from "../../chatStyles.module.css";
import buzz from "../../../../assets/buzz.png";
import camera from "../../../../assets/camera.png";
export default function ChatForm({
  handleNewMessage,
  setMessageInput,
  messageInput,
  Typing,
  viewMessage,
  CallAttention,
  file,
  setFile,
}) {
  const emojis = [
    "😀",
    "😆",
    "🤣",
    "😍",
    "😇",
    "😝",
    "🤑",
    "🤐",
    "🙄",
    "🥴",
    "😱",
  ];

  function addEmoji(index) {
    setMessageInput(messageInput + emojis[index]);
  }
  async function selectFile(e) {
    if (file) {
      await setFile();
      setMessageInput("");
      return 
    }
    await setFile(e.target.files[0]);

    setMessageInput(e.target.files[0].name);
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className={style.chatFormIconBox}>
          {emojis.map((emoj, index) => {
            return (
              <div
                className={style.chatFormIconEmojiBox}
                key={index}
                onClick={() => addEmoji(index)}
              >
                {emoj}
              </div>
            );
          })}
        </div>
        <button className={style.buzzButton} onClick={CallAttention}>
          <img
            src={buzz}
            alt="pissOff"
            style={{ width: "38px", alignSelf: "center" }}
          />
        </button>
        {file ? (
          <label
            style={{
              cursor: "pointer",
              width: 50,
              height: 42,
              marginInline: "3px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              backgroundColor:"red", 

            }}
          >
            <button
              style={{ borderStyle: "none", backgroundColor: "transparent" , fontSize:"2rem", fontWeight:"bold", color:"#fff"}}
              onClick={(e) => selectFile(e)}
            >
            x
            </button>
          </label>
        ) : (
          <label
            style={{
              cursor: "pointer",
              width: 50,
              height: 45,
              marginInline: "3px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => selectFile(e)}
            />
            <img src={camera} />
          </label>
        )}
      </div>
      <form
        onSubmit={handleNewMessage}
        style={{
          display: "flex",
          alignContent: "center",
          height: "5vh",
          minHeight: "50px",
          backgroundColor: "#0D94FF ",
          alignItems: "center",
          paddingInline: "5px",
          borderRadius: "8px",
          paddingBottom: "2%",
          overflow: "auto",
        }}
      >
        <input
          onChange={(text) => {
            setMessageInput(text.target.value);
          }}
          value={messageInput}
          style={{
            width: "90vw",
            height: "70%",
            borderStyle: "none",
            marginInline: "10px",
            borderRadius: "8px",
            paddingInline: "20px",
          }}
          name="message"
          type="text"
          placeholder="Message"
          onBlur={() => {
            Typing(false);
          }}
          onFocus={({ target }) => {
            Typing(true);
            viewMessage();
          }}

          //autocomplete="off"
        />
        <button
          onClick={handleNewMessage}
          style={{
            borderStyle: "none",
            height: !file ? "70%" : "94%",
            borderRadius: file ? "100px" : "5px",
            backgroundColor: file ? "#FFBF00" : "#fff",
            color: file ? "#0D94FF" : "#0D94FF",
            padding: "3px",
            minWidth: "50px",
            fontSize:file ? "2rem":"1rem", 
            
          }}
        >
          {file ? ">" : "enviar"}
        </button>
      </form>
    </div>
  );
}
