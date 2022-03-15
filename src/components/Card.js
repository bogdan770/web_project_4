export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
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
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }

  _handleOpenPopup() {
    this._handleCardClick({ link: this._link, name: this._name });
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
