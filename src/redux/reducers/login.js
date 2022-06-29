import {createSlice} from '@reduxjs/toolkit';
import {getLocalStorage} from '../helper/getThelocal';
const slice = createSlice ({
  name: 'login',
  initialState: {
    token: {
      loading: false,
      data: {
        token: getLocalStorage ('Msn_token'),
        userId: getLocalStorage ('userId'),
      },
      error: null,
    },
    user: {
      loading: false,
      data: null,
      error: null,
    },
  },
  reducers: {
    startTokenFetch (state) {
      state.token.loading = true;
    },
    sucessTokenFetch: {
      reducer (state, action) {
        state.token.loading = false;
        state.token.data = action.payload;
        state.token.error = null;
      },
      prepare (payload) {
        return {
          payload,
          meta: {
            userId: {
              key: 'userId',
              value: payload.userId,
            },
            localStorage: {
              key: 'Msn_token',
              value: payload.token,
            },
          },
        };
      },
    },
    errorTokenFetch (state, action) {
      state.token.loading = false;
      state.token.data = null;
      state.token.error = action.payload;
    },
    startUserFetch (state) {
      state.user.loading = true;
    },
    sucessUserFetch (state, action) {
      state.user.loading = false;
      state.user.data = action.payload;
      state.user.error = null;
    },
    errorUserFetch (state, action) {
      state.token.loading = false;
      state.user.data = null;
      state.user.error = action.payload;
    },
    logout(state){
       state.token.loading=false;
       state.token.data.token = null
       state.token.data.userId=null;
       state.user.data = null
       
    }
  },
});
export const {
  startTokenFetch,
  sucessTokenFetch,
  errorTokenFetch,
  startUserFetch,
  sucessUserFetch,
  errorUserFetch,
  logout
} = slice.actions;

export default slice.reducer;

export const getToken = user => async dispatch => {
  try {
    dispatch (startTokenFetch ());
    const response = await fetch ('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (user),
    });

    const data = await response.json ();
    if(response.status!==200){
      
      dispatch (errorTokenFetch (data));
      return 
    }
    return dispatch (sucessTokenFetch (data));
  } catch (erro) {
    return dispatch (errorTokenFetch (erro.message));
  }
};
export const getUser = (token, userId) => async dispatch => {
 console.log("userId: " + userId)

  try {
    dispatch (startUserFetch ());
    const response = await fetch ('http://localhost:4000/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify ({userId: userId}),
    });
    const data = await response.json ();
    if(response.status!==200){
      
      dispatch (errorUserFetch (data));
      return 
    }
     
    return dispatch (sucessUserFetch (data));
  } catch (error) {
    return dispatch (errorUserFetch (error.message));
  }
};

export const login = user => async dispatch => {
   console.log(user)
  try {
    const {payload} = await dispatch (getToken (user));
    if (payload.token && payload.userId) {

      await dispatch (getUser (payload.token, payload.userId));
    }
  } catch (error) {
    console.log (error.message);
  }
};

export const autologin = payload => async (dispatch, getState) => {
  try {
    const {login} = await getState ();


     console.log(login.token)
    if (login.token.data.token && login.token.data.userId) {



      const userId = login.token.data.userId;
      const token = login.token.data.token;
      return dispatch (getUser (token, userId));
    }
  } catch (error) {}
};
