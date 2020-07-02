{
  const tasks = [];
  const addTask = (newTaskInput) => {
    tasks.push({ name: newTaskInput.value.trim() });
    newTaskInput.value = "";
    newTaskInput.focus();
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskInput = document.querySelector(".js-newTask");
    if (!newTaskInput.value.trim()) {
      newTaskInput.focus();
      return;
    }
    addTask(newTaskInput);
  };

  const removeTask = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const toggleDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `<li> 
      <button class="js-done">${task.done ? "✔️" : "Zrobione"}</button>
      ${task.done ? `<s>${task.name}</s>` : `${task.name}`}
      <button class="js-remove">Usuń</button>
      </li>  
      `;
    }
    document.querySelector(".js-tasksList").innerHTML = htmlString;
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => removeTask(taskIndex));
    });
    const doneButtons = document.querySelectorAll(".js-done");
    doneButtons.forEach((doneButton, taskIndex) => {
      doneButton.addEventListener("click", () => toggleDone(taskIndex));
    });
  };
  const init = () => {
    document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
  };
  init();
}
