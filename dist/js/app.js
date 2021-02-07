const todoDate = document.querySelector(".todo-date");
const todoFeedback = document.querySelector(".todo-feedback");
const todoInput = document.querySelector("#todo-input");
const todoSubmit = document.querySelector("#todo-submit");
const todoDisplay = document.querySelector("#todo-display");
const todoBox = document.querySelector("#todo-box");
const formWrapper = document.querySelector("#form-wrapper");
// var btn = document.querySelector(".add");
const remove = document.querySelector(".draggable");

let todoItemList = [];
let todoID = 0;

// console.log(
//   todoDate,
//   todoInput,
//   todoSubmit,
//   todoDisplay,
//   todoBox,
//   formWrapper,
//   todoFeedback
// );

// For Drag and Drop

// console.log(remove);

function dragStart(e) {
  this.style.opacity = "0.4";
  dragSrcEl = this;
  console.log(this);
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function dragEnter(e) {
  this.classList.add("over");
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
}

function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

function dragEnd(e) {
  var listItens = document.querySelectorAll(".draggable");
  [].forEach.call(listItens, function (item) {
    item.classList.remove("over");
  });
  this.style.opacity = "1";
}

function addEventsDragAndDrop(el) {
  el.addEventListener("dragstart", dragStart, false);
  el.addEventListener("dragenter", dragEnter, false);
  el.addEventListener("dragover", dragOver, false);
  el.addEventListener("dragleave", dragLeave, false);
  el.addEventListener("drop", dragDrop, false);
  el.addEventListener("dragend", dragEnd, false);
}

var listItens = document.querySelectorAll(".draggable");
[].forEach.call(listItens, function (item) {
  addEventsDragAndDrop(item);
});

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
  }. ${date.getDate().toString()}, ${year} `;

  todoDate.firstElementChild.textContent = today;
};
dateTimeFormat(new Date());

// For Form Submit
const submitTodoForm = () => {
  const todoValue = todoInput.value;

  if (todoValue === "") {
    todoFeedback.innerHTML = `<p>Value cannot be empty</p>`;
    todoFeedback.classList.add("error");

    setTimeout(() => {
      todoFeedback.remove("error");
    }, 3000);
  } else {
    todoInput.value = "";
    let todo = {
      id: todoID,
      name: todoValue,
    };

    todoID++;
    todoItemList.push(todo);
    addTodo(todo);
    // console.log(todo);
  }
};

const addTodo = (todo) => {
  const div = document.createElement("div");
  div.classList.toggle("item");
  div.classList.add("draggable");
  div.setAttribute("draggable", true);

  div.innerHTML = `
    <div class="item-check check-slave" data-id="${todo.id}">
      <input type="checkbox" class="todo-check" value="on" />
    </div>
    <div class="item-text">
      <p class="item-text-p" id="todo-display">${todo.name}</p>
    </div>
    <div class="item-edit">
      <div class="icon" id="icon-edit" data-id="${todo.id}">
        <i class="fas fa-edit" id="edit"></i>
      </div>
      <div class="icon" id="icon-edit" data-id="${todo.id}">
        <i class="fas fa-trash" id="trash"></i>
      </div>
    </div>
  `;
  todoBox.insertBefore(div, formWrapper.nextSibling);
};

todoSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  submitTodoForm();
  console.log(todoItemList);
});

document.addEventListener("DOMContentLoaded", () => {
  submitTodoForm();
});
