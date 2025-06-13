import { useEffect, useRef } from "react";

export const usePrev = (value) => {
  //this runs 1st
  const ref = useRef();

  useEffect(() => {
    //at last the value get updated : 3rd step
    ref.current = value;
  }, [value]);

  //then value get returned 2nd
  return ref.current;
};
