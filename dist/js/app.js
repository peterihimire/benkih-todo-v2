const todoDate = document.querySelector(".todo-date");
const todoFeedback = document.querySelector(".todo-feedback");
const todoInput = document.querySelector("#todo-input");
const todoSubmit = document.querySelector("#todo-submit");
const todoDisplay = document.querySelector("#todo-display");
const todoBox = document.querySelector("#todo-box");
const formWrapper = document.querySelector("#todo-wrapper");

console.log(
  todoDate,
  todoInput,
  todoSubmit,
  todoDisplay,
  todoBox,
  formWrapper,
  todoFeedback
);
// For Date Display
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

// For Form Submit
const submitTodoForm = (e) => {
  // e.preventDefault()
  const todoValue = todoInput.value;

  if (todoValue === "") {
    todoFeedback.innerHTML = `<p>Value cannot be empty</p>`;
    todoFeedback.classList.add("error");

    setTimeout(() => {
      todoFeedback.remove("error");
    }, 3000);
  } else {
    let todo = {
      id: todoID,
      name: todoValue,
    };
    console.log(todo);
  }
  console.log(todoValue);
};
submitTodoForm();
