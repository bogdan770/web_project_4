export default class Card {
  constructor({
    data,
    userid,
    cardElement,
    handleLikeClick,
    handleCardClick,
    handleDeleteCard,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userid = userid;
    this._ownerId = data.owner._id;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._element = cardElement.cloneNode(true);
  }
  createCard() {
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    if (this._userid !== this._ownerId) {
      this._element.querySelector(".element__delete").style.display = "none";
    }
    this._renderLikes();

    return this._element;
  }

  // _removeCard(evt) {
  //   evt.target.closest(".element").remove();
  // }
  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", (evt) => {
        this._handleCardClick(evt);
      });

    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeClick(this._id);
      });

    if (this._userid === this._ownerId) {
      this._element
        .querySelector(".element__delete")
        .addEventListener("click", (evt) =>
          this._handleDeleteCard(this._id, evt)
        );
    }
  }

  checkIsLiked() {
    return this._likes.some((like) => like._id === this._userid);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.checkIsLiked()) {
      this._element
        .querySelector(".element__like")
        .classList.add("element__like_active");
    } else {
      this._element
        .querySelector(".element__like")
        .classList.remove("element__like_active");
    }
    this._element.querySelector(".element__like-count").textContent =
      this._likes.length;
  }
}
