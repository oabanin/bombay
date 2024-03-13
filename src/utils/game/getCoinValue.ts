import numeral from 'numeral';

export const getCoinValue = (value: number) => {
  if (value >= 99000) {
    return '99k+';
  } else if (value >= 1000) {
    return numeral(value).format('0.0a', Math.floor);
  } else {
    return value.toString();
  }
};
