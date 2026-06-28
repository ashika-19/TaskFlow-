import { createContext, useReducer, useEffect } from "react";
import AddBtn from "./AddBtn";
import Header from "./Header";
import Search from "./Search";
import TaskList from "./TaskList";
import Button from "./Button";
import Filter from "./Filter";
import { loadTasks, saveTasks } from "./LocalStorage";
export const TaskContext = createContext();
const initialState = {
  addScreen: false,
  tasks: [],
  form: {
    title: "",
    description: "",
    priority: "High",
    due: "",
    category: "",
    status: false,
  },
  BtnType: "Add Task",
  EditBtn: false,
  search: "",
  backbtn: false,
  filteredQuery: null,
  filter: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "toggle-add-btn":
      return {
        ...state,
        addScreen: !state.addScreen,
      };
    case "add-task":
      return {
        ...state,
        tasks: [
          {
            id: crypto.randomUUID(),
            title: state.form.title,
            description: state.form.description,
            priority: state.form.priority,
            due: state.form.due,
            category: state.form.category,
          },
          ...state.tasks,
        ],
        form: initialState.form,
        addScreen: false,
      };

    case "update-form":
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    case "handledelete":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.taskid),
      };
    case "handlecomplete":
      // console.log(state.tasks);
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, status: !task.status } : task,
        ),
      };
    case "handleedit":
      return {
        ...state,
        addScreen: true,
        form: action.tasks,
        BtnType: "Edit Task",
        filteredQuery: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, [action.field]: action.value } // Correctly updates the field on the task
            : task,
        ),
      };
    case "saveTask":
      const isEditing = state.tasks.some((task) => task.id === state.form.id);
      return {
        ...state,
        addScreen: false, // Close the modal/form screen
        tasks: isEditing
          ? state.tasks.map((task) =>
              task.id === state.form.id ? { ...state.form } : task,
            ) // If editing, replace the old task with the updated form data
          : [...state.tasks, { ...state.form, id: Date.now() }], // If new, append it with a unique ID
        form: initialState.form,
      };
    case "search":
      return {
        ...state,
        filteredQuery: state.tasks
          .slice()
          .filter((task) => task.title.includes(state.search)),
        search: "",
        backbtn: true,
      };
    case "updateQuery":
      return {
        ...state,
        search: action.query,
      };
    case "setFilter":
      if (action.filter === "completed") {
        return {
          ...state,
          filter: "completed",
          filteredQuery: state.tasks.slice().filter((task) => task.status),
        };
      } else if (action.filter === "pending") {
        return {
          ...state,
          filter: "pending",
          filteredQuery: state.tasks.slice().filter((task) => !task.status),
        };
      } else if (action.filter === "high") {
        return {
          ...state,
          filter: "high",
          filteredQuery: state.tasks
            .slice()
            .filter((task) => task.priority === "High"),
        };
      } else {
        return { ...state, filter: "all", filteredQuery: null };
      }

    case "back":
      return {
        ...state,
        filteredQuery: null,
        backbtn: false,
      };
    default:
      return state;
  }
}
function getInitialState() {
  return {
    ...initialState,
    tasks: loadTasks(initialState.tasks),
  };
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState, getInitialState);
  useEffect(() => {
    saveTasks(state.tasks);
  }, [state.tasks]);
  const {
    addScreen,
    tasks,
    form,
    BtnType,
    search,
    backbtn,
    filteredQuery,
    filter,
  } = state;
  const { title, description, priority, due, category, status } = form;

  const displayedTasks = filteredQuery ?? tasks;
  return (
    <TaskContext.Provider
      value={{
        dispatch,
        addScreen,
        title,
        description,
        priority,
        due,
        category,
        tasks: displayedTasks,
        status,
        BtnType,
        search,
        filter,
      }}
    >
      <div>
        <Header />
        <Search />
        <Filter />
        <AddBtn />
        <TaskList />

        {(search !== "" || backbtn) && <Button />}
      </div>
    </TaskContext.Provider>
  );
}

export default App;
