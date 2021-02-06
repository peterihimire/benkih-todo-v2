const todoDate = document.querySelector(".todo-date");
console.log(todoDate);

const dateTimeFormat = (date) => {
  // const date = new Date();
  let minutes = date.getMinutes().toString();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let hours = date.getHours();
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour 0 is converted to 12
  let ampm = hours >= 12 ? "pm" : "am";

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let year = date.getFullYear().toString();

  let time = `${hours} : ${minutes} ${ampm}`;
  let today = `${days[date.getDay()]}. ${
    months[date.getMonth()]
  }. ${date.getDay().toString()}, ${year} `;

  todoDate.firstElementChild.textContent = today;
};
dateTimeFormat(new Date());
