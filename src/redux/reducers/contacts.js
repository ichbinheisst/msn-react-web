import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice ({
  name: 'contacts',
  initialState: { 
      loading: false,
      data: [],
      error: null,
  },
  reducers: {
    startfetchContacts (state) {
      state.loading = true;
    },
    sucessfetchContacts (state, action) {
      state.loading = true;
      state.data = action.payload;
      state.error = null;
    },
    errorfetchContacts (state, action) {
      state.loading = true;
      state.data = null;
      state.error = action.payload;
    },
  },
});
const {
  startfetchContacts,
  sucessfetchContacts,
  errorfetchContacts,
} = slice.actions;

export const getContacts = (token, userId) => async dispacth => {
  try {
    startfetchContacts ();
    const response = await fetch ('https://msnbr.herokuapp.com/user/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify ({userId: userId}),
    });
      if(response.status !==200){
         console.log(response)
         return dispacth (errorfetchContacts ("user not allowed" + response.status));
        
      }

    const data = await response.json ();
    return dispacth (sucessfetchContacts (data));
  } catch (error) {
    return dispacth (errorfetchContacts (error.message));
  }
};
export default slice.reducer;
