import React from 'react';
import styles  from './modalStyles.module.css'
import avatar from '../../../../../assets/avatar.jpeg'
 export default function ModalResult({state, user, close}){
    return (
        
        <div className={ state ?  styles.container: styles.off}> 
        <button
        style={{position:"absolute" ,right:10, top:20, 
        backgroundColor:"#ff3f00", 
        borderStyle:"none", 
        color:"#fff", 
        fontWeight:"bold", 
        paddig:"4px",
        borderRadius:"3px"
       
    
    }}
        onClick={close}
        > 
            x
        </button>
        {
            user ?
            <div style={{display:"flex",alignContent:"center", alignItems:'center', justifyContent:"space-around",marginTop:"5%"}}>

            <div style={{display:"flex",alignContent:"center", alignItems:"center"}}> 
                <div className={styles.avatarcontainer}>
                  <img src={avatar} alt="avatar" className={styles.avatar} />
               </div >

               <div style={{fontSize:"8pt"}}>
                   <b> {user?.name}{user?.lastName}</b>
                 <div style={{marginTop: '4px'}}>
                    {user?.email}
                
                   </div>
            </div>
        </div>
        <button style={{alignSelf:'flex-end'}}> 
         enviar convite
        </button>
        </div>
        :
        <div> 
            user Not found
          </div>
        }
          
         
            
        </div>
    )
 }