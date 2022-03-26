const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditSubmit = document.querySelector(".popup__button_change-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupNewAvatarSubmit = document.querySelector(
  ".popup__button_change-avarat"
);

const confirmButton = document.querySelector(".popup__button_confirmation");
const popupCreateCardBtn = document.querySelector(".popup__button_create-card");
const placesList = document.querySelector(".elements__grid");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formProfileElement = popupEditProfile.querySelector("#popup__form-edit");
const formAddCardElement = popupAddCard.querySelector("#popup__form-new");
const nameInput = document.querySelector("#userName");
const jobInput = document.querySelector("#userJob");
const cardName = document.querySelector("#cardNameId");
const cardImageLink = document.querySelector("#cardLinkId");
const profileAvatarEditBtn = document.querySelector(".profile__avatar_btn");
const cardElement = document
  .querySelector("#card-template")
  .content.querySelector(".element");

const mainLogo = document.querySelector(".header__logo");
const profileAvatar = document.querySelector(".profile__avatar");

const settings = {
  inputSelector: ".input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export {
  popupEditProfile,
  popupEditSubmit,
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
  mainLogo,
  profileAvatar,
  profileAvatarEditBtn,
  popupNewAvatarSubmit,
  cardElement,
  popupCreateCardBtn,
  confirmButton,
};
