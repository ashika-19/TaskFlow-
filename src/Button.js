import { useContext } from "react";
import { TaskContext } from "./App";

function Button() {
  const { dispatch } = useContext(TaskContext);

  return (
    <button
      className="btns back-btn"
      onClick={() => dispatch({ type: "back" })}
    >
      Back
    </button>
  );
}

export default Button;
