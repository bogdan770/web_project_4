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
  cardName,
  cardImageLink,
  settings,
} from "../utils/constants";
import { api } from "../components/Api";

const userInfo = new UserInfo({
  userName: ".profile__username",
  userJob: ".profile__userprof",
});

const imagePopup = new PopupWithImage(".image-popup");
imagePopup.setEventListeners();

const createCard = (data) => {
  return new Card(data, "#card-template", imagePopup.open).generateCard();
};

const section = new Section((data) => {
  section.addItem(createCard(data));
}, ".elements__grid");

api.getInitialCards().then((res) => {
  section.render(res);
});

const editPopup = new PopupWithForm(".popup_type_edit-profile", (data) => {
  userInfo.setUserInfo(data);
  editPopup.close();
});

editPopup.setEventListeners();

const addCard = new PopupWithForm(".popup_type_add-card", (data) => {
  const card = createCard(data);
  section.addItem(card);
  addCard.close();
});
addCard.setEventListeners();

//validation
const editFormValidator = new FormValidator(settings, popupEditProfile);
const cardFormValidator = new FormValidator(settings, popupAddCard);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//getting inputs from popup that add card

//opening popup form with profile and filling it by data from the page  CORRECT
editButton.addEventListener("click", () => {
  editPopup.open();
  editFormValidator.resetValidation();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
});

//opening popup with new card
addButton.addEventListener("click", () => {
  addCard.open();
  cardFormValidator.resetValidation();
});
