import React from 'react';
import styles from './styles.module.css';
import Icon from '../../../../assets/document.png';
//import {AiOutlineMail, AiOutlineFolderOpen} from 'react-icons/ai';

const icons = [1, 2, 3, 4];
const icons2 = [1, 2];
/*
const iconLeft = [
  {
    icon: 'AiOutlineMail',
  },
  {
    icon: 'AiOutlineMail',
  },
  {
    icon: 'AiOutlineMail',
  },
  {
    icon: 'AiOutlineMail',
  },
];


function getIcon (key) {
  switch (key) {
    case 1:
      return <AiOutlineMail color="#000" size={30} />;
    case 2:
      return <AiOutlineFolderOpen color="#000" size={30} />;

    default:
      return;
  }
}

*/
const ToolBar = () => {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: 'flex',
        }}
      >
        {icons.map ((el, index) => {
          return (
            <button
              key={index}
              style={{
                marginInline: '5%',
                border: 'none',
                backgroundColor: 'transparent',
              }}
            >
              <img
                src={Icon}
                alt="icon"
                style={{
                  border: 'none',
                  width: '6vw',
                  maxWidth:"22px"
                  
                }}
              />

            </button>
          );
        })}

      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {icons2.map ((el, index) => {
          return (
            <button
              key={index}
              style={{
                marginInline: '10px',
                border: 'none',
                backgroundColor: 'transparent',
              }}
            >
              <img
                src={Icon}
                alt="icon"
                style={{
                  border: 'none',
                  width: '20px',
                  height: '20px',
                }}
              />

            </button>
          );
        })}

      </div>

    </div>
  );
};
export default ToolBar;
