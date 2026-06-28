import { useContext } from "react";
import { TaskContext } from "./App";

function Header() {
  const { tasks } = useContext(TaskContext);
  let count = 0,
    highPriority = 0;
  const completed = tasks.map((task) => {
    if (task.status) {
      count++;
    }
    if (task.priority === "High") {
      highPriority++;
    }
  });

  return (
    <>
      {" "}
      <div className="header">Task Flow - Smart task manager</div>
      <div class="stats-wrapper">
        <div class="stat-card total">
          <span class="stat-number">{tasks.length}</span>
          <span class="stat-label">Total</span>
        </div>

        <div class="stat-card completed">
          <span class="stat-number">{count}</span>
          <span class="stat-label">Completed</span>
        </div>

        <div class="stat-card pending">
          <span class="stat-number">{tasks.length - count}</span>
          <span class="stat-label">Pending</span>
        </div>

        <div class="stat-card high">
          <span class="stat-number">{highPriority}</span>
          <span class="stat-label">High Priority</span>
        </div>
      </div>
    </>
  );
}

export default Header;
