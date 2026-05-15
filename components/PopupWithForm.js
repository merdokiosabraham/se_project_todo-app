import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);  // calls Popup's constructor
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll(".popup__input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  close() {
    super.close();        // calls Popup's close() method
    this._form.reset();   // then does this extra step
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (!this._form.checkValidity()) return;
        this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();  // also runs Popup's setEventListeners
  }
}

export { PopupWithForm };