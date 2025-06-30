const listContainer = document.querySelector("#list-container");

let tasks = [];

const taskForm = document.querySelector("#task-form");
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData.get("task-input");
  const userInput = formData.get("task-input");

  if (!userInput) {
    return alert("Input cannot be empty.");
  }
  /* Pushe tasks */
  taskForm.push({
    timestamp: new Date(),
    description: userInput,
    completed: false,
  });
  renderPage();
});

const builldPage = (tasksArr) => {
  listContainer.replaceChildren();
  tasksArr.forEach((task) => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const timestampElement = document.createElement("p");
    timestampElement.classList.add("datetime");
    timestampElement.textContent = task.timestamp;

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("description");
    descriptionElement.textContent = task.description;

    taskContainer.append(timestampElement, descriptionElement);
    listContainer.prepend(taskContainer);
  });
};
const renderPage = () => {
  builldPage(tasks);
};
