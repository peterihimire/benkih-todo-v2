const todoDate = document.querySelector(".todo-date");
console.log(todoDate);

const dateTimeFormat = (date) => {
  // const date = new Date();

  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = date.getDay();
  let month = date.getMonth()
  let year = date.getYear()


  console.log(minutes, hours, days,month, year);
  todoDate.textContent = date;
};
dateTimeFormat(new Date());
