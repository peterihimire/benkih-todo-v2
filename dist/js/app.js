const todoDate = document.querySelector(".todo-date");
console.log(todoDate);

const dateTimeFormat = (date) => {
  // const date = new Date();

  let minutes = date.getMinutes().toString().length == 1
  console.log(minutes);
  todoDate.textContent = date;
};
dateTimeFormat(new Date());
