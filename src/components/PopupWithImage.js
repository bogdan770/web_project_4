import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardLink = this._popup.querySelector(".image-popup__image");
    this._cardName = this._popup.querySelector(".image-popup__title");
  }

  open = (link, name) => {
    this._cardLink.src = link;
    this._cardLink.alt = `Image ${name}`;
    this._cardName.textContent = name;
    super.open();
  };
}
