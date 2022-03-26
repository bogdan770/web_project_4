import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler, textButton, loadingTextButton) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".input");
    this._submitButton = this._popup.querySelector(".popup__button");
    this._textButton = textButton;
    this._loadingTextButton = loadingTextButton;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());
    });

    super.setEventListeners();
  }

  showLoading() {
    this._submitButton.textContent = this._loadingTextButton;
  }

  hideLoading() {
    this._submitButton.textContent = this._textButton;
  }

  close() {
    this._form.reset();
    super.close();
  }
}
