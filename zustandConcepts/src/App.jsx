import "./App.css";
import useCount from "./store/atoms/Count";
function App() {
  return (
    <>
      <Count />
    </>
  );
}

function Count() {
  return (
    <div>
      <ValueRender></ValueRender>
      <ButtonRender></ButtonRender>
    </div>
  );
}

function ValueRender() {
  const { count } = useCount();
  return <div>{count}</div>;
}

function ButtonRender() {
  const { increment, decrement } = useCount();

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
export default App;
