import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputValues = {};
    const inputs = this._form.querySelectorAll(".input");
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    console.log(inputValues);
    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler(this._getInputValues());
    });

    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
