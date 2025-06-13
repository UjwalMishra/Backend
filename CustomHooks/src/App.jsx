import { useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { usePrev } from "./hooks/usePrev";

//custom hook
// function useCounter() {
//   const [count, setCount] = useState(1);
//   function incrementVal() {
//     setCount((c) => c + 1);
//   }
//   return {
//     count,
//     incrementVal,
//   };
// }

function App() {
  // const [post, setPost] = useState(1);
  // const { count, incrementVal } = useCounter();

  //-----------useFetch----------------
  // const { data, loading } = useFetch(
  //   `https://jsonplaceholder.typicode.com/posts/${count}`,
  //   0
  // );

  //------------usePrev------------------
  const [val, setVal] = useState(0);
  const prev = usePrev(val);
  return (
    <>
      <div>
        {/* <button onClick={incrementVal}>Increment</button>
        <div>{count}</div>
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div>
            Data :<div>{JSON.stringify(data)}</div>
          </div>
        )} */}
        <p>{val}</p>
        <button
          onClick={() => {
            setVal((v) => v + 1);
          }}
        >
          click me!
        </button>
        <p>Previous value was {prev}</p>
      </div>
    </>
  );
}

export default App;
