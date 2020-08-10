
export function throttle(func: any, wait: number, options: any = {}): any {
  let args;
  let result;
  let timeout: any = null;
  let previous = 0;

  function later(): void {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    result = func.apply(null, args);
  }

  return (...data: any[]): any => {
    const now = +new Date();

    if (!previous && options.leading === false) {
      previous = now;
    }

    const remaining = wait - (now - previous);
    args = data;

    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(null, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}

export function getRandomFromRange(min, max): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function interpolate(val: number): number {
  let newValue = val;

  /* tslint:disable-next-line no-conditional-assignment */
  if ((newValue *= 2) < 1) {
    return 0.5 * newValue * newValue;
  }
  return - 0.5 * (--newValue * (newValue - 2) - 1);
}