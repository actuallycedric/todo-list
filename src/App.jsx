import { useState, useEffect } from "react";
import "./styles.css";
import AddTaskGui from "./AddTaskGui";
import supabase from "./supabase";
import dayjs from "dayjs";

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
    <div className='header card'>
      <h1>To-do List</h1>
    </div>
  );
}

function AddNewTask({ setTasks, taskList }) {
  const [showForm, setShowForm] = useState(false);

  const btnText = (clicked) => (clicked === false ? "New Text" : "Close");

  return (
    <>
      <button
        className='toggle stylebutton'
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

    if (!error) setTasks(taskList);
  }

  const [countdown, setCountdown] = useState(taskObj.countdown);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='reminder card'>
      <p>{taskObj.text}</p>{" "}
      <div className='buttons card'>
        <button
          className='typeIndicator stylebutton'
          style={{
            backgroundImage: colors.find((color) => color.type === taskObj.type)
              ?.color,
          }}
        >
          {taskObj.type}
        </button>
        <button className='stylebutton' onClick={handleDelete}>
          Mark Done
        </button>
        <button className='stylebutton'>{Math.round(countdown/60)}h {Math.round(countdown%60)}m left</button>
      </div>
    </div>
  );
}

function FilterTask({ taskList, setCategoryClicked }) {
  const [isSelected, setIsSelected] = useState(null);

  const buttons = ["Action", "Event", "All"];

  return (
    <div className='stack card'>
      <p>There are {taskList.length} tasks remaining</p>
      <button
        className='filterAction stylebutton'
        style={
          isSelected === buttons.indexOf("Action")
            ? { border: "1px solid white" }
            : {}
        }
        onClick={(e) => {
          setCategoryClicked("Action");
          setIsSelected(buttons.indexOf("Action"));
        }}
      >
        Action
      </button>

      <button
        className='filterEvent stylebutton'
        style={
          isSelected === buttons.indexOf("Event")
            ? { border: "1px solid white" }
            : {}
        }
        onClick={(e) => {
          setCategoryClicked("Event");
          setIsSelected(buttons.indexOf("Event"));
        }}
      >
        Event
      </button>

      <button
        className='filterEvent stylebutton'
        style={
          isSelected === buttons.indexOf("All")
            ? { border: "1px solid white" }
            : {}
        }
        onClick={(e) => {
          setCategoryClicked("All");
          setIsSelected(buttons.indexOf("All"));
        }}
      >
        All
      </button>
    </div>
  );
}

function Buffer() {
  return (
    <div className='buffer card'>
      <p>Loading...</p>
    </div>
  );
}

function TaskList({ taskList, isBuffering, setTasks }) {
  return (
    <>
      <div className='list card'>
        {isBuffering ? (
          <Buffer key={Math.random() * 1000} />
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
      <div className='stack card'>
        <img src='./images/React-icon.svg' alt='react logo' />
        <img src='./images/supabase-icon.svg' alt='supabase logo' />
        <img src='./images/javascript-logo-svgrepo-com.svg' alt='js logo' />
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
