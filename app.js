// selection
let todoInput = document.querySelector(".todo-input");
let todoButton = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");
let filterOption = document.querySelector(".filter-todo");
// event Listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addtodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
//Function
function addtodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // add todo localStore
  saveLocalTodos(todoInput.value);
  // check mark button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  // trash mark button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
  // clear input value
  todoInput.value = "";
}
function deleteCheck(e) {
  const item = e.target;
  // DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalStore(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //Check Todo
  if (item.classList[0] === "complete-btn") {
    const checktodo = item.parentElement;
    checktodo.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    const mstyle = todo.style;
    if (mstyle !== null && mstyle !== undefined) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if(!todo.classList.contains("completed")){
            todo.style.display = "flex";
          }else{
            todo.style.display = "none";
          }
          break;
      }
    }
  });
}
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  console.log("hello");
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // check mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    // trash mark button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  });
}
function removeLocalStore(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoindex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoindex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
