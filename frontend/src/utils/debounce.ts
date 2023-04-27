type DebounceFn<T extends (...args: any[]) => any> = (
  fn: T,
  delay: number
) => (...args: Parameters<T>) => void;

let timerId: ReturnType<typeof setTimeout>;
const debounce: DebounceFn<(...args: any[]) => any> = (fn, delay) => {
  return (...args: Parameters<typeof fn>) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default debounce;
