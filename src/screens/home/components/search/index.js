import React from 'react';
import avatar from '../../../../assets/greenAvatar.png';
import {AiOutlineSearch} from 'react-icons/ai';
import styles from './search.module.css';
import { useDispatch,useSelector } from 'react-redux';
import { searchContact } from '../../../../redux/reducers/searchNewContact';
import ModalResult from './modalResult';
import { closeResultModal } from '../../../../redux/reducers/searchNewContact';
 
const SearchBar = () => {
 const [searchInput, setSearchInput] = React.useState('')
 const dispatch = useDispatch()

const contact = useSelector((state)=> state.searchNewContact )
 console.log(contact.data && contact.data)

      const handleSearch= (event)=>{
        event.preventDefault()
        if(searchInput.trim()){
             dispatch(searchContact(searchInput)) 
        }
        
        
      }


        function closeModal(){
          dispatch(closeResultModal())
        }      

   
  return (
    <> 
    <div className={styles.container}>
      <form className={styles.searchContainer}onSubmit={handleSearch} >
        <input
          type="text"
          placeholder="search a new contact"
          className={styles.searchInput}
           value= {searchInput}
          onChange={({target})=> setSearchInput(target.value)}
          
        />
        <button className={styles.searchButton}>
          <AiOutlineSearch size={'20px'} />
        </button>
      </form>

      <button className={styles.addUserButton}
      
      onClick={handleSearch}
      >
        <img
          src={avatar}
          alt="add user"
          style={{width: '22px', height: '20px'}}
        />

      </button >

    </div>

   { contact.modal && 
     <div style={{
        display:"flex",
        alignSelf:"center",
        alignItems:"center", 
        width:"100vw",
        justifyContent:"center"}}> 
        <ModalResult state = {contact.modal} user={contact.data} close={closeModal}/>
        </div>


   }
       
  
 
   
    </>
  );
};
export default SearchBar;
