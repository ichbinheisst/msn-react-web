import React from 'react';
import styles from './styles.module.css';
import microsoftIcon from '../../../assets/avatar.jpeg';
import IconSoft from '../../../assets/w.png';
export default function CardUserOnline({closeUserModal,data}) {
  return (
    <div className={styles.container} onClick={closeUserModal}>
      <div style={{paddingBlock: '10px', color: 'grey', fontSize:'11px'}}>

        <img src={IconSoft} alt="icon" style={{width: '20px'}} />

        {' '}
        Windows Live Messenger

        <button
          style={{
            fontSize: '13px',
            borderStyle: 'none',
            backgroundColor: 'transparent',
            color: 'grey',
            marginLeft: 10,
          }}
        >
          {' '}
          x
        </button>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', paddingInline:"10px"}}>
        <div className={styles.avatarContainer}>
          <img src={data?.thumbnail? data.thumbnail:microsoftIcon} alt="avatar" className={styles.avatar} />
        </div>
        
        <div style={{alignSelf: 'center', color: 'black', maxWidth:"40%",fontSize:"10px"}}>
          {data?.name} {data?.lastName} has just signed
        </div>

      </div>

    </div>
  );
}
