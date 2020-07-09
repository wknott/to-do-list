{
  let tasks = [];
  let isShowingEnabled = true;
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
      ...tasks.slice(index + 1),
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
    const getTaskHtml = ({ name, done }) => `
    <li class="list__item ${isShowingEnabled || !done ? "" : "list__item--hide"}">
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

    document.querySelector(".js-tasksList").innerHTML = tasks.map(getTaskHtml).join("");
  };

  const renderButtons = () => {
    let htmlStringButtons = "";
    if (tasks.length > 0) {
      htmlStringButtons += `
      <button class="section__button js-sortButton">
        Posortuj zadania ${directionOfSort === null ? "" : directionOfSort === "asc" ? "↓" : "↑"}
      </button>
      <button class="section__button js-showDoneButton">
        ${isShowingEnabled ? "Ukryj ukończone" : "Pokaż ukończone"}
      </button>
      <button class="section__button js-allTasksButton" 
        ${!tasks.every(({ done }) => done) ? "" : "disabled"}>
        Ukończ wszystkie
      </button>
      `;
    }
    document.querySelector(".js-buttonsContainer").innerHTML = htmlStringButtons;
  };

  const compareTaskNames = (a, b) => directionOfSort === "asc"
    ? a.name.localeCompare(b.name)
    : b.name.localeCompare(a.name);

  const bindSortEvent = () => {
    const sortButton = document.querySelector(".js-sortButton");
    if (sortButton) {
      sortButton.addEventListener("click", () => {
        directionOfSort = directionOfSort === "asc" ? "desc" : "asc";
        tasks = [...tasks].sort(compareTaskNames);
        render();
      });
    }
  };

  const toggleIsShowingEnabled = () => {
    isShowingEnabled = !isShowingEnabled;
    render();
  }

  const bindDisplayDoneEvent = () => {
    const showDoneButton = document.querySelector(
      ".js-showDoneButton"
    );
    if (showDoneButton) {
      showDoneButton.addEventListener("click", toggleIsShowingEnabled);
    }
  };

  const markAllTasksAsDone = () => {
    tasks = tasks.map(({ name }) => ({
      name,
      done: true,
    }))
    render();
  };

  const bindCompleteAllTasksEvent = () => {
    const allTasksButton = document.querySelector(".js-allTasksButton");
    if (allTasksButton) {
      allTasksButton.addEventListener("click", markAllTasksAsDone);
    }
  };

  const render = () => {
    renderTaskList();
    bindRemoveEvents();
    bindDoneEvents();
    renderButtons();
    bindSortEvent();
    bindDisplayDoneEvent();
    bindCompleteAllTasksEvent();
  };

  const init = () => {
    document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
  };

  init();
}
