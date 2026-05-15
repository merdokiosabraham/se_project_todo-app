import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { TodoCounter } from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView({
    handleDelete: (completed) => {
      if (completed) {
        todoCounter.updateCompleted(false);
      }
      todoCounter.updateTotal(false);
    },
    handleCheck: (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
  });
};

const renderTodo = (data) => {
  const todo = generateTodo(data);
  todoSection.addItem(todo);
};

const todoSection = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

todoSection.renderItems();

const addTodoPopup = new PopupWithForm("#add-todo-popup", (data) => {
  const name = data.name;
  const dateInput = data.date;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  renderTodo({ name, date, id: uuidv4() });
  todoCounter.updateTotal(true);  // 👈 added
  formValidator.resetValidation();
  addTodoPopup.close();
});

addTodoPopup.setEventListeners();

const addTodoForm = document.querySelector("#add-todo-popup .popup__form");
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});