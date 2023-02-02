function setLocalStorage (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage (key) {
  let value = localStorage.getItem(key);
  value = value && JSON.parse(value);
  return value;
}

export default {
  set: setLocalStorage,
  get: getLocalStorage,
};
