import { createSlice } from "@reduxjs/toolkit";

 const slice = createSlice({
    name:"socket",
    initialState:{
        loading:false, 
        error:null, 
        data:{
            messages:[], 
            
        }
    }, 
    reducers:{
         startSocket(state){
             state.loading= true

         },
         sucessSocket(state){
            state.loading= false
           
             

         },
         ErrorSocket(state){
            state.loading=false
            
         }  

    }
 })
 const {startSocket,sucessSocket,ErrorSocket} = slice.actions


   export const OpenConnnectionNGetMessage=(io,userId,token)=>(dispatch)=>{
     try {
        dispatch(startSocket())
        const socketIo = io("http://localhost:4444", {
            auth: {
              token,
              userId,
            },
          });
      socketIo.on("connect", () => {
           console.log("essa merda abriu")
           dispatch(sucessSocket())
      })


     } catch (error) {
        dispatch(ErrorSocket())
         console.log("deu erro")
        
     }

 }



 export default slice.reducer

 /*

export function connectSocket(
  io,
  setSocket,
  user,
  token,
  UserContacts,
  setMessages,
  messages,
  setTyping,
  setMessage,
  setNewUserOnline
) {
  if (!Array.isArray(UserContacts) || !UserContacts.length) {
    console.log("loading");
  } else {
    setSocket(() => {
      const userId = user.data._id;
      const authToken = token.data.token;
      const socketIo = io("http://localhost:4444", {
        auth: {
          token: authToken,
          userId: userId,
        },
      });
      socketIo.on("connect", () => {
        console.log("socket is ready");
      });

      const Contacts = UserContacts.map((element) => element.email);

      socketIo.emit(
        "enroll",
        {
          id: user.data._id,
          email: user.data.email,
          token: authToken,
          contacts: Contacts,
        },
        () => {}
      );

      socketIo.on("messageReceivedOffline", (data, callback) => {
        // window.localStorage.setItem("messages",JSON.stringify([...messages, ...data]))
      
       
       
          setMessages([...messages, ...data]);
     

        callback();
      });

      socketIo.on("typing" + user.data.email, (params) => {
        setTyping(params.params);
      });
      socketIo.on(user.data.email, (response) => {
        if (response) {
          setMessage(response);
          if (response.type === "message") {
            console.log("I can")
          }
        }
      });

      socketIo.on("userIsOnline:" + user.data.email, (params) => {
        setNewUserOnline(params);
      });

    socketIo.on("notification"+user.data.email,(params)=>{

       console.log('NOTIFICATION HAS ARRIVED' + params)

    })



      return socketIo;
    });
  }
}






 */