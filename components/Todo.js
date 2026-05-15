export class Todo {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  _setDate() {
    const todoDate = this._element.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _setEventListeners() {
    const todoDeleteBtn = this._element.querySelector(".todo__delete-btn");
    const todoCheckbox = this._element.querySelector(".todo__completed");

    todoDeleteBtn.addEventListener("click", () => {
      if (this._handleDelete) {
        this._handleDelete(this._data.completed);
      }
      this._element.remove();
    });

    todoCheckbox.addEventListener("change", () => {
      this._data.completed = todoCheckbox.checked;
      if (this._handleCheck) {
        this._handleCheck(this._data.completed);
      }
    });
  }

  getView({ handleDelete, handleCheck } = {}) {
    this._handleDelete = handleDelete;
    this._handleCheck = handleCheck;
    this._element = this._getTemplate();

    const todoNameEl = this._element.querySelector(".todo__name");
    const todoCheckboxEl = this._element.querySelector(".todo__completed");
    const todoLabel = this._element.querySelector(".todo__label");

    todoNameEl.textContent = this._data.name;
    todoCheckboxEl.checked = this._data.completed;
    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    this._setDate();
    this._setEventListeners();

    return this._element;
  }
}