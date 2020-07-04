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
    const doneTasksDisplayButton = document.querySelector(
      ".js-doneTasksDisplayButton"
    );
    const doAllTasksButton = document.querySelector(".js-doAllTasksButton");
    if (tasks.length) {
      doneTasksDisplayButton.classList.add("section__button--show");
      doAllTasksButton.classList.add("section__button--show");
    } else {
      doneTasksDisplayButton.classList.remove("section__button--show");
      doAllTasksButton.classList.remove("section__button--show");
    }
    if (tasks.every(({ done }) => done)) {
      doAllTasksButton.disabled = true;
      doAllTasksButton.classList.add("section__button--disabled");
    } else {
      doAllTasksButton.disabled = false;
      doAllTasksButton.classList.remove("section__button--disabled");
    }
  };

  const render = () => {
    renderTaskList();
    bindRemoveEvents();
    bindDoneEvents();
    renderButtons();
  };

  const bindButtonsEvents = () => {
    const doneTasksDisplayButton = document.querySelector(
      ".js-doneTasksDisplayButton"
    );
    const doAllTasksButton = document.querySelector(".js-doAllTasksButton");
    doneTasksDisplayButton.addEventListener("click", () => {
      if (displayDoneTasks) {
        doneTasksDisplayButton.innerText = "Pokaż ukończone";
      } else {
        doneTasksDisplayButton.innerText = "Ukryj ukończone";
      }
      displayDoneTasks = !displayDoneTasks;
      render();
    });
    doAllTasksButton.addEventListener("click", () => {
      tasks = tasks.map(({ name }) => ({
        name,
        done: true,
      }));
      render();
    });
  };

  const init = () => {
    document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
    bindButtonsEvents();
  };

  init();
}
