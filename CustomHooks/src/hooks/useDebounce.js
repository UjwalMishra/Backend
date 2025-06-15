import { useRef } from "react";

export const useDebounce = (expensiveFxn) => {
  const currClock = useRef;

  function debounce() {
    clearTimeout(currClock.current);
    currClock.current = setTimeout(expensiveFxn, 200);
  }
  return debounce;
};
