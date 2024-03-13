export const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
