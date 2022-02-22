export default class Card {
  constructor(data, cardSelector, onImageClick) {
    this._title = data.title;
    this._image = data.image;

    this._cardSelector = cardSelector;

    this._onImageClick = onImageClick;
  }

  _handleLikeIcon(evt) {
    evt.target.classList.toggle("element__like_active");
  }

  _removeCard(evt) {
    evt.target.closest(".element").remove();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(
      ".element__image"
    ).style.backgroundImage = `url(${this._image})`;
    this._element.querySelector(".element__title").textContent = this._title;

    return this._element;
  }

  _handleOpenPopup() {
    this._onImageClick({ image: this._image, title: this._title });
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });

    const likeButton = this._element.querySelector(".element__like");
    const deleteButton = this._element.querySelector(".element__delete");

    likeButton.addEventListener("click", this._handleLikeIcon);
    deleteButton.addEventListener("click", this._removeCard);
  }
}
