export function getLocalStorage (key, initial) {
  try {
    const item = JSON.parse (window.localStorage.getItem (key));

    return item;
  } catch (error) {
    return initial;
  }
}
