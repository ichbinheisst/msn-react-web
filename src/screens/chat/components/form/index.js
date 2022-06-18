import React from 'react';
import style from '../../chatStyles.module.css';
import buzz from '../../../../assets/buzz.png';
export default function ChatForm({
  handleNewMessage,
  setMessageInput,
  messageInput,
  Typing,
  viewMessage,
  CallAttention,
}) {
  const emojis = [
    '😀',
    '😆',
    '🤣',
    '😍',
    '😇',
    '😝',
    '🤑',
    '🤐',
    '🙄',
    '🥴',
    '😱',
  ];

  function addEmoji (index) {
    setMessageInput (messageInput + emojis[index]);
  }

  return (
    <div>

      <div style={{display: 'flex', flexDirection: 'row'}}>

        <div className={style.chatFormIconBox}>
          {emojis.map ((emoj, index) => {
            return (
              <div
                className={style.chatFormIconEmojiBox}
                key={index}
                onClick={() => addEmoji (index)}
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
            style={{width: '38px', alignSelf: 'center'}}
          />
        </button>

      </div>
      <form
        onSubmit={handleNewMessage}
        style={{
          display: 'flex',
          alignContent: 'center',
          height: '5vh',
          minHeight:"50px",
          backgroundColor: '#0D94FF ',
          alignItems: 'center',
          paddingInline: '5px',
          borderRadius: '8px',
          paddingBottom: '2%',
          overflow: 'auto',
        }}
      >
        <input
          onChange={text => {
            setMessageInput (text.target.value);
          }}
          value={messageInput}
          style={{
            width: '90vw',
            height: '70%',
            borderStyle: 'none',
            marginInline: '10px',
            borderRadius: '8px',
            paddingInline: '20px',
          }}
          name="message"
          type="text"
          placeholder="Message"
          onBlur={() => {
            Typing (false);
          }}
          onFocus={({target}) => {
            Typing (true);
            viewMessage ();
          }}

          //autocomplete="off"
        />
        <button
          onClick={handleNewMessage}
          style={{
            borderStyle: 'none',
            height: '70%',
            borderRadius: '5px',
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
