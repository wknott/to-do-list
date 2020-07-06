{
  let tasks = [];
  let displayDoneTasks = true;
  let directionOfSort = null;

  const addTask = (name) => {
    tasks = [...tasks, { name }];
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskInput = document.querySelector(".js-newTask");
    const newTaskName = newTaskInput.value.trim();
    newTaskInput.focus();
    if (!newTaskName) {
      return;
    }
    addTask(newTaskName);
    newTaskInput.value = "";
  };

  const removeTask = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1)
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
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
    let htmlStringTasks = "";
    for (const { name, done } of tasks) {
      htmlStringTasks += `
        <li class="list__item ${displayDoneTasks || !done ? "" : "list__item--hide"}">
          <button class="list__button list__button--done js-done">
            ${done ? "✔" : " "}
          </button>
          <p class="list__paragraph">
            ${done ? `<s>${name}</s>` : name}
          </p>
          <button class="list__button list__button--remove js-remove">
            ❌
          </button>
        </li>  
        `;
    }
    document.querySelector(".js-tasksList").innerHTML = htmlStringTasks;
  };

  const renderButtons = () => {
    let htmlString = `<h2 class="section__header">Lista zadań</h2>`;
    if (tasks.length > 0) {
      htmlString += `
      <button class="section__button js-sortButton">
        Posortuj zadania ${directionOfSort === null ? "" : directionOfSort ? "↓" : "↑"}
      </button>
      <button class="section__button js-doneTasksDisplayButton">
        ${displayDoneTasks ? "Ukryj ukończone" : "Pokaż ukończone"}
      </button>
      <button class="section__button js-doAllTasksButton 
        ${tasks.every(({ done }) => done)
          ? `section__button--disabled" disabled`
          : `"`
        }>
        Ukończ wszystkie
      </button>
      `;
    }
    document.querySelector(".js-buttonsContainer").innerHTML = htmlString;
  };

  function compare(a, b) {
    if (a.name < b.name) {
      return directionOfSort ? -1 : 1;
    }
    if (a.name > b.name) {
      return directionOfSort ? 1 : -1;
    }
    return 0;
  }

  const bindSortEvent = () => {
    const sortButton = document.querySelector(".js-sortButton");
    sortButton.addEventListener("click", () => {
      directionOfSort = !directionOfSort;
      tasks = [...tasks].sort(compare);
      render();
    });
  };

  const bindDisplayEvent = () => {
    const doneTasksDisplayButton = document.querySelector(
      ".js-doneTasksDisplayButton"
    );
    doneTasksDisplayButton.addEventListener("click", () => {
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
      bindSortEvent();
    }
  };

  const init = () => {
    document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
  };

  init();
}
