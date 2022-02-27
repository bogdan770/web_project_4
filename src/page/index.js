import FormValidator from "../components/FormValidator";
import Card from "../components/Card";
import "./index.css";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { Section } from "../components/Section";
import {
  popupEditProfile,
  popupAddCard,
  placesList,
  editButton,
  addButton,
  formProfileElement,
  formAddCardElement,
  nameInput,
  jobInput,
  initialCards,
} from "../utils/constans";

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

// function createCard(item) {
//   const card = new Card(item, "#card-template", imagePopup.open);
//   console.log(card);
//   placesList.prepend(card.generateCard());
// }

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", imagePopup.open);
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    },
  },
  ".elements__grid"
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
});
