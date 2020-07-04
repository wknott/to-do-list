{
  let tasks = [];
  let displayDoneTasks = true;
  const addTask = (newTaskInput) => {
    tasks = [...tasks, { name: newTaskInput.value.trim() }];
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
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map(({ name, done }, index) =>
      index === taskIndex ? { name, done: !done } : { name, done }
    );
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => removeTask(taskIndex));
    });
  };

  const bindDoneEvents = () => {
    const doneButtons = document.querySelectorAll(".js-done");
    doneButtons.forEach((doneButton, taskIndex) => {
      doneButton.addEventListener("click", () => toggleTaskDone(taskIndex));
    });
  };

  const renderTaskList = () => {
    let htmlString = "";
    for (const { name, done } of tasks) {
      if (displayDoneTasks || !done) {
        htmlString += `
        <li class="list__item"> 
          <button class="list__button list__button--done js-done">${
            done ? "✔" : " "
          }</button>
          <p class="list__paragraph">${done ? `<s>${name}</s>` : `${name}`}</p>
          <button class="list__button list__button--remove js-remove">❌</button>
        </li>  
        `;
      }
    }

    document.querySelector(".js-tasksList").innerHTML = htmlString;
  };

  const renderButtons = () => {
    if (tasks.length) {
      document
        .querySelector(".js-doneTasksDisplayButton")
        .classList.add("section__button--show");
      document
        .querySelector(".js-doAllTasksButton")
        .classList.add("section__button--show");
    } else {
      document
        .querySelector(".js-doneTasksDisplayButton")
        .classList.remove("section__button--show");
      document
        .querySelector(".js-doAllTasksButton")
        .classList.remove("section__button--show");
    }
  };

  const bindButtonsEvents = () => {
    const doneTasksDisplayButton = document.querySelector(
      ".js-doneTasksDisplayButton"
    );
    doneTasksDisplayButton.addEventListener("click", () => {
      if (displayDoneTasks) {
        doneTasksDisplayButton.innerText = "Pokaż ukończone";
      } else {
        doneTasksDisplayButton.innerText = "Ukryj ukończone";
      }
      displayDoneTasks = !displayDoneTasks;
      render();
    });
  };

  const render = () => {
    renderTaskList();
    bindRemoveEvents();
    bindDoneEvents();
    renderButtons();
  };

  const init = () => {
    document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
    bindButtonsEvents();
  };

  init();
}
