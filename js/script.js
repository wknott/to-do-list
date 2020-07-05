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
      htmlString += `
        <li class="list__item ${
          displayDoneTasks || !done ? "" : "list__item--hide"
        }"> 
          <button class="list__button list__button--done js-done">${
            done ? "✔" : " "
          }</button>
          <p class="list__paragraph">${done ? `<s>${name}</s>` : `${name}`}</p>
          <button class="list__button list__button--remove js-remove">❌</button>
        </li>  
        `;
    }
    document.querySelector(".js-tasksList").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let htmlString = `<h2 class="section__header">Lista zadań</h2>`;
    if (tasks.length > 0) {
      htmlString += `
      <button class="section__button js-doneTasksDisplayButton">
        ${displayDoneTasks ? "Ukryj ukończone" : "Pokaż ukończone"}
      </button>
      <button class="section__button js-doAllTasksButton ${
        tasks.every(({ done }) => done)
          ? `section__button--disabled" disabled`
          : `"`
      }>
        Ukończ wszystkie
      </button>
      `;
    }
    document.querySelector(".js-buttonsContainer").innerHTML = htmlString;
  };

  const bindDisplayEvent = () => {
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

  const bindDoAllEvent = () => {
    const doAllTasksButton = document.querySelector(".js-doAllTasksButton");
    doAllTasksButton.addEventListener("click", () => {
      tasks = tasks.map(({ name }) => ({
        name,
        done: true,
      }));
      render();
    });
  };

  const render = () => {
    renderTaskList();
    bindRemoveEvents();
    bindDoneEvents();
    renderButtons();
    if (tasks.length) {
      bindDisplayEvent();
      bindDoAllEvent();
    }
  };

  const init = () => {
    document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
  };

  init();
}
