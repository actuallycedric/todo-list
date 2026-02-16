let addItem = document.querySelector(".contact");
addItem.classList.add("hidden");

document.querySelector(".toggle").addEventListener("click", () => {
  addItem.classList.toggle("hidden");

  if (!addItem.classList.contains("hidden"))
    document.querySelector(".toggle").textContent = "Close";
  else document.querySelector(".toggle").textContent = "Add Item";
});

const mapTask = (task) =>
  `<p>${task.text}</p> <div class="buttons">
            <button class="typeIndicator">${task.type}</button>
            <button>Mark Done</button> <button>Delete</button>
          </div>`;

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
  console.log(data);

  data = data.map((task) => mapTask(task));

  data.forEach((task) => {
    let cont = document.createElement("div");

    cont.classList.add("reminder");

    cont.innerHTML = task;
    document.querySelector(".list").appendChild(cont);
  });
}

loadTask();
