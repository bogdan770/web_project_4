import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = ({ image, title }) => {
    const imageElement = this._popup.querySelector(".image-popup__image");
    const titleElement = this._popup.querySelector(".image-popup__title");

    imageElement.src = image;
    imageElement.alt = `Image ${title}`;
    titleElement.textContent = title;

    this._popup.classList.add("popup_display");
    document.addEventListener("keyup", this._handleEscClose);
  };
}
