const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

let tasks = [];

// Load tasks from local storage
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  displayTasks();
}

// Add task to the list
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task !== "") {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    taskInput.value = "";
  }
});

// Mark task as complete
taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const task = e.target.parentNode.querySelector("span").textContent;
    if (e.target.classList.contains("complete")) {
      tasks = tasks.filter((t) => t !== task);
    } else if (e.target.classList.contains("edit")) {
      taskInput.value = task;
      tasks = tasks.filter((t) => t !== task);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  }
});

// Display tasks in the list
function displayTasks() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = tasks[i];
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.classList.add("complete");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    li.appendChild(span);
    li.appendChild(completeButton);
    li.appendChild(editButton);
    taskList.appendChild(li);
  }
}
