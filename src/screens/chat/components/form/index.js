import React from "react";
import style from "../../chatStyles.module.css";
import buzz from "../../../../assets/buzz.png";
import camera from "../../../../assets/camera.png";
import styleForm from "./formstyles.module.css";
export default function ChatForm({
  handleNewMessage,
  setMessageInput,
  messageInput,
  Typing,
  viewMessage,
  CallAttention,
  file,
  setFile,
  displayGIFModal,
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
      return;
    }
    await setFile(e.target.files[0]);

    setMessageInput(e.target.files[0].name);
  }

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "row", marginBottom: "4px" }}
      >
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
        <button
          className={style.gifButton}
          style={{ color: "#fff" }}
          onClick={displayGIFModal}
        >
          GIF
        </button>
        <button className={style.buzzButton} onClick={CallAttention}>
          <img
            src={buzz}
            alt="pissOff"
            className={styleForm.callattentionbuttonicon}
          />
        </button>
        {file ? (
          <button
            className={styleForm.filebuttoncancel}
            onClick={(e) => selectFile(e)}
          >
            x
          </button>
        ) : (
          <label className={styleForm.filebutton}>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => selectFile(e)}
            />
            <img src={camera} style={{ width: "40px" }} />
          </label>
        )}
      </div>

      <form onSubmit={handleNewMessage} className={styleForm.chatform}>
        <input
          onChange={(text) => {
            setMessageInput(text.target.value);
          }}
          value={messageInput}
          className={styleForm.chatInput}
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
        />
        <button
          onClick={handleNewMessage}
          className={
            file ? styleForm.sendimagebutton : styleForm.sendtextbutton
          }
        >
          {file ? ">" : "enviar"}
        </button>
      </form>
    </div>
  );
}
