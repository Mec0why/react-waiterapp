export const capFirstLetter = (str) => {
  const capStr = str.charAt(0).toUpperCase() + str.slice(1);

  return capStr;
};
