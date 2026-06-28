import { useContext } from "react";
import Button from "./Button";
import { TaskContext } from "./App";

function TaskList() {
  const { tasks, dispatch, status } = useContext(TaskContext);

  return (
    <div>
      <section className="task-list">
        {tasks.length === 0 ? (
          <h3>No task to be displayed</h3>
        ) : (
          <>
            <h3>All Tasks</h3>
            <div className="tasks">
              {tasks.map((task) => {
                return (
                  <div className="task" key={task.id}>
                    <div className="task-header">{task.title}</div>
                    <div className="task-meta">
                      <div className="task-priority">
                        Priority: {task.priority}
                      </div>
                      <div className="task-category">
                        Category: {task.category}
                      </div>
                      <div className="task-due">Due: {task.due}</div>
                    </div>
                    <div className="task-actions">
                      <button
                        className={`btns ${task.status ? "completed" : ""}`}
                        onClick={() => {
                          dispatch({ type: "handlecomplete", id: task.id });
                        }}
                      >
                        {!task.status ? "Complete" : "Completed"}
                      </button>
                      <button
                        className="btns"
                        onClick={() =>
                          dispatch({
                            type: "handleedit",
                            tasks: task,
                            btnName: "Edit",
                            id: task.id,
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btns"
                        onClick={() =>
                          dispatch({ type: "handledelete", taskid: task.id })
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default TaskList;
