export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add("popup_display");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_display");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(e) {
    e.preventDefault();

    if (e.key === "Escape") {
      this.close();
    }
  }
}
