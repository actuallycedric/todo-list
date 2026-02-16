let addItem = document.querySelector(".contact");
addItem.classList.add("hidden");

let tasks = [
  {
    text: "Do homework",
    type: "Action",
    time: "Now",
  },
  {
    text: "Job interview",
    type: "Event",
    time: "March 1, 2026",
  },
  {
    text: "Go to birthday party",
    type: "Event",
    time: "Tomorrow",
  },
];




document.querySelector(".toggle").addEventListener("click", () => {
  addItem.classList.toggle("hidden");

  if (!addItem.classList.contains("hidden"))
    document.querySelector(".toggle").textContent = "Close";
  else document.querySelector(".toggle").textContent = "Add Item";
});

const mapTask = (task) => (
     `<p>${task.text}</p> <div class="buttons">
            <button class="typeIndicator">${task.type}</button>
            <button>Mark Done</button> <button>Delete</button>
          </div>`
);

tasks = tasks.map(task => mapTask(task));



tasks.forEach((task) => {
    let cont = document.createElement("div");

    cont.classList.add("reminder");

    cont.innerHTML = task;
    document.querySelector(".list").appendChild(cont);
});