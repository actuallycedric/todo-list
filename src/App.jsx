import { useState } from "react";
import "./styles.css";

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
  return (
    <div className="super">
      <Header />

      <AddNewTask />

      <FilterTask />

      <TaskList />

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>To-do List</h1>
    </div>
  );
}

function AddNewTask() {
  return (
    <>
      <button className="toggle">Add Item</button>
      <div className="contact">
        <form>
          <input type="text" placeholder="Event name" />
          <select>
            <option value="">Reminder type:</option>
            <option value="comment">Action</option>
            <option value="question">Event</option>
          </select>

          <input type="text" placeholder="Event time" />

          <button>Add</button>
        </form>
      </div>
    </>
  );
}

function FilterTask() {
  return (
    <div>
      <button className="filterAction">Action</button>
      <button className="filterEvent  ">Event</button>
    </div>
  );
}

function TaskList() {
  return <div className="list">{taskList.map((task) => mapTask(task))}</div>;
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

const mapTask = (task) => (
  <>
    <div className="reminder">
      <p>{task.text}</p>{" "}
      <div className="buttons">
        <button
          className="typeIndicator"
          style={{
            backgroundImage: colors.find((color) => color.type === task.type)
              .color,
          }}
        >
          {task.type}
        </button>
        <button>Mark Done</button> <button>Delete</button>
      </div>
    </div>
  </>
);

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

let taskList = await loadTask();

export default App;
