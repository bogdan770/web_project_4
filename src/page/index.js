import FormValidator from "../script/FormValidator";
import Card from "../script/Card";
import "./index.css";
import { PopupWithImage } from "../script/PopupWithImage";
import { PopupWithForm } from "../script/PopupWithForm";
import { UserInfo } from "../script/UserInfo";
import { Section } from "../script/Section";

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const placesList = document.querySelector(".elements__grid");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formProfileElement = popupEditProfile.querySelector("#popup__form-edit");
const formAddCardElement = popupAddCard.querySelector("#popup__form-new");
const nameInput = document.querySelector("#userName");
const jobInput = document.querySelector("#userJob");

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

const imagePopup = new PopupWithImage(".image-popup");
imagePopup.setEventListeners();

const editPopup = new PopupWithForm(".popup_type_edit-profile");
editPopup.setEventListeners();

const addCard = new PopupWithForm(".popup_type_add-card");
addCard.setEventListeners();

const settings = {
  inputSelector: ".input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//validation
const editFormValidator = new FormValidator(settings, popupEditProfile);
const cardFormValidator = new FormValidator(settings, popupAddCard);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//getting inputs from popup that add card
const cardName = document.querySelector("#cardNameId");
const cardImageLink = document.querySelector("#cardLinkId");

function createCard(item) {
  const card = new Card(item, "#card-template", imagePopup.open);
  placesList.prepend(card.generateCard());
}

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      createCard(data);
    },
  },
  ".element"
);
section.render();

const userInfo = new UserInfo({
  userName: ".profile__username",
  userJob: ".profile__userprof",
});

//opening popup form with profile and filling it by data from the page
editButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  editPopup.open();
});

//changing information of the user on page
formProfileElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userInfo._userName.textContent = nameInput.value;
  userInfo._userJob.textContent = jobInput.value;
  editPopup.close();
});

//opening popup with new card
addButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  addCard.open();
});

//creating a new card
formAddCardElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  createCard({
    title: cardName.value,
    image: cardImageLink.value,
  });
  addCard.close();
  (cardName.value = ""), (cardImageLink.value = "");
});
