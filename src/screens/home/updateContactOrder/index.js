export  function UpdateOrderContacts(messages,upDateContacts,setUpdateContacts,setUserWhosentMessage,userWhosentMessage){
    if (messages.length && upDateContacts.length) {
        const last = messages[messages.length - 1];
        let discoverContactsIndex = upDateContacts.find((el, index) => {
          if (el.email === last.email) {
            if (index > 0) {
              setUpdateContacts(() => {
                let copy = JSON.parse(JSON.stringify(upDateContacts));
                copy.splice(0, 0, copy.splice(index, 1)[0]);
                return copy;
              });
            }
          }
  
          return el.email === last.email;
        });
        if (discoverContactsIndex !== undefined) {
          setUserWhosentMessage([...userWhosentMessage, discoverContactsIndex]);
        }
      }
 }