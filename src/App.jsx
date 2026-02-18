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

  useEffect(function () {
    async function fetchTasks(){
      const { data: list, error } = await supabase.from("list").select("*");
      setTasks(list);
    }

    fetchTasks();
  }, []);

  return (
    <>
      <Header />

      <AddNewTask />

      <FilterTask />

      <TaskList />

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

function AddTaskGui() {
  const [str, setStr] = useState("");
  const [cat, setCat] = useState("");
  const [time, setTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(str, cat, time);
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
          <span style={{ fontSize: "14px" }}>{200 - str.length}</span>

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

          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
}

function AddNewTask() {
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
      {!showForm ? null : <AddTaskGui />}
    </>
  );
}


function FilterTask() {
  return (
    <div className="stack">
      <button className="filterAction">Action</button>
      <button className="filterEvent  ">Event</button>

    </div>
  );
}

// function TaskList() {
//   return (
//     <>
//       <div className="list">{taskList.map((task) => mapTask(task))}</div>
//     </>
//   );
// }



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

const mapTask = (task) => <Task key={task.id} taskObj={task} />;

function Task({ taskObj }) {
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
        <button>Mark Done</button> <button>Delete</button>
      </div>
    </div>
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
