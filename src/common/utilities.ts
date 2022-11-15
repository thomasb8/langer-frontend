export function debounce(cb: (...args: any[]) => unknown, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: any[]) {
    if(timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }
    const context = this; // get the current context
    timer = setTimeout(()=>{
      cb.apply(context, args); // call the function if time expires
    }, delay);
  }
}
