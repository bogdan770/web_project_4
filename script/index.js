import Card from "./Card";
import "../pages/index.css";
import { PopupWithImage } from "./PopupWithImage";
import { PopupWithForm } from "./PopupWithForm";

const imagePopup = new PopupWithImage(".image-popup", () => {
  console.log("!!!");
});
imagePopup.setEventListeners();

const editPopup = new PopupWithForm(".popup_type_edit-profile", () => {
  console.log("!!!");
});
editPopup.setEventListeners();

const initialCards = [
  {
    title: "Yosemite Valley",
    image: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    image: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    image: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    image: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    image: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    image: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const settings = {
  inputSelector: ".input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");

// const editFormValidator = new FormValidator(settings, popupEditProfile);
// const cardFormValidator = new FormValidator(settings, popupAddCard);

// editFormValidator.enableValidation();
// cardFormValidator.enableValidation();

const userName = document.querySelector(".profile__username");
const userProf = document.querySelector(".profile__userprof");
//choosing strings from HTML

const placesList = document.querySelector(".elements__grid");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const formProfileElement = popupEditProfile.querySelector("#popup__form-edit");
const formAddCardElement = popupAddCard.querySelector("#popup__form-new");

const nameInput = document.querySelector("#userName");
const jobInput = document.querySelector("#userJob");

//getting inputs from popup that add card
const cardName = document.querySelector("#cardNameId");
const cardImageLink = document.querySelector("#cardLinkId");

// //cards
// const cardTemplate = document
//   .querySelector("#card-template")
//   .content.querySelector(".element");

// const cardTemplateImage = document.querySelector(".image-popup");
// const imagePopupTitle = document.querySelector(".image-popup__title");
// const imagePopupImage = document.querySelector(".image-popup__image");
// const cardCloseButton = cardTemplateImage.querySelector(".popup__close");

editButton.addEventListener("click", () => {
  // editFormValidator.resetValidation();
  // nameInput.value = userName.textContent;
  // jobInput.value = userProf.textContent;
  // openPopup(popupEditProfile);
  editPopup.open();
});

formProfileElement.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userProf.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function createCard(item) {
  const card = new Card(item, "#card-template", imagePopup.open);
  placesList.prepend(card.generateCard());
}

initialCards.forEach((initialCard) => {
  createCard(initialCard, "#card-template");
});

addButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  openPopup(popupAddCard);
});

formAddCardElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  createCard({
    title: cardName.value,
    image: cardImageLink.value,
  });
  closePopup(popupAddCard);
  (cardName.value = ""), (cardImageLink.value = "");
});
