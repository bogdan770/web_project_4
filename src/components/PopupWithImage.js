import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popup.querySelector(".image-popup__image");
    this._name = this._popup.querySelector(".image-popup__title");
  }

  open = ({ link, name }) => {
    this._link.src = link;
    this._link.alt = `Image ${name}`;
    this._name.textContent = name;
    super.open();
  };
}
