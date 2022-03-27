//import all static images
import logo from "../images/around.svg";
import avatar from "../images/kermit.jpg";

import FormValidator from "../components/FormValidator";
import Card from "../components/Card";
import "./index.css";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { Section } from "../components/Section";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation";
import {
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
  popupButtonConf,
  cardElement,
  popupCreateCardBtn,
  popupNewAvatarSubmit,
  confirmButton,
} from "../utils/constants";
import Api from "../components/Api";

//adding static images to the page
mainLogo.src = logo;
profileAvatar.src = avatar;

const userInfo = new UserInfo({
  userName: ".profile__username",
  userJob: ".profile__userprof",
  userImage: ".profile__avatar",
});
//API
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "433f6e92-8eab-41fc-9b11-52559de1ddbb",
    "Content-Type": "application/json",
  },
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardsData, userData]) => {
    userId = userData._id;
    section.render(cardsData);
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Image Popup
const imagePopup = new PopupWithImage(".image-popup");
imagePopup.setEventListeners();
const deletePopup = new PopupWithConfirmation(".popup_confirmation");
deletePopup.setEventListeners();

//Creating card
function generateCard(data) {
  const card = new Card({
    data: data,
    userId: userId,
    cardElement: cardElement,
    handleLikeClick: (cardId) => {
      const isLiked = card.checkIsLiked();
      if (isLiked) {
        api
          .dislikeCard(cardId)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .likeCard(cardId)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleCardClick: (evt) => {
      evt.preventDefault();
      const target = evt.currentTarget;
      const link = target.src;
      const name = target.alt;
      imagePopup.open(link, name);
    },
    handleDeleteCard: (cardId) => {
      deletePopup.open();
      deletePopup.setAction(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.removeCard();
            deletePopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            confirmButton.textContent = "Yes";
          });
      });
      confirmButton.textContent = "Deleting...";
    },
  });
  const cardElements = card.createCard();
  return cardElements;
}

const section = new Section((data) => {
  section.addItem(generateCard(data));
}, ".elements__grid");

//edit Popup
const editPopup = new PopupWithForm(
  ".popup_type_edit-profile",
  (data) => {
    editPopup.showLoading();
    api
      .editProfile(data.userName, data.userJob)
      .then((res) => {
        userInfo.setUserInfo(res);
        editPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editPopup.hideLoading();
      });
  },
  popupEditSubmit.textContent,
  "Saving..."
);
editPopup.setEventListeners();

//Avatar profile popup
const popupProfileAvatar = new PopupWithForm(
  ".popup_avatar",
  (data) => {
    popupProfileAvatar.showLoading();
    api
      .updatingProfilePic(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupProfileAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfileAvatar.hideLoading();
      });
  },
  popupNewAvatarSubmit.textContent,
  "Saving..."
);
popupProfileAvatar.setEventListeners();

//creating a new card
const addCard = new PopupWithForm(
  ".popup_type_add-card",
  (data) => {
    addCard.showLoading();
    api
      .createCard(data.name, data.link)
      .then((res) => {
        const card = generateCard(res);
        section.addItem(card);
        addCard.close();
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        addCard.hideLoading();
      });
  },
  popupCreateCardBtn.textContent,
  "Creating..."
);
addCard.setEventListeners();

//validation
const editFormValidator = new FormValidator(settings, popupEditProfile);
const cardFormValidator = new FormValidator(settings, popupAddCard);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

function fillProfileForm() {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.about;
}

//opening popup form with profile and filling it by data from the page  CORRECT
editButton.addEventListener("click", () => {
  editPopup.open();
  editFormValidator.resetValidation();
  fillProfileForm();
});

//opening popup with new card
addButton.addEventListener("click", () => {
  addCard.open();
  cardFormValidator.resetValidation();
});

//edit profile avatar
profileAvatarEditBtn.addEventListener("click", () => {
  popupProfileAvatar.open();
});
