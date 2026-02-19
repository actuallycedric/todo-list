import { useState, useEffect } from "react";
import "./styles.css";
import supabase from "./supabase";

const colors = [
  {
    type: "Action",
    color: "linear-gradient(to right, #0a9396, #005f73)",
  },
  {
    type: "Event",
    color: "linear-gradient(to right, #bb3e03, #9b2226)",
  },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [isBuffering, setIsBuffering] = useState(false);
  const [categoryClicked, setCategoryClicked] = useState("All");

  useEffect(
    function () {
      async function fetchTasks() {
        setIsBuffering(true);

        let query = supabase.from("list").select("").eq("is_deleted", false);

        if (categoryClicked !== "All") {
          query = query.eq("type", categoryClicked);
        } else {
          query = supabase.from("list").select("").eq("is_deleted", false);
        }

        const { data: tasks, error } = await query.limit(100);

        setTasks(tasks);

        setIsBuffering(false);
      }

      fetchTasks();
    },
    [categoryClicked],
  );

  return (
    <>
      <Header />

      <AddNewTask taskList={tasks} setTasks={setTasks} />

      <FilterTask
        taskList={tasks}
        categoryClicked={categoryClicked}
        setCategoryClicked={setCategoryClicked}
      />

      <TaskList
        taskList={tasks}
        isBuffering={isBuffering}
        setTasks={setTasks}
      />

      <Footer />
    </>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>To-do List</h1>
    </div>
  );
}

function AddTaskGui({ setTasks, taskList, showForm, setShowForm }) {
  const [str, setStr] = useState("");
  const [cat, setCat] = useState("");
  const [time, setTime] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e) {
    let task;
    // prevent browser reload
    e.preventDefault();

    // check if data is valid => create new fact obj

    if (str && cat && time && str.length <= 200) {
      // add fact to ui
      setIsUploading(true);
      const { data: task, error } = await supabase
        .from("list")
        .insert([{ text: str, type: cat, time, is_deleted: false }])
        .select();

      if (!error) setTasks((taskList) => [task[0], ...taskList]);

      setIsUploading(false);

      // reset inputs
      setStr("");
      setCat("");
      setTime("");

      // close form
      setShowForm(!showForm);
    }
  }

  return (
    <>
      <div className="contact">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event name"
            value={str}
            onChange={(e) => setStr(e.target.value)}
          />
          <span style={{ fontSize: "14px" }}> {200 - str.length}</span>

          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">Reminder type:</option>
            <option value="Action">Action</option>
            <option value="Event">Event</option>
          </select>

          <input
            type="text"
            placeholder="Event time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button type="submit" disabled={isUploading}>
            Add
          </button>
        </form>
      </div>
    </>
  );
}

function AddNewTask({ setTasks, taskList }) {
  const [showForm, setShowForm] = useState(false);

  const btnText = (clicked) => (clicked === false ? "New Text" : "Close");

  return (
    <>
      <button
        className="toggle"
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        {btnText(showForm)}
      </button>
      {!showForm ? null : (
        <AddTaskGui
          setTasks={setTasks}
          taskList={taskList}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
    </>
  );
}

function mapTask(task, setTasks, taskList) {
  if (!task.is_deleted) {
    return (
      <>
        <Task
          taskList={taskList}
          setTasks={setTasks}
          key={task.id}
          taskObj={task}
        />
      </>
    );
  }
}

function Task({ taskObj, setTasks, taskList }) {
  async function handleDelete() {
    taskList = taskList.filter((task) => task.id !== taskObj.id);

    const { error } = await supabase
      .from("list")
      .update({ is_deleted: true })
      .eq("id", taskObj.id)
      .select();
    setTasks(taskList);
  }

  return (
    <div className="reminder">
      <p>{taskObj.text}</p>{" "}
      <div className="buttons">
        <button
          className="typeIndicator"
          style={{
            backgroundImage: colors.find((color) => color.type === taskObj.type)
              ?.color,
          }}
        >
          {taskObj.type}
        </button>
        <button onClick={handleDelete}>Mark Done</button>
      </div>
    </div>
  );
}

function FilterTask({ taskList, setCategoryClicked }) {
  return (
    <div className="stack">
      <p>There are {taskList.length} tasks remaining</p>
      <button
        className="filterAction"
        onClick={(e) => setCategoryClicked(e.target.innerHTML)}
      >
        Action
      </button>

      <button
        className="filterEvent"
        onClick={(e) => setCategoryClicked(e.target.innerHTML)}
      >
        Event
      </button>

      <button
        className="filterEvent"
        onClick={(e) => {
          setCategoryClicked(e.target.innerHTML);
        }}
      >
        All
      </button>
    </div>
  );
}

function Buffer() {
  return (
    <div className="buffer">
      <p>Loading...</p>
    </div>
  );
}

function TaskList({ taskList, isBuffering, setTasks }) {
  return (
    <>
      <div className="list">
        {isBuffering ? (
          <Buffer />
        ) : (
          taskList.map((task) => mapTask(task, setTasks, taskList))
        )}
      </div>
    </>
  );
}

function Footer() {
  return (
    <>
      <div className="stack">
        <img src="./images/React-icon.svg" alt="react logo" />
        <img src="./images/supabase-icon.svg" alt="supabase logo" />
        <img src="./images/javascript-logo-svgrepo-com.svg" alt="js logo" />
      </div>

      <p>Clarence Cesante - 2026</p>
    </>
  );
}

async function loadTask() {
  const res = await fetch(
    "https://loowuxdjunblogsydoyv.supabase.co/rest/v1/list",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvb3d1eGRqdW5ibG9nc3lkb3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTk2NzIsImV4cCI6MjA4NjgzNTY3Mn0.QP8L01HiOOD-JTRanrrtcOssNYnaQ3z0CYz-OOBl540",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvb3d1eGRqdW5ibG9nc3lkb3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTk2NzIsImV4cCI6MjA4NjgzNTY3Mn0.QP8L01HiOOD-JTRanrrtcOssNYnaQ3z0CYz-OOBl540",
      },
    },
  );

  // fetches the data from the Supabase db (async function waits for fetch to get data)

  let data = await res.json(); // converts response to json

  return data;
}

export default App;
