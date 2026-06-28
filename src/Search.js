import { useContext } from "react";
import { TaskContext } from "./App";

function Search() {
  const { search, dispatch } = useContext(TaskContext);
  return (
    <div className="controls-wrapper">
      <section className="search-sec">
        <input
          placeholder="search task..."
          value={search}
          onChange={(e) => {
            dispatch({ type: "updateQuery", query: e.target.value });
          }}
        ></input>

        <button className="btn" onClick={() => dispatch({ type: "search" })}>
          <label>Search</label>
        </button>
      </section>
    </div>
  );
}

export default Search;
