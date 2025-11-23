export const checkEmail = (email) => {
  const regex = /^[a-zA-Z-_]+@[a-zA-Z-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};
