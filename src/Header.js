import { useContext } from "react";
import { TaskContext } from "./App";

function Header() {
  const { tasks } = useContext(TaskContext);
  let count = 0,
    highPriority = 0;
  tasks.forEach((task) => {
    if (task.status) count++;

    if (task.priority === "High") highPriority++;
  });

  return (
    <>
      {" "}
      <div className="header">Task Flow - Smart task manager</div>
      <div className="stats-wrapper">
        <div className="stat-card total">
          <span className="stat-number">{tasks.length}</span>
          <span className="stat-label">Total</span>
        </div>

        <div className="stat-card completed">
          <span className="stat-number">{count}</span>
          <span className="stat-label">Completed</span>
        </div>

        <div className="stat-card pending">
          <span className="stat-number">{tasks.length - count}</span>
          <span className="stat-label">Pending</span>
        </div>

        <div className="stat-card high">
          <span className="stat-number">{highPriority}</span>
          <span className="stat-label">High Priority</span>
        </div>
      </div>
    </>
  );
}

export default Header;
