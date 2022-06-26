import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice ({
  name: 'Notication',
  initialState: { 
      notificationReceiced:{
      loading: false,
      data: [],
      error: null,
      },
      notificationSent:{
        loading: false,
      data: [],
      error: null,

      }
  },
  reducers: {
    startfetchNotificationReceived (state) {
      state.notificationReceiced.loading=true
    },
    sucessfetchNotificationReceived (state, action) {
        state.notificationReceiced.loading=false
      state.notificationReceiced.data = action.payload;
      state.notificationReceiced.error = null;
    },
    errorfetchNotificationReceived (state, action) {
      state.notificationReceiced.loading = true;
      state.notificationReceiced.data = null;
      state.notificationReceiced.error = action.payload;
    },

    startfetchNotificationSent (state) {
        state.notificationSent.loading=true
      },
      sucessfetchNotificationSent (state, action) {
        state.notificationSent.loading=false
        state.notificationSent.data = action.payload;
        state.notificationSent.error = null;
      },
      errorfetchNotificationSent (state, action) {
        state.notificationSent.loading = true;
        state.notificationSent.data = null;
        state.notificationSent.error = action.payload;
      },
  },
});
const {
  startfetchNotificationReceived ,
  sucessfetchNotificationReceived,
  errorfetchNotificationReceived,
  startfetchNotificationSent,
  sucessfetchNotificationSent,
  errorfetchNotificationSent
} = slice.actions;

export const getNotificationReceived = (token, userId) => async dispacth => {
  try {
    startfetchNotificationReceived();
    const response = await fetch ('http://localhost:4444/user/Notifications/Received', {
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
         return dispacth (  errorfetchNotificationReceived ("user not allowed" + response.status));
        
      }

    const data = await response.json ();
    return dispacth (sucessfetchNotificationReceived (data));
  } catch (error) {
    return dispacth (errorfetchNotificationReceived (error.message));
  }
};

export const getNotificationSent= (token, userId) => async dispacth => {
    try {
        startfetchNotificationSent();
      const response = await fetch ('https://msnbr.herokuapp.com/user/Notifications/Sent', {
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
           return dispacth (  errorfetchNotificationSent("user not allowed" + response.status));
          
        }
  
      const data = await response.json ();
      return dispacth ( sucessfetchNotificationSent(data));
    } catch (error) {
      return dispacth (errorfetchNotificationSent (error.message));
    }
  };
export default slice.reducer;
