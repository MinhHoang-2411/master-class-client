const convertStringToLowerCase = (str: string) => {
  const newStr = str.replace(/[^a-zA-Z0-9 ]/g, ''); // Remove Special Characters
  return newStr.replace(/\s+/g, '-').toLowerCase();
};

export { convertStringToLowerCase };
