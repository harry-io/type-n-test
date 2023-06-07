export const getLsData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export const setLsData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const removeLsData = (key) => {
  localStorage.removeItem(key);
};
export const removeAllLs = () => {
  localStorage.clear();
};
