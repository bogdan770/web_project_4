import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".image-popup__image");
    this._caption = this._popup.querySelector(".image-popup__title");
  }

  open = ({ image, title }) => {
    this._image.src = image;
    this._image.alt = `Image ${title}`;
    this._caption.textContent = title;
    super.open();
  };
}
