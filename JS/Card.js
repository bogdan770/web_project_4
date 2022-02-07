import { openPopup } from "./utils.js";

const cardTemplateImage = document.querySelector(".image-popup");
const imagePopupTitle = document.querySelector(".image-popup__title");
const imagePopupImage = document.querySelector(".image-popup__image");
const cardCloseButton = cardTemplateImage.querySelector(".popup__close");

export default class Card {
    constructor(data, cardSelector) {
        this._title = data.title;
        this._image = data.image;

        this._cardSelector = cardSelector;
    }

    _handleLikeIcon(evt) {
      evt.target.classList.toggle("element__like_active");
    }

    _removeCard(evt){
      evt.target.closest(".element").remove();
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .cloneNode(true);

        return cardElement;
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(".element__image").style.backgroundImage = `url(${this._image})`;
        this._element.querySelector(".element__title").textContent = this._title;

        return this._element;
    }

    _handleOpenPopup() {
        imagePopupImage.src = this._image;
        imagePopupImage.alt = this._title;
        imagePopupTitle.textContent = this._title;
        openPopup(cardTemplateImage);
    }

    _handleClosePopup() {
        imagePopupImage.src = "";
        imagePopupImage.alt = "";
        imagePopupTitle.textContent = "";
        cardTemplateImage.classList.remove("popup_display");
    }

    _setEventListeners() { 
        this._element.querySelector(".element__image").addEventListener("click", () => {
          this._handleOpenPopup()
        });
      
        cardCloseButton.addEventListener("click", () => {
          this._handleClosePopup()
        });

        const likeButton = this._element.querySelector(".element__like");
        const deleteButton = this._element.querySelector(".element__delete");

        likeButton.addEventListener('click', this._handleLikeIcon);
        deleteButton.addEventListener('click', this._removeCard);
    }
    
}

