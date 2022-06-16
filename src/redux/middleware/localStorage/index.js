export const localStorage = store => next => action => {
  const response = next (action);

  if (response.meta && response.meta.localStorage) {
    const {meta} = response;
    window.localStorage.setItem (
      meta.localStorage.key,
      JSON.stringify (meta.localStorage.value)
    );

     console.log("key" +  meta.userId.key)
    window.localStorage.setItem (
      meta.userId.key,
      JSON.stringify (meta.userId.value)
    );
  }

  return response;
};
