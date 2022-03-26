import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  setAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }

  open = () => {
    super.open();
  };
}
