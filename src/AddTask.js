import { useContext } from "react";
import { TaskContext } from "./App";

import EditBtn from "./EditBtn";
function AddTask() {
  const { title, description, priority, due, category, dispatch, BtnType } =
    useContext(TaskContext);
  return (
    <div className="add-task-container">
      <label className="add-title">Title</label>
      <input
        value={title}
        onChange={(e) => {
          dispatch({
            type: "update-form",
            field: "title",
            value: e.target.value,
          });
        }}
      ></input>
      <label className="add-des">Description</label>
      <input
        value={description}
        onChange={(e) => {
          dispatch({
            type: "update-form",
            field: "description",
            value: e.target.value,
          });
        }}
      ></input>
      <select
        className="add-priority"
        value={priority}
        onChange={(e) => {
          dispatch({
            type: "update-form",
            field: "priority",
            value: e.target.value,
          });
        }}
      >
        <option value="High">High</option>
        <option value="Medium">medium</option>
        <option value="Low">Low</option>
      </select>
      <label className="add-category">Category</label>
      <input
        value={category}
        onChange={(e) => {
          dispatch({
            type: "update-form",
            field: "category",
            value: e.target.value,
          });
        }}
      ></input>
      <label className="add-due">Due</label>
      <input
        type="date"
        value={due}
        onChange={(e) => {
          dispatch({
            type: "update-form",
            field: "due",
            value: e.target.value,
          });
        }}
      ></input>
      {BtnType === "Add Task" ? (
        <button
          className="btn"
          onClick={() => {
            if (
              title === "" ||
              description === "" ||
              category === "" ||
              due === ""
            ) {
              window.alert("Fill all the input fields");
            } else {
              dispatch({ type: "add-task" });
            }
          }}
        >
          Add Task
        </button>
      ) : (
        <EditBtn />
      )}
    </div>
  );
}

export default AddTask;
