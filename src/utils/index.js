export const debounce = (fn, delay) => {
  let timer;
  return function() {
    let args = arguments,
      context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

export const throttle = (fn, limit) => {
  let flag = true;
  return function() {
    let args = arguments,
      context = this;
    if (flag) {
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
};

export const diffYears = (dt1, dt2) => {
  let diff =
    (dt2
      ? new Date(dt2).getTime()
      : new Date().getTime() - new Date(dt1).getTime()) / 1000;
  diff /= 60 * 60 * 24;
  return Math.abs(Math.round(diff / 365.25));
};
