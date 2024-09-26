export const extractNumber = (str) => {
  const match = str.match(/[\d.]+/g);
  return match ? match[0] : null;
};
