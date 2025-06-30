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
});
