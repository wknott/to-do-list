{
  const tasks = [];

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskInput = document.querySelector(".js-newTask");
    const newTaskContent = newTaskInput.value.trim();
    if (!newTaskContent) {
      newTaskInput.focus();
      return;
    }
    tasks.push(newTaskContent);
    newTaskInput.value = "";
    newTaskInput.focus();
  };

  const init = () => {
    document.querySelector(".js-newTask").focus();
    document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
  };
  init();
}
