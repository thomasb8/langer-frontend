let timer: ReturnType<typeof setTimeout>;
export function debounce<T>(cb: T, delay: number) {
  return function(...args: any[]) {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() =>{
      if (typeof cb === 'function') {
        cb(args);
      }
    }, delay);
  }
}
