{
  const tasks = [];
  const addTask = (newTaskInput) => {
    tasks.push(newTaskInput.value.trim());
    newTaskInput.value = "";
    newTaskInput.focus();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskInput = document.querySelector(".js-newTask");
    if (!newTaskInput.value.trim()) {
      newTaskInput.focus();
      return;
    }
    addTask(newTaskInput);
    console.log(tasks);
  };

  const init = () => {
    document.querySelector(".js-newTask").focus();
    document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
  };
  init();
}
