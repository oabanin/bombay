export const getCoinValue = (value: number) => {
  if (value >= 99000) {
    return '99k+';
  } else if (value >= 1000) {
    const thousands = (value / 1000).toFixed(1);
    const suffix = 'k';
    return `${thousands}${suffix}`;
  } else {
    return value.toString();
  }
};
