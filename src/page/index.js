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
  cardName,
  cardImageLink,
} from "../utils/constans";

const userInfo = new UserInfo({
  userName: ".profile__username",
  userJob: ".profile__userprof",
});

const imagePopup = new PopupWithImage(".image-popup");
imagePopup.setEventListeners();

const editPopup = new PopupWithForm(
  ".popup_type_edit-profile",
  submitProfileForm
);
editPopup.setEventListeners();

function submitProfileForm() {
  const name = document.querySelector("#userName");
  const job = document.querySelector("#userJob");
  userInfo.setUserInfo({
    name: name.value,
    job: job.value,
  });
  editPopup.close();
}

editButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  editPopup.open();
});

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

const createCard = (item) => {
  return new Card(item, "#card-template", imagePopup.open);
};

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      section.addItem(card.generateCard());
    },
  },
  ".elements__grid"
);
section.render();

const addCard = new PopupWithForm(".popup_type_add-card", (data) => {
  const cardData = {
    name: data.title,
    link: data["img-link"],
  };
  console.log(cardData);
  const card = createCard(cardData);

  section.addItem(card.generateCard());
});

addCard.setEventListeners();

addButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  addCard.open();
});
