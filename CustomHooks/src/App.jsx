import { useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { usePrev } from "./hooks/usePrev";
import { useDebounce } from "./hooks/useDebounce";

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
  // const [val, setVal] = useState(0);
  // const prev = usePrev(val);

  //
  // return (
  //   <>
  //------------------useFetch-------------------------
  //     <div>
  //       {/* <button onClick={incrementVal}>Increment</button>
  //       <div>{count}</div>
  //       {loading ? (
  //         <div>Loading....</div>
  //       ) : (
  //         <div>
  //           Data :<div>{JSON.stringify(data)}</div>
  //         </div>
  //       )} */}

  //-----------usePrev----------------
  //       <p>{val}</p>
  //       <button
  //         onClick={() => {
  //           setVal((v) => v + 1);
  //         }}
  //       >
  //         click me!
  //       </button>
  //       <p>Previous value was {prev}</p>
  //     </div>
  //   </>
  // );
  const expensiveOperation = () => {
    console.log("Expensive operation" + i);
  };
  const debounce = useDebounce(expensiveOperation);

  return (
    <div>
      <p>Enter val : </p>
      <input type="text" onChange={debounce} />
    </div>
  );
}

export default App;
