import React from 'react';
import Icon from '../../../../assets/avatar.jpeg';
import styles from './userStyles.module.css';
const User = () => {
  return (
    <div
      style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}
    >
      <div className={styles.pictureBox}>
        <img src={Icon} alt="icon" style={{width: '90%', height: '90%'}} />
      </div>

      <div style={{marginInline: '20px'}}>
        <div style={{fontSize: '20px', fontFamily: 'serif'}}>
          {' '}Users name (available){' '}
        </div>
        <div style={{fontSize: '14px'}}>
          {' '}random quoting to make look smarter than you actualy are{' '}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#009FFF',
            borderBottomStyle: 'solid',
            borderWidth: '0.4px',
          }}
        >
          {' '}
          another stupid saying{' '}
        </div>
      </div>

    </div>
  );
};
export default User;
