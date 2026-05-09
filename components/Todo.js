export class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
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
    todoDeleteBtn.addEventListener("click", () => {
      this._element.remove();
    });
  }

  getView() {
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