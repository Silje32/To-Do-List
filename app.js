const listContainer = document.querySelector("#list-container");
const toggleShowCompleted = document.querySelector("#show-completed");
const sortBy = document.querySelector("#sort-by");

let tasks = [];
let filters = { showCompleted: false, sortType: "time-desc" };

// Local Storage
const saveTasksToStorage = () =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

// Sort a todo
sortBy.addEventListener("change", (e) => {
  filters.sortType = e.target.value;
  renderPage();
});

toggleShowCompleted.addEventListener("change", (e) => {
  // filters.showCompleted = !filters.showCompleted
  filters.showCompleted = e.target.checked;
  renderPage();
});

// Make a todo
const taskForm = document.querySelector("#task-form");
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(taskForm);
  const userInput = formData.get("task-input");

  if (!userInput) {
    return alert("Input cannot be empty.");
  }
  /* Pushe tasks */
  tasks.push({
    timestamp: new Date(),
    description: userInput,
    completed: false,
  });
  saveTasksToStorage();
  renderPage();
});

const completeTaskInput = (task) => {
  const inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.checked = task.completed;

  inputElement.addEventListener("change", (e) => {
    task.completed = e.target.checked;
    saveTasksToStorage();
    renderPage();
  });

  return inputElement;
};

// Edit a todo
const editTaskButton = (task, descriptionElement) => {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("edit-button");
  buttonElement.textContent = "Edit";

  buttonElement.addEventListener("click", (e) => {
    task.description = descriptionElement.value;
    descriptionElement.readOnly = !descriptionElement.readOnly;
    buttonElement.textContent = descriptionElement.readOnly ? "Edit" : "Save";
    saveTasksToStorage();
  });

  return buttonElement; // Hva returnerer jeg? Og hvorfor?
  /* 
     Returner knappen slik at du kan bruke den.
  */
};

// Delete a todo
const deleteTaskButton = (task) => {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("delete-button");
  buttonElement.textContent = "Delete";

  buttonElement.addEventListener("click", (e) => {
    const taskIndex = tasks.indexOf(task);
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
    }

    saveTasksToStorage();
    renderPage();
  });

  return buttonElement;
};

const filterArray = (tasksArr) => {
  return tasksArr
      .filter(task => filters.showCompleted || !task.completed)
};    .sort(sortArray);

// Sort the array
const sortArray = (a, b) => {
  // Eldste først
   if (filters.sortType === "time asc") {
     return new Date(b.timestamp) - new Date(a.timestamp);
}

// Nyeste først 
else if (filters.sortType === "time-desc") {
    return new Date(a.timestamp) - new Date(b.timestamp);
}

// A til Å 
  else if (filters.sortType === "alpha-asc") {
    return a.description.localeCompare(b.description);
  }

// Å til A
  else if (filters.sortType === "alpha-desc") {
    return a.description.localeCompare(b.description);
  }
} 

const buildPage = (tasksArr) => {
  console.log(tasksArr);
  listContainer.replaceChildren();
  tasksArr.forEach((task) => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const timestampElement = document.createElement("p");
    timestampElement.classList.add("datetime");
    timestampElement.textContent = task.timestamp;

    const descriptionElement = document.createElement("input");
    descriptionElement.classList.add("description");
    descriptionElement.readOnly = true;
    descriptionElement.value = task.description;

    //Buttons
    const inputElement = completeTaskInput(task);
    const editBtn = editTaskButton(task, descriptionElement);
    const deleteBtn = deleteTaskButton(task);

    taskContainer.append(
      timestampElement,
      descriptionElement,
      inputElement,
      editBtn,
      deleteBtn
    );

    listContainer.prepend(taskContainer);
  });
};
const renderPage = () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  buildPage(filterArray(tasks));
};

/* 
    Return = Returnerer en verdi ut av funksjonen 

*/

/* 
TODO Calculator :
- input
- add
- subtract
- multiply
- divide

const add = (a, b) => return a + b 

*/

/* 
Lage todo  -  Submit 
Sortere todos. - 
Fjerne todos - Delete
Edit todos  - Edit
Delete todos 
Complete todo - 
*/

// Lage en todo
// ------
//
