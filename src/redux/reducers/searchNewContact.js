 import { createSlice } from "@reduxjs/toolkit";
 const slice  = createSlice({
  name:"newContact", 
  initialState:{
    loading:false, 
    data:null, 
    error:null, 
    modal:false
  },
  reducers:{
      fetchStartNewUser(state){
        state.loading=true
        state.modal = false
        
      },
      fetchSucessNewUser(state,action){
        state.loading=false;
        state.data = action.payload;
        state.error =null;
        state.modal = true
        
     },
     fetchErrorNewUser(state, action){
     state.loading = false;
     state.data = null;
     state.error = action.payload;  
     state.modal = true 
    },

      closeResultModal(state){
        state.modal = false

      }

  }

 })

export  const {fetchStartNewUser,fetchSucessNewUser,fetchErrorNewUser,closeResultModal}  = slice.actions


 export const searchContact = (email) =>async(dispatch)=>{

    try {
         dispatch(fetchStartNewUser())
         const response = await fetch("https://msnbr.herokuapp.com/user/findUserByEmail",{
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify ({email:email}),})

         const contact = await response.json()
         return dispatch(fetchSucessNewUser(contact))

    } catch (error) {
        dispatch(fetchErrorNewUser(error.message))
    }


 } 

  export default slice.reducer