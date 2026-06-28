// Filter.jsx
import { useContext } from "react";
import { TaskContext } from "./App";

function Filter() {
  const { filter, dispatch } = useContext(TaskContext);

  const filters = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
    { label: "High", value: "high" },
  ];

  return (
    <div className="filter-wrapper">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${filter === f.value ? "active" : ""}`}
          onClick={() => dispatch({ type: "setFilter", filter: f.value })}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
