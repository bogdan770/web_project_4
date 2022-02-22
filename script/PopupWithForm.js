import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  _getInputValues() {}

  setEventListener() {
    const form = this._popup.querySelector("");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler;
    });
  }

  close() {
    const form = this._popup.querySelector("");
    form.reset();

    super.close();
  }
}
