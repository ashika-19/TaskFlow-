import { useContext } from "react";
import { TaskContext } from "./App";
import AddTask from "./AddTask";
function AddBtn() {
  const { addScreen, dispatch } = useContext(TaskContext);

  return (
    <div>
      <section className="add-section">
        <button
          className="add-task-btn"
          onClick={() => dispatch({ type: "toggle-add-btn" })}
        >
          ➕ Add
        </button>
        {addScreen && <AddTask />}
      </section>
    </div>
  );
}

export default AddBtn;
