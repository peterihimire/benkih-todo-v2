const todoDate = document.querySelector(".todo-date");
const todoFeedback = document.querySelector(".todo-feedback");
const todoInput = document.querySelector("#todo-input");
const todoSubmit = document.querySelector("#todo-submit");
const todoItem = document.querySelector(".item");
const todoDisplay = document.querySelector("#todo-display");
const todoBox = document.querySelector("#todo-box");
const formWrapper = document.querySelector("#form-wrapper");
const remove = document.querySelector(".draggable");
const refreshBtn = document.querySelector("#refresh-btn");

let todoItemList = [];
let todoID = 0;

// console.log(remove);

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
    saveTodo();
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
      <div class="icon edit-div" id="icon-edit" data-id="${todo.id}">
        <i class="fas fa-edit" id="edit"></i>
      </div>
      <div class="icon trash-div" id="icon-edit" data-id="${todo.id}">
        <i class="fas fa-trash" id="trash"></i>
      </div>
    </div>
  `;

  todoBox.insertBefore(div, formWrapper.nextSibling);
};

// FUNCTION TO RELOAD A PAGE ONCE
function reloadPageOnce() {
  let currentDocumentTimestamp = new Date(
    performance.timing.domLoading
  ).getTime();
  let now = Date.now();
  let twoSec = 2 * 1000;
  let plusTwoSec = currentDocumentTimestamp + twoSec;
  if (now > plusTwoSec) {
    window.location.reload();
  }
}

// FUNCTION TO EDIT TODO
const editTodo = (todoitem) => {
  let id = parseInt(todoitem.parentElement.dataset.id);
  let singleTodo = todoitem.parentElement.parentElement.parentElement;
  todoBox.removeChild(singleTodo);
  let individualTodo = todoItemList.filter((todo) => todo.id === id);
  todoInput.value = individualTodo[0].name;
  let tempTodo = todoItemList.filter((todo) => todo.id !== id);
  todoItemList = tempTodo;
};
const editTodo2 = (todoitem) => {
  let id = parseInt(todoitem.dataset.id);
  let singleTodo = todoitem.parentElement.parentElement;
  todoBox.removeChild(singleTodo);
  let individualTodo = todoItemList.filter((todo) => todo.id === id);
  todoInput.value = individualTodo[0].name;
  let tempTodo = todoItemList.filter((todo) => todo.id !== id);
  todoItemList = tempTodo;
};

// FUNCTION TO DELETE TODO
const deleteTodo = (todoItem) => {
  let id = parseInt(todoItem.parentElement.dataset.id);
  let singleTodo = todoItem.parentElement.parentElement.parentElement;
  todoBox.removeChild(singleTodo);
  let individualTodo = todoItemList.filter((todo) => todo.id === id);
  let tempTodo = todoItemList.filter((todo) => todo.id !== id);
  todoItemList = tempTodo;
  saveTodo();
};

const deleteTodo2 = (todoItem) => {
  let id = parseInt(todoItem.dataset.id);
  let singleTodo = todoItem.parentElement.parentElement;
  todoBox.removeChild(singleTodo);
  let individualTodo = todoItemList.filter((todo) => todo.id === id);
  let tempTodo = todoItemList.filter((todo) => todo.id !== id);
  todoItemList = tempTodo;
  saveTodo();
};

// FUNCTION TO STRIKE TODO
const strikeTodo = (todoItem) => {
  let id = parseInt(todoItem.parentElement.dataset.id);
  let singleTodo = todoItem.parentElement.parentElement;
  let todoText = singleTodo.children[1].firstElementChild.textContent;
  let todoPtag = singleTodo.children[1].firstElementChild;
  todoPtag.classList.toggle("strike-through");
};

const setReset = (e) => {
  const todoList = todoItemList.map((todo) => {
    return todo.id;
  });

  todoList.forEach((id) => deleteTodoById(id));
  let todoBoxChildren = todoBox.children;
  let i;
  for (i = 0; i < todoBoxChildren.length; i++) {
    while (todoBoxChildren[i].classList.contains("item")) {
      todoBox.removeChild(todoBoxChildren[i]);
    }
  }
};
refreshBtn.addEventListener("click", setReset);

const deleteTodoById = (id) => {
  todoItemList = todoItemList.filter((todo) => todo.id !== id);
  saveTodo();
};

todoSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  submitTodoForm();
  reloadPageOnce();
});

// todoSubmitClass.removeEventListener("click", (e) => {
//   e.preventDefault();
//   pageRefreshTimeOut();
// });

const setupApp = () => {
  todoItemList = getTodos();
  populateTodo(todoItemList);
  getOneTodo();
};

const populateTodo = (todoItemList) => {
  todoItemList.forEach((todo) => addTodo(todo));
};

const saveTodo = () => {
  localStorage.setItem("todoz", JSON.stringify(todoItemList));
};

const getOneTodo = (id) => {
  let todos = JSON.parse(localStorage.getItem("todoz"));
  return todos.find((todo) => {
    todo.id === id;
  });
};

const getTodos = () => {
  return localStorage.getItem("todoz")
    ? JSON.parse(localStorage.getItem("todoz"))
    : [];
};

document.addEventListener("DOMContentLoaded", () => {
  setupApp();

  todoBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-edit")) {
      editTodo(e.target);
    } else if (e.target.classList.contains("fa-trash")) {
      deleteTodo(e.target);
    }
  });

  // FOR THE ICON CONTAINER
  todoBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-div")) {
      editTodo2(e.target);
    } else if (e.target.classList.contains("trash-div")) {
      deleteTodo2(e.target);
    }
  });

  todoBox.addEventListener("change", (e) => {
    if (e.target.classList.contains("todo-check")) {
      strikeTodo(e.target);
    }
  });

  // For Drag and Drop, Works only when node-element has been mounted to the DOM
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
    let listItens = document.querySelectorAll(".draggable");
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

  let listItens = document.querySelectorAll(".draggable");
  [].forEach.call(listItens, function (item) {
    addEventsDragAndDrop(item);
  });
});
