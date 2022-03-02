import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = ({ image, title }) => {
    this._popup.querySelector(".image-popup__image").src = image;
    this._popup.querySelector(".image-popup__image").alt = `Image ${title}`;
    this._popup.querySelector(".image-popup__title").textContent = title;
    super.open();
  };
}
