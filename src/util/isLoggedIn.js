export const isLoggedIn = () => {
  if (localStorage.getItem('diary_token') !== null) {
    return true;
  }
  return false;
};
