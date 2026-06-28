import { useContext } from "react";
import { TaskContext } from "./App";

function EditBtn() {
  const { dispatch } = useContext(TaskContext);
  return (
    <>
      <button className="btn">Edit </button>
      <button
        className="btn save-btn"
        onClick={() => dispatch({ type: "saveTask" })}
      >
        Save
      </button>
    </>
  );
}

export default EditBtn;
