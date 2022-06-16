import {createSlice} from '@reduxjs/toolkit';
function createAsyncSlice (config) {
  const slice = createSlice ({
    name: config.name,
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState,
    },
    reducers: {
      startfetch (state) {
        state.contacts.loading = true;
      },
      sucessfetch (state, action) {
        state.loading = true;
        state.data = action.payload;
        state.contacts.error = null;
      },
      errorfetch (state, action) {
        state.loading = true;
        state.data = null;
        state.error = action.payload;
      },
    },
  });
  const {startfetch, sucessfetch, errorfetch} = slice.actions;

  const getData = url => async dispacth => {
    try {
      dispacth (startfetch ());
      const response = await fetch (url);
      const data = await response.json ();
      return dispacth (sucessfetch (data));
    } catch (error) {
      return dispacth (errorfetch (error.message));
    }
  };
}

const boraUser = createAsyncSlice ({
  name: 'teste',
  initialState: {
    auth: false,
  },
});
export default boraUser;
