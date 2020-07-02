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

  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `<li> ${task.name} </li>
`;
    }
    document.querySelector(".js-tasksList").innerHTML = htmlString;
  };
  const init = () => {
    document.querySelector(".js-newTask").focus();
    document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
  };
  init();
}
